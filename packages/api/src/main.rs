use actix_web::{http::header, web, App, HttpResponse, HttpServer};
use once_cell::sync::Lazy;
use serde_json::json;
use tracing_actix_web::TracingLogger;

mod envs;
mod telemetry;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    // load environment variables
    dotenvy::dotenv().expect("Cannot load environment variables file.");

    // initialize telemetry
    let _guard = telemetry::init_telemetry();

    tracing::info!("Starting the server at \"{}\"", *envs::API_LINK);

    HttpServer::new(|| {
        let cors = actix_cors::Cors::default()
            .allowed_origin(envs::WEBSITE_URL.as_str())
            .supports_credentials()
            .allowed_header(header::COOKIE)
            .allowed_header(header::CONTENT_TYPE);

        App::new().wrap(cors).wrap(TracingLogger::default()).route(
            "/",
            web::get().to(|| async { HttpResponse::Ok().json(json!({ "message": "Done!" })) }),
        )
    })
    .bind(Lazy::force(&envs::API_LINK))?
    .run()
    .await
}
