use axum::{extract::Request, http::StatusCode, middleware::Next, response::Response};
use once_cell::sync::Lazy;

use crate::environment_variables::{SWAGGER_API_KEY, SWAGGER_API_KEY_NAME};

pub async fn require_apikey_middleware(
    request: Request,
    next: Next,
) -> Result<Response, StatusCode> {
    let headers = request.headers();

    match headers.get(Lazy::force(&SWAGGER_API_KEY_NAME)) {
        Some(header) => {
            if header == SWAGGER_API_KEY.as_str() {
                tracing::info!("require_apikey_middleware: correct swagger api key given");
                let response = next.run(request).await;

                Ok(response)
            } else {
                tracing::error!(
                    "require_apikey_middleware error: swagger header present but incorrect api key"
                );
                Err(StatusCode::UNAUTHORIZED)
            }
        }
        // Ignore when header is not found.
        None => {
            let response = next.run(request).await;
            Ok(response)
        }
    }
}
