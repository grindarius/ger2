use axum::{
    http::{StatusCode, Uri},
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

pub enum HttpError {
    InternalServerError { cause: String },
    QueryNotFound { field: &'static str },
    InvalidQueryParameterEmpty { field: &'static str },
}

impl IntoResponse for HttpError {
    fn into_response(self) -> axum::response::Response {
        let (status, message): (StatusCode, String) = match self {
            HttpError::InternalServerError { cause } => (StatusCode::INTERNAL_SERVER_ERROR, cause),
            HttpError::QueryNotFound { field } => (
                StatusCode::NOT_FOUND,
                format!("{} not found from the query", field),
            ),
            HttpError::InvalidQueryParameterEmpty { field } => (
                StatusCode::BAD_REQUEST,
                format!("query parameter \"{}\" cannot be empty string", field),
            ),
        };

        let response = ErrorResponse {
            status_code: status.as_u16(),
            error: status
                .canonical_reason()
                .unwrap_or("Unknown Canonical Reason")
                .to_owned(),
            message,
        };

        (status, Json(response)).into_response()
    }
}

impl From<deadpool_postgres::PoolError> for HttpError {
    fn from(value: deadpool_postgres::PoolError) -> Self {
        HttpError::InternalServerError {
            cause: value.to_string(),
        }
    }
}

impl From<tokio_postgres::error::Error> for HttpError {
    fn from(value: tokio_postgres::error::Error) -> Self {
        HttpError::InternalServerError {
            cause: value.to_string(),
        }
    }
}

error_example!(PROGRAM_DATA_NOT_FOUND, NOT_FOUND, "program data not found");
error_example!(NOT_FOUND, NOT_FOUND, "\"x\" not found");
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
