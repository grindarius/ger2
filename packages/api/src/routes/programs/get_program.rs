use axum::{
    extract::{Path, State},
    response::IntoResponse,
    Json,
};
use postgres_from_row::FromRow;
use postgres_types::Type;
use rust_decimal::Decimal;
use serde::{Deserialize, Serialize};
use ts_rs::TS;
use utoipa::{IntoParams, ToSchema};

use crate::{
    errors::{HttpError, EXAMPLE_INTERNAL_SERVER_ERROR_RESPONSE, EXAMPLE_NOT_FOUND_RESPONSE},
    state::SharedState,
};

#[derive(Deserialize, IntoParams, ToSchema, TS)]
#[ts(export)]
pub struct GetProgramRequestParams {
    #[into_params(parameter_in = Path)]
    #[schema(format = Ulid)]
    major_id: String,
}

#[derive(Serialize, ToSchema, FromRow, TS)]
#[ts(export)]
pub struct GetProgramResponseBody {
    #[schema(format = Ulid)]
    id: String,
    name: String,
    #[schema(format = Ulid)]
    curriculum_id: String,
    curriculum_name: String,
    #[schema(format = Ulid)]
    academic_year_id: String,
    year: i32,
    #[schema(format = Double)]
    #[serde(with = "rust_decimal::serde::str")]
    #[ts(type = "string")]
    minimum_gpa: Decimal,
    year_amount: i16,
    minimum_credit: i32,
    #[schema(format = DateTime)]
    #[serde(with = "time::serde::iso8601")]
    #[ts(type = "string")]
    created_at: time::OffsetDateTime,
}

impl Default for GetProgramResponseBody {
    fn default() -> Self {
        Self {
            id: "01HCD9J08N58KWQA479S1M6G0C".to_string(),
            name: "Bachelor of Software Engineer, \"A\" version".to_string(),
            curriculum_id: "01HCD9J08N58KWQA479S1M6G0X".to_string(),
            curriculum_name: "Science".to_string(),
            academic_year_id: "01HCD9P06P61BPY9Q3BDSRWWW6".to_string(),
            year: 2022,
            minimum_gpa: rust_decimal::Decimal::new(20, 1),
            year_amount: 4,
            minimum_credit: 130,
            created_at: time::OffsetDateTime::from_unix_timestamp(1696958674).unwrap(),
        }
    }
}

#[utoipa::path(
    get,
    path = "/programs/{major_id}",
    tag = "programs",
    operation_id = "get_program",
    params(GetProgramRequestParams),
    responses(
        (
            status = 200,
            description = "program description received",
            body = GetProgramResponseBody,
            example = json!(GetProgramResponseBody::default())
        ),
        (
            status = 204,
            description = "program description for given major_id not found",
            body = ErrorResponse,
            example = json!(*EXAMPLE_NOT_FOUND_RESPONSE)
        ),
        (
            status = "5XX",
            description = "internal server errors",
            body = ErrorResponse,
            example = json!(*EXAMPLE_INTERNAL_SERVER_ERROR_RESPONSE)
        )
    )
)]
pub async fn handler(
    Path(path): Path<GetProgramRequestParams>,
    State(state): State<SharedState>,
) -> Result<impl IntoResponse, HttpError> {
    let client = state.pool.get().await?;

    let querystring = r##"
        select
            majors.id,
            majors.name,
            majors.curriculum_id,
            curriculums.name as curriculum_name,
            majors.academic_year_id,
            academic_years.year,
            majors.minimum_gpa,
            majors.year_amount,
            majors.minimum_credit,
            majors.created_at,
            majors.updated_at
        from majors
        inner join curriculums on majors.curriculum_id = curriculums.id
        inner join academic_years on majors.academic_year_id = academic_years.id
        where majors.id = $1
    "##;
    let statement = client.prepare_typed(querystring, &[Type::VARCHAR]).await?;
    let row = client.query_opt(&statement, &[&path.major_id]).await?;

    let Some(major_row) = row else {
        return Err(HttpError::QueryNotFound {
            field: "major_id",
            value: path.major_id,
        });
    };

    let Ok(major_information) = GetProgramResponseBody::try_from_row(&major_row) else {
        return Err(HttpError::InternalServerError {
            cause: "Cannot deserialize row to struct GetProgramResponseBody".to_string(),
        });
    };

    Ok(Json(major_information))
}
