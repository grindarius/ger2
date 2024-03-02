use axum::{
    body::Body,
    http::{Response, StatusCode},
};
use tower_governor::GovernorError;

use crate::errors::ErrorResponse;

pub fn governor_error_handler(error: GovernorError) -> Response<Body> {
    match error {
        GovernorError::TooManyRequests { wait_time, headers } => {
            let response =
                ErrorResponse::new(StatusCode::TOO_MANY_REQUESTS, "Too many requests".into());
            Response::new(Body::from(serde_json::to_string(&response).unwrap()))
        }
        GovernorError::UnableToExtractKey => {
            let response = ErrorResponse::new(
                StatusCode::INTERNAL_SERVER_ERROR,
                "Unable to extract key".to_owned(),
            );
            Response::new(Body::from(serde_json::to_string(&response).unwrap()))
        }
        GovernorError::Other { code, msg, headers } => {
            let response =
                ErrorResponse::new(code, msg.unwrap_or("Unknown governor error".to_owned()));
            Response::new(Body::from(serde_json::to_string(&response).unwrap()))
        }
    }
}
