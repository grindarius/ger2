use actix_web::{http::StatusCode, HttpResponse, ResponseError};
use serde::Serialize;
use utoipa::ToSchema;

#[derive(Serialize, ToSchema)]
pub struct ErrorResponse {
    pub status_code: u16,
    pub error: String,
    pub message: String,
}

#[derive(Debug, derive_more::Display, derive_more::Error, Clone)]
pub enum HttpError {
    #[display(fmt = "{} missing", field)]
    NotFound { field: &'static str },
    #[display(fmt = "invalid swagger api key")]
    InvalidSwaggerApiKey,
    #[display(fmt = "field \"{field}\" cannot be empty")]
    CannotBeEmpty { field: &'static str },
    #[display(fmt = "{}", cause)]
    InternalServerError { cause: String },
    #[display(fmt = "invalid password")]
    InvalidPassword,
    #[display(fmt = "data not found with given \"{field}\"")]
    QueryNotFound { field: &'static str },
}

impl HttpError {
    pub fn status_code(&self) -> StatusCode {
        match *self {
            HttpError::NotFound { .. } => StatusCode::NOT_FOUND,
            HttpError::InvalidSwaggerApiKey => StatusCode::UNAUTHORIZED,
            HttpError::CannotBeEmpty { .. } => StatusCode::BAD_REQUEST,
            HttpError::InternalServerError { .. } => StatusCode::INTERNAL_SERVER_ERROR,
            HttpError::InvalidPassword => StatusCode::BAD_REQUEST,
            HttpError::QueryNotFound { .. } => StatusCode::NOT_FOUND,
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
