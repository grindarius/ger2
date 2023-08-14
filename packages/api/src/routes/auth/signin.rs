use actix_web::{web, HttpResponse};
use argon2::{PasswordHash, PasswordVerifier};
use jsonwebtoken::encode;
use serde::{Deserialize, Serialize};
use tokio_postgres::types::Type;
use ts_rs::TS;
use utoipa::ToSchema;

use crate::{
    argon2::ARGON2_INSTANCE,
    constants::Role,
    errors::{
        HttpError, EXAMPLE_BAD_REQUEST_RESPONSE, EXAMPLE_INTERNAL_SERVER_ERROR_RESPONSE,
        EXAMPLE_NOT_FOUND_RESPONSE,
    },
    jwt::{Claims, ENCODING_KEY, HEADER},
    shared::SharedAppData,
};

#[derive(Deserialize, ToSchema, TS)]
#[ts(export)]
pub struct SigninRequestBody {
    pub username_or_email: String,
    pub password: String,
}

#[derive(Serialize, ToSchema, TS)]
#[ts(export)]
pub struct SigninResponseBody {
    access_token: String,
    username: String,
    email: String,
    role: Role,
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
            body = SigninResponseBody
        ),
        (
            status = 400,
            description = "bad request",
            body = ErrorResponse,
            example = json!(*EXAMPLE_BAD_REQUEST_RESPONSE)
        ),
        (
            status = 404,
            description = "user not found",
            body = ErrorResponse,
            example = json!(*EXAMPLE_NOT_FOUND_RESPONSE)
        ),
        (
            status = 500,
            description = "bad errors",
            body = ErrorResponse,
            example = json!(*EXAMPLE_INTERNAL_SERVER_ERROR_RESPONSE)
        )
    )
)]
pub async fn handler(
    body: web::Json<SigninRequestBody>,
    data: web::Data<SharedAppData>,
) -> Result<HttpResponse, HttpError> {
    if body.username_or_email.is_empty() {
        return Err(HttpError::CannotBeEmpty {
            field: "username_or_email",
        });
    }

    if body.password.is_empty() {
        return Err(HttpError::CannotBeEmpty { field: "password" });
    }

    let client = data.pool.get().await?;

    let statement = client
        .prepare_typed_cached(
            r##"
            select
                username,
                email,
                password,
                role
            from
                account
            where
                account.username = $1 or account.email = $1
            "##,
            &[Type::TEXT],
        )
        .await?;

    let query_result = client
        .query_one(&statement, &[&body.username_or_email])
        .await
        .map_err(|_e| HttpError::NotFound { field: "user" })?;

    let stored_password = query_result.get::<&str, String>("password");
    let parsed_given_password = PasswordHash::new(stored_password.as_str())?;

    if ARGON2_INSTANCE
        .verify_password(&body.password.as_bytes(), &parsed_given_password)
        .is_err()
    {
        return Err(HttpError::InvalidPassword);
    }

    let claims = Claims::new(
        query_result.get::<&str, String>("username"),
        query_result.get::<&str, String>("email"),
        query_result.get::<&str, Role>("role"),
    );

    let access_token = encode(&HEADER, &claims, &ENCODING_KEY)?;

    Ok(HttpResponse::Ok().json(SigninResponseBody {
        username: query_result.get::<&str, String>("username"),
        email: query_result.get::<&str, String>("email"),
        role: query_result.get::<&str, Role>("role"),
        access_token,
    }))
}
