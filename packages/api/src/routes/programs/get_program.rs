use axum::{
    extract::{Path, State},
    response::IntoResponse,
    Json,
};
use postgres_from_row::FromRow;
use rust_decimal::Decimal;
use sea_query::{Alias, Expr, JoinType, PostgresQueryBuilder, Query};
use serde::{Deserialize, Serialize};
use ts_rs::TS;
use utoipa::{IntoParams, ToSchema};

use crate::{
    database::schema::{AcademicYearsIden, CurriculumsIden, MajorsIden},
    errors::{
        HttpError, EXAMPLE_INTERNAL_SERVER_ERROR_RESPONSE, EXAMPLE_PROGRAM_DATA_NOT_FOUND_RESPONSE,
    },
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
    context_path = "/v1",
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
            status = 404,
            description = "program description for given major_id not found",
            body = ErrorResponse,
            example = json!(*EXAMPLE_PROGRAM_DATA_NOT_FOUND_RESPONSE)
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
    let mut query = Query::select();

    query
        .expr_as(
            Expr::col((MajorsIden::Table, MajorsIden::Id)),
            Alias::new("id"),
        )
        .expr_as(
            Expr::col((MajorsIden::Table, MajorsIden::Name)),
            Alias::new("name"),
        )
        .expr_as(
            Expr::col((CurriculumsIden::Table, CurriculumsIden::Id)),
            Alias::new("curriculum_id"),
        )
        .expr_as(
            Expr::col((CurriculumsIden::Table, CurriculumsIden::Name)),
            Alias::new("curriculum_name"),
        )
        .expr_as(
            Expr::col((MajorsIden::Table, MajorsIden::AcademicYearId)),
            Alias::new("academic_year_id"),
        )
        .expr_as(
            Expr::col((AcademicYearsIden::Table, AcademicYearsIden::Year)),
            Alias::new("year"),
        )
        .expr_as(
            Expr::col((MajorsIden::Table, MajorsIden::MinimumGpa)),
            Alias::new("minimum_gpa"),
        )
        .expr_as(
            Expr::col((MajorsIden::Table, MajorsIden::YearAmount)),
            Alias::new("year_amount"),
        )
        .expr_as(
            Expr::col((MajorsIden::Table, MajorsIden::MinimumCredit)),
            Alias::new("minimum_credit"),
        )
        .expr_as(
            Expr::col((MajorsIden::Table, MajorsIden::CreatedAt)),
            Alias::new("created_at"),
        )
        .from(MajorsIden::Table)
        .join(
            JoinType::InnerJoin,
            AcademicYearsIden::Table,
            Expr::col((MajorsIden::Table, MajorsIden::AcademicYearId))
                .equals((AcademicYearsIden::Table, AcademicYearsIden::Id)),
        )
        .join(
            JoinType::InnerJoin,
            CurriculumsIden::Table,
            Expr::col((MajorsIden::Table, MajorsIden::CurriculumId))
                .equals((CurriculumsIden::Table, CurriculumsIden::Id)),
        )
        .join(
            JoinType::InnerJoin,
            CurriculumsIden::Table,
            Expr::col((MajorsIden::Table, MajorsIden::CurriculumId))
                .equals((CurriculumsIden::Table, CurriculumsIden::Id)),
        )
        .and_where(Expr::col((MajorsIden::Table, MajorsIden::Id)).eq(&path.major_id));
    let querystring = query.to_string(PostgresQueryBuilder);

    let statement = client.prepare(&querystring).await?;
    let row = client
        .query_one(&statement, &[])
        .await
        .map_err(|_e| HttpError::QueryNotFound { field: "major_id" })?;
    let major_information = GetProgramResponseBody::try_from_row(&row)?;

    Ok(Json(major_information))
}
