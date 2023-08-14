use actix_web::{http::StatusCode, HttpResponse, ResponseError};
use derive_more::{Display, Error};
use serde::Serialize;
use utoipa::ToSchema;

use crate::macros::example_error_response;

#[derive(Serialize, ToSchema)]
pub struct ErrorResponse {
    pub status_code: u16,
    pub error: String,
    pub message: String,
}

#[derive(Debug, Display, Error, Clone)]
pub enum HttpError {
    #[display(fmt = "{field} not found")]
    NotFound { field: &'static str },
    #[display(fmt = "invalid swagger api key")]
    InvalidSwaggerApiKey,
    #[display(fmt = "field \"{field}\" cannot be empty")]
    CannotBeEmpty { field: &'static str },
    #[display(fmt = "{}", cause)]
    InternalServerError { cause: String },
    #[display(fmt = "invalid password")]
    InvalidPassword,
}

impl HttpError {
    pub fn status_code(&self) -> StatusCode {
        match *self {
            HttpError::NotFound { .. } => StatusCode::NOT_FOUND,
            HttpError::InvalidSwaggerApiKey => StatusCode::UNAUTHORIZED,
            HttpError::CannotBeEmpty { .. } => StatusCode::BAD_REQUEST,
            HttpError::InternalServerError { .. } => StatusCode::INTERNAL_SERVER_ERROR,
            HttpError::InvalidPassword => StatusCode::BAD_REQUEST,
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

impl From<deadpool_postgres::PoolError> for HttpError {
    fn from(error: deadpool_postgres::PoolError) -> Self {
        HttpError::InternalServerError {
            cause: error.to_string(),
        }
    }
}

impl From<tokio_postgres::error::Error> for HttpError {
    fn from(error: tokio_postgres::error::Error) -> Self {
        HttpError::InternalServerError {
            cause: error.to_string(),
        }
    }
}

impl From<argon2::Error> for HttpError {
    fn from(value: argon2::Error) -> Self {
        HttpError::InternalServerError {
            cause: value.to_string(),
        }
    }
}

impl From<argon2::password_hash::Error> for HttpError {
    fn from(error: argon2::password_hash::Error) -> Self {
        HttpError::InternalServerError {
            cause: error.to_string(),
        }
    }
}

impl From<jsonwebtoken::errors::Error> for HttpError {
    fn from(value: jsonwebtoken::errors::Error) -> Self {
        HttpError::InternalServerError {
            cause: value.to_string(),
        }
    }
}

example_error_response!(BAD_REQUEST, "property \"x\" cannot be an empty string");
example_error_response!(NOT_FOUND, "\"x\" not found");
example_error_response!(INTERNAL_SERVER_ERROR, "our server got fried");
