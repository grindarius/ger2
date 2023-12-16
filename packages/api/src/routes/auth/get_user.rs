use axum::{
    extract::{Query, State},
    http::StatusCode,
    response::IntoResponse,
    Json,
};
use postgres_from_row::FromRow;
use postgres_types::Type;
use serde::{Deserialize, Serialize};
use ts_rs::TS;
use utoipa::{IntoParams, ToSchema};

use crate::{database::custom_types::Role, errors::HttpError, state::SharedState};

#[derive(Deserialize, IntoParams, ToSchema, TS)]
#[into_params(parameter_in = Query)]
#[serde(rename_all(deserialize = "kebab-case"))]
#[ts(export)]
pub struct GetUserRequestQueries {
    #[schema(format = Ulid)]
    user_id: String,
}

#[derive(FromRow, Serialize, ToSchema, TS)]
#[ts(export)]
pub struct GetUserResponseBody {
    #[schema(format = Ulid)]
    id: String,
    username: String,
    email: String,
    role: Role,
    #[schema(format = Date)]
    #[ts(type = "string")]
    birthdate: time::Date,
    #[schema(format = DateTime)]
    #[serde(with = "time::serde::iso8601")]
    #[ts(type = "string")]
    created_at: time::OffsetDateTime,
    #[schema(format = DateTime)]
    #[serde(with = "time::serde::iso8601::option")]
    #[ts(type = "string")]
    updated_at: Option<time::OffsetDateTime>,
}

#[utoipa::path(
    get,
    path = "/v1/auth/user",
    tag = "auth",
    operation_id = "get_user",
    params(GetUserRequestQueries),
    responses(
        (
            status = 200,
            description = "user returned",
            body = GetUserResponseBody
        ),
        (
            status = 400,
            description = "missing user id, other user error",
            body = ErrorResponse
        ),
        (
            status = 404,
            description = "user not found",
            body = ErrorResponse
        ),
        (
            status = "5XX",
            description = "bad errors",
            body = ErrorResponse
        )
    )
)]
pub async fn handler(
    Query(query): Query<GetUserRequestQueries>,
    State(state): State<SharedState>,
) -> Result<impl IntoResponse, HttpError> {
    let client = state.pool.get().await?;

    if query.user_id.is_empty() {
        return Err(HttpError::InvalidQueryParameterEmpty { field: "user_id" });
    }

    let statement = client
        .prepare_typed_cached(
            r##"
                select
                    id,
                    username,
                    email,
                    role,
                    birthdate,
                    created_at,
                    updated_at
                from accounts
                where id = $1
            "##,
            &[Type::VARCHAR],
        )
        .await?;

    let result = match client.query_opt(&statement, &[&query.user_id]).await? {
        None => return Err(HttpError::QueryNotFound { field: "user" }),
        Some(user) => GetUserResponseBody::try_from_row(&user)?,
    };

    Ok((StatusCode::OK, Json(result)))
}
