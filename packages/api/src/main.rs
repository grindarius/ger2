use actix_web::{
    http::{header, StatusCode},
    web, App, HttpRequest, HttpResponse, HttpServer,
};
use once_cell::sync::Lazy;
use serde_json::json;
use tracing_actix_web::TracingLogger;
use utoipa::OpenApi;
use utoipa_swagger_ui::SwaggerUi;

use crate::errors::ErrorResponse;
use crate::openapi::apidoc::ApiDoc;
use crate::pool::create_pool;
use crate::shared::SharedAppData;

mod argon2;
mod constants;
mod default_service;
mod envs;
mod errors;
mod jwt;
mod macros;
mod openapi;
mod pool;
mod routes;
mod shared;
mod telemetry;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    // load environment variables
    dotenvy::dotenv().expect("Cannot load environment variables file.");

    // initialize telemetry
    let _guard = telemetry::init_telemetry();

    // initialize openapi
    let openapi = ApiDoc::openapi();

    // initialize database pool
    let pool = create_pool();

    tracing::info!("Starting the server at \"{}\"", *envs::FULL_API_LINK);
    tracing::info!(
        "Starting the documentation server at \"{}/documentation/\"",
        *envs::FULL_API_LINK
    );

    HttpServer::new(move || {
        let cors = actix_cors::Cors::default()
            .allowed_origin(envs::WEBSITE_URL.as_str())
            .supports_credentials()
            .allowed_header(header::COOKIE)
            .allowed_header(header::CONTENT_TYPE);

        let json_deserialize_config =
            web::JsonConfig::default().error_handler(|error, _request| {
                let message = Clone::clone(&error.to_string());

                actix_web::error::InternalError::from_response(
                    error,
                    actix_web::HttpResponse::build(StatusCode::BAD_REQUEST).json(
                        crate::errors::ErrorResponse {
                            status_code: 400,
                            error: "json deserialize error".to_string(),
                            message,
                        },
                    ),
                )
                .into()
            });

        let path_deserialize_config =
            web::PathConfig::default().error_handler(|error, _request| {
                let message = Clone::clone(&error.to_string());

                actix_web::error::InternalError::from_response(
                    error,
                    actix_web::HttpResponse::build(StatusCode::BAD_REQUEST).json(
                        crate::errors::ErrorResponse {
                            status_code: 400,
                            error: "path deserialize error".to_string(),
                            message,
                        },
                    ),
                )
                .into()
            });

        let query_deserialize_config =
            web::QueryConfig::default().error_handler(|error, _request| {
                let message = Clone::clone(&error.to_string());

                actix_web::error::InternalError::from_response(
                    error,
                    actix_web::HttpResponse::build(StatusCode::BAD_REQUEST).json(
                        crate::errors::ErrorResponse {
                            status_code: 400,
                            error: "query deserialize error".to_string(),
                            message,
                        },
                    ),
                )
                .into()
            });

        App::new()
            .wrap(cors)
            .wrap(TracingLogger::default())
            .app_data(json_deserialize_config)
            .app_data(path_deserialize_config)
            .app_data(query_deserialize_config)
            .app_data(web::Data::new(SharedAppData::new(pool.clone())))
            .default_service(web::to(|req: HttpRequest| async move {
                HttpResponse::NotFound().json(ErrorResponse {
                    status_code: 404,
                    error: "Not Found".to_string(),
                    message: format!(
                        "uri {}{} is invalid, it could be totally wrong or you have trailing slash at the end.",
                        Lazy::force(&envs::FULL_API_LINK),
                        req.uri()
                    ),
                })
            }))
            .route(
                "/",
                web::get()
                    .to(|| async { HttpResponse::Ok().json(json!({ "message": "Welcome!" })) }),
            )
            .route(
                "/auth/signin",
                web::post().to(crate::routes::auth::signin::handler),
            )
            .route(
                "/docs",
                web::get().to(crate::routes::docs::redirect::handler),
            )
            .route(
                "/documentation",
                web::get().to(crate::routes::docs::redirect::handler),
            )
            .route(
                "/programs",
                web::get().to(crate::routes::programs::get_programs::handler),
            )
            .route(
                "/programs/{major_id}",
                web::get().to(crate::routes::programs::get_program::handler),
            )
            .route(
                "/programs/{major_id}/subjects",
                web::get().to(crate::routes::programs::get_program_subjects::handler),
            )
            .service(
                SwaggerUi::new("/documentation/{_:.*}")
                    .url("/openapi/openapi.json", openapi.clone()),
            )
    })
    .bind(Lazy::force(&envs::API_LINK))?
    .run()
    .await
}
