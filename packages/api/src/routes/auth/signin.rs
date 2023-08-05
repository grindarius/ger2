use actix_web::HttpResponse;
use serde::Deserialize;
use utoipa::ToSchema;

use crate::errors::HttpError;

#[derive(Deserialize, ToSchema)]
pub struct SigninRequestBody {
    pub username_or_email: String,
    pub password: String,
}

pub struct SigninResponseBody {
    access_token: String,
    username: String,
    email: String,
    role: 
}

#[utoipa::path(
    post,
    path = "/auth/signin",
    tag = "auth",
    operation_id = "auth_signin",
    request_body = SigninRequestBody,
    responses(
        (
            status = 200,
            description = "signin successful",
            body = 
        )
    )
)]
pub async fn handler() -> Result<HttpResponse, HttpError> {
    Ok(HttpResponse::Ok().finish())
}
