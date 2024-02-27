use axum::{http::StatusCode, response::IntoResponse};

use crate::errors::HttpError;

pub async fn handler() -> Result<impl IntoResponse, HttpError> {
    Ok(StatusCode::OK)
}
