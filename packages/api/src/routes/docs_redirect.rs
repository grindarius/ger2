use axum::{
    http::{header, StatusCode},
    response::{IntoResponse, Response},
};
use once_cell::sync::Lazy;

use crate::environment_variables::FULL_API_URL;

pub async fn handler() -> Response {
    (
        StatusCode::PERMANENT_REDIRECT,
        [(header::LOCATION, format!("{}", Lazy::force(&FULL_API_URL)))],
    )
        .into_response()
}
