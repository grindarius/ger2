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

#[derive(Deserialize, ToSchema, TS, IntoParams)]
#[into_params(parameter_in = Query)]
#[serde(rename_all(deserialize = "kebab-case"))]
#[ts(export)]
pub struct GetSessionAndUserRequestQueries {
    #[schema(format = Ulid)]
    session_id: String,
}

#[derive(Serialize, ToSchema, TS)]
#[ts(export)]
pub struct GetSessionAndUserResponseBody(
    Option<GetSessionAndUserResponseBodySession>,
    Option<GetSessionAndUserResponseBodyUser>,
);

#[derive(Serialize, ToSchema, TS)]
#[ts(export)]
pub struct GetSessionAndUserResponseBodySession {
    #[schema(format = Ulid)]
    id: String,
    #[schema(format = Ulid)]
    user_id: String,
    #[schema(format = DateTime)]
    #[serde(with = "time::serde::iso8601")]
    #[ts(type = "string")]
    active_expires: time::OffsetDateTime,
    #[schema(format = DateTime)]
    #[serde(with = "time::serde::iso8601")]
    #[ts(type = "string")]
    idle_expires: time::OffsetDateTime,
}

#[derive(Serialize, ToSchema, TS)]
#[ts(export)]
pub struct GetSessionAndUserResponseBodyUser {
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

#[derive(FromRow)]
pub struct SessionAndUserQueryResult {
    id: String,
    account_id: String,
    active_expires: time::OffsetDateTime,
    idle_expires: time::OffsetDateTime,
    account_username: String,
    account_email: String,
    account_role: Role,
    account_birthdate: time::Date,
    account_created_at: time::OffsetDateTime,
    account_updated_at: Option<time::OffsetDateTime>,
}

#[utoipa::path(
    get,
    path = "/v1/auth/session-user",
    tag = "auth",
    operation_id = "get_session_and_user",
    params(GetSessionAndUserRequestQueries),
    responses(
        (
            status = 200,
            description = "user and session returned",
            body = GetSessionAndUserResponseBody
        ),
        (
            status = 400,
            description = "missing session id, other user error",
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
    Query(query): Query<GetSessionAndUserRequestQueries>,
    State(state): State<SharedState>,
) -> Result<impl IntoResponse, HttpError> {
    let client = state.pool.get().await?;

    if query.session_id.is_empty() {
        return Err(HttpError::InvalidQueryParameterEmpty {
            field: "session_id",
        });
    }

    let statement = client
        .prepare_typed_cached(
            r##"
                select
                    account_sessions.id,
                    account_sessions.account_id,
                    account_sessions.active_expires,
                    account_sessions.idle_expires,
                    accounts.username as account_username,
                    accounts.email as account_email,
                    accounts.role as account_role,
                    accounts.birthdate as account_birthdate,
                    accounts.created_at as account_created_at,
                    accounts.updated_at as account_updated_at
                from account_sessions
                inner join accounts on account_sessions.account_id = accounts.id
                where account_sessions.id = $1
            "##,
            &[Type::TEXT],
        )
        .await?;

    let session_and_user = client.query(&statement, &[&query.session_id]).await?;
    let session_and_user = session_and_user
        .iter()
        .map(|row| SessionAndUserQueryResult::try_from_row(&row))
        .collect::<Result<Vec<SessionAndUserQueryResult>, tokio_postgres::Error>>()?;

    Ok(StatusCode::OK)
}
