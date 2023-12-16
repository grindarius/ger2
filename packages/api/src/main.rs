use axum::{
    http::{header, StatusCode},
    middleware,
    routing::get,
    Router,
};
use once_cell::sync::Lazy;
use tower_http::trace::TraceLayer;
use utoipa::OpenApi;
use utoipa_rapidoc::RapiDoc;

use crate::{
    environment_variables::API_URL,
    errors::global_not_found,
    openapi::apidoc::ApiDoc,
    openapi::apikey_middleware::require_apikey_middleware,
    pool::create_pool,
    state::SharedState,
    telemetry::{init_telemetry, make_span, on_failure, on_request, on_response},
};

mod database;
mod environment_variables;
mod errors;
mod macros;
mod openapi;
mod pool;
mod routes;
mod state;
mod telemetry;

#[tokio::main]
async fn main() {
    // telemetry setup
    let _guard = init_telemetry();

    // database setup
    let pool = create_pool();

    // App state setup
    let state = SharedState::new(pool);

    let routes = Router::new()
        .route(
            "/",
            get(|| async {
                (
                    StatusCode::PERMANENT_REDIRECT,
                    [(
                        header::LOCATION,
                        Lazy::force(&environment_variables::FULL_API_URL),
                    )],
                )
            }),
        )
        .route(
            "/documentation",
            get(|| async {
                (
                    StatusCode::PERMANENT_REDIRECT,
                    [(
                        header::LOCATION,
                        Lazy::force(&environment_variables::FULL_API_URL),
                    )],
                )
            }),
        )
        .route(
            "/auth/session-user",
            get(crate::routes::auth::get_session_and_user::handler),
        )
        .route("/auth/user", get(crate::routes::auth::get_user::handler))
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
        .route("/", get(crate::routes::hello_world::handler))
        .nest("/v1", routes)
        .merge(
            RapiDoc::with_openapi("/api-docs/openapi2.json", ApiDoc::openapi())
                .path("/documentation"),
        )
        .layer(middleware::from_fn(require_apikey_middleware))
        .layer(
            TraceLayer::new_for_http()
                .make_span_with(make_span)
                .on_request(on_request)
                .on_response(on_response)
                .on_body_chunk(())
                .on_eos(())
                .on_failure(on_failure),
        )
        .with_state(state)
        .fallback(global_not_found);

    let listener = tokio::net::TcpListener::bind(Lazy::force(&API_URL))
        .await
        .unwrap();

    tracing::info!(
        "listening on {}",
        Lazy::force(&environment_variables::FULL_API_URL)
    );
    tracing::info!(
        "documentation server started at http://{}/documentation",
        listener.local_addr().unwrap()
    );

    axum::serve(listener, app).await.unwrap();
}
