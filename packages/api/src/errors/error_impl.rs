use super::error_response::HttpError;

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
