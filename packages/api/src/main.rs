use std::sync::{Arc, LazyLock};

use axum::{middleware, routing::get, Router};
use gcloud_sdk::GoogleRestApi;
use tower_http::trace::TraceLayer;
use utoipa::OpenApi;
use utoipa_swagger_ui::SwaggerUi;

use crate::{
    environment_variables::API_URL,
    errors::global_not_found,
    openapi::apidoc::ApiDoc,
    openapi::apikey_middleware::require_apikey_middleware,
    pool::init_pool,
    state::SharedState,
    telemetry::{init_telemetry, make_span, on_request, on_response},
};

mod environment_variables;
mod errors;
mod json;
mod macros;
mod openapi;
mod pool;
mod routes;
mod schema;
mod state;
mod telemetry;

#[tokio::main]
async fn main() {
    // telemetry setup
    let _guard = init_telemetry();

    // database setup
    let pool = init_pool();

    // Google Cloud Storage setup
    let google_cloud_client = GoogleRestApi::new()
        .await
        .expect("Failed to initialize Google Cloud API Client");

    // App state setup
    let state = Arc::new(SharedState::new(pool, google_cloud_client));

    let routes = Router::new()
        .route(
            "/programs",
            get(crate::routes::programs::get_programs::handler),
        )
        .route(
            "/programs/:major_id",
            get(crate::routes::programs::get_program::handler),
        )
        .route(
            "/programs/:major_id/subjects",
            get(crate::routes::programs::get_program_subjects::handler),
        );

    let app = Router::new()
        .route("/", get(crate::routes::healthcheck::handler))
        .merge(SwaggerUi::new("/docs").url("/api-docs/openapi.json", ApiDoc::openapi()))
        .merge(routes)
        .layer(middleware::from_fn(require_apikey_middleware))
        .layer(
            TraceLayer::new_for_http()
                .make_span_with(make_span)
                .on_request(on_request)
                .on_response(on_response)
                .on_body_chunk(())
                .on_eos(())
                .on_failure(()),
        )
        .with_state(state)
        .fallback(global_not_found);

    let listener = tokio::net::TcpListener::bind(LazyLock::force(&API_URL))
        .await
        .unwrap();

    tracing::info!(
        "listening on {}",
        LazyLock::force(&environment_variables::FULL_API_URL)
    );
    tracing::info!(
        "documentation server started at http://{}/docs",
        listener.local_addr().unwrap()
    );

    axum::serve(listener, app).await.unwrap();
}
