use axum::{
    http::{HeaderMap, StatusCode, Uri},
    response::IntoResponse,
    Json,
};
use serde::Serialize;
use utoipa::ToSchema;

use crate::macros::error_example;

pub async fn global_not_found(uri: Uri) -> impl IntoResponse {
    let response = ErrorResponse {
        status_code: 404,
        error: "Not Found".to_string(),
        message: format!("Path with uri {} not found", uri),
    };

    (StatusCode::NOT_FOUND, Json(response)).into_response()
}

#[derive(Serialize, ToSchema)]
pub struct ErrorResponse {
    status_code: u16,
    error: String,
    message: String,
}

impl ErrorResponse {
    pub fn new(code: StatusCode, message: String) -> Self {
        Self {
            status_code: code.as_u16(),
            error: code
                .canonical_reason()
                .unwrap_or("Unknown Canonical Reason")
                .to_owned(),
            message,
        }
    }
}

pub enum HttpError {
    InternalServerError { cause: String },
    QueryNotFound { field: String, value: String },
    InvalidQueryParameterEmpty { field: String },
}

impl IntoResponse for HttpError {
    fn into_response(self) -> axum::response::Response {
        let (status, message, headers): (StatusCode, String, Option<HeaderMap>) = match self {
            HttpError::InternalServerError { cause } => {
                (StatusCode::INTERNAL_SERVER_ERROR, cause, None)
            }
            HttpError::QueryNotFound { field, value } => (
                StatusCode::NOT_FOUND,
                format!("{} not found with given value {}", field, value),
                None,
            ),
            HttpError::InvalidQueryParameterEmpty { field } => (
                StatusCode::BAD_REQUEST,
                format!("query parameter \"{}\" cannot be empty string", field),
                None,
            ),
        };

        let response = ErrorResponse::new(status, message);
        if headers.is_some() {
            return (status, headers, Json(response)).into_response();
        }

        (status, Json(response)).into_response()
    }
}

impl From<deadpool_postgres::PoolError> for HttpError {
    fn from(value: deadpool_postgres::PoolError) -> Self {
        tracing::error!("deadpool-postgres error {}", value.to_string());
        HttpError::InternalServerError {
            cause: value.to_string(),
        }
    }
}

impl From<tokio_postgres::error::Error> for HttpError {
    fn from(value: tokio_postgres::error::Error) -> Self {
        tracing::error!("tokio-postgres error {}", value.to_string());
        HttpError::InternalServerError {
            cause: value.to_string(),
        }
    }
}

error_example!(NOT_FOUND, NO_CONTENT, "\"x\" not found");
error_example!(
    INTERNAL_SERVER_ERROR,
    INTERNAL_SERVER_ERROR,
    "our server got fried"
);
error_example!(
    BAD_REQUEST,
    BAD_REQUEST,
    "property \"x\" cannot be an empty string"
);
