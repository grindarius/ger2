use axum::{
    http::{header, StatusCode},
    middleware,
    response::Response,
    routing::get,
    Router,
};
use once_cell::sync::Lazy;
use tower_governor::{governor::GovernorConfigBuilder, GovernorLayer};
use tower_http::trace::TraceLayer;
use utoipa::OpenApi;
use utoipa_swagger_ui::SwaggerUi;

use crate::{
    environment_variables::API_URL,
    errors::{global_not_found, ErrorResponse},
    openapi::apidoc::ApiDoc,
    openapi::apikey_middleware::require_apikey_middleware,
    pool::init_pool,
    state::SharedState,
    telemetry::{init_telemetry, make_span, on_failure, on_request, on_response},
};

mod database;
mod environment_variables;
mod errors;
mod json;
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
    let pool = init_pool();

    // App state setup
    let state = SharedState::new(pool);

    // Governor (ratelimit) setup
    let governor_config = Box::new(
        GovernorConfigBuilder::default()
            .per_second(20)
            .burst_size(50)
            .error_handler(|error| match error {
                tower_governor::GovernorError::TooManyRequests { wait_time, headers } => {
                    let response = ErrorResponse::new(
                        StatusCode::TOO_MANY_REQUESTS,
                        "Too many requests".into(),
                    );
                    Response::new(serde_json::to_string(&response).unwrap().into())
                }
                tower_governor::GovernorError::UnableToExtractKey => {
                    let response = ErrorResponse::new(
                        StatusCode::INTERNAL_SERVER_ERROR,
                        "Unable to extract key".to_owned(),
                    );
                    Response::new(serde_json::to_string(&response).unwrap().into())
                }
                tower_governor::GovernorError::Other { code, msg, headers } => {
                    let response = ErrorResponse::new(
                        code,
                        msg.unwrap_or("unknown governor error".to_owned()),
                    );
                    Response::new(serde_json::to_string(&response).unwrap().into())
                }
            })
            .finish()
            .unwrap(),
    );

    let governor_limiter = governor_config.limiter().clone();
    let interval = std::time::Duration::from_secs(60);

    std::thread::spawn(move || loop {
        std::thread::sleep(interval);
        tracing::info!("rate limit storage size: {}", governor_limiter.len());
        governor_limiter.retain_recent();
    });

    let routes = Router::new()
        .route(
            "/docs",
            get(|| async {
                (
                    StatusCode::PERMANENT_REDIRECT,
                    [(
                        header::LOCATION,
                        format!("{}/docs", Lazy::force(&environment_variables::FULL_API_URL)),
                    )],
                )
            }),
        )
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
        .merge(SwaggerUi::new("/docs").url("/api-docs/openapi.json", ApiDoc::openapi()))
        .nest("/v1", routes)
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
        .layer(GovernorLayer {
            config: Box::leak(governor_config),
        })
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
        "documentation server started at http://{}/docs",
        listener.local_addr().unwrap()
    );

    axum::serve(listener, app).await.unwrap();
}
