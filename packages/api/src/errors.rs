use actix_web::{http::StatusCode, HttpResponse, ResponseError};
use derive_more::{Display, Error};
use serde::Serialize;
use utoipa::ToSchema;

#[derive(Serialize, ToSchema)]
pub struct ErrorResponse {
    status_code: u16,
    error: String,
    message: String,
}

#[derive(Debug, Display, Error, Clone)]
pub enum HttpError {
    #[display(fmt = "{field} not found")]
    NotFound { field: &'static str },
    #[display(fmt = "invalid swagger api key")]
    InvalidSwaggerApiKey,
}

impl HttpError {
    pub fn status_code(&self) -> StatusCode {
        match *self {
            HttpError::NotFound { .. } => StatusCode::NOT_FOUND,
            HttpError::InvalidSwaggerApiKey => StatusCode::UNAUTHORIZED,
        }
    }
}

impl From<HttpError> for ErrorResponse {
    fn from(value: HttpError) -> Self {
        let code = value.status_code();

        ErrorResponse {
            status_code: code.as_u16(),
            error: code.canonical_reason().unwrap_or("").to_string(),
            message: value.to_string(),
        }
    }
}

impl From<&HttpError> for ErrorResponse {
    fn from(value: &HttpError) -> Self {
        let code = value.status_code();

        ErrorResponse {
            status_code: code.as_u16(),
            error: code.canonical_reason().unwrap_or("").to_string(),
            message: value.to_string(),
        }
    }
}

impl ResponseError for HttpError {
    fn error_response(&self) -> actix_web::HttpResponse<actix_web::body::BoxBody> {
        HttpResponse::build(self.status_code()).json(ErrorResponse::from(self))
    }

    fn status_code(&self) -> actix_web::http::StatusCode {
        self.status_code()
    }
}
