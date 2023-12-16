use axum::{
    extract::State,
    http::{header::CACHE_CONTROL, HeaderMap, StatusCode},
    response::IntoResponse,
    Json,
};
use postgres_from_row::FromRow;
use rust_decimal::Decimal;
use sea_query::{Alias, Expr, JoinType, PostgresQueryBuilder, Query};
use serde::Serialize;
use ts_rs::TS;
use utoipa::ToSchema;

use crate::{
    database::schema::{AcademicYearsIden, CurriculumsIden, FacultiesIden, MajorsIden},
    errors::HttpError,
    macros::top_level_array_ts_type,
    state::SharedState,
};

#[derive(Serialize, ToSchema)]
#[serde(transparent)]
pub struct GetProgramsResponseBody(Vec<GetProgramsResponseBodyInner>);

impl Default for GetProgramsResponseBody {
    fn default() -> Self {
        Self(vec![GetProgramsResponseBodyInner::default()])
    }
}

top_level_array_ts_type!(GetProgramsResponseBody, GetProgramsResponseBodyInner);

#[derive(Serialize, ToSchema, TS, FromRow)]
#[ts(export)]
pub struct GetProgramsResponseBodyInner {
    #[schema(format = Ulid)]
    faculty_id: String,
    faculty_name: String,
    #[schema(format = Ulid)]
    curriculum_id: String,
    curriculum_name: String,
    #[schema(format = Ulid)]
    major_id: String,
    major_name: String,
    year: i32,
    minimum_credit: i32,
    year_amount: i16,
    #[schema(format = Double)]
    #[ts(type = "string")]
    #[serde(with = "rust_decimal::serde::str")]
    minimum_gpa: Decimal,
}

impl Default for GetProgramsResponseBodyInner {
    fn default() -> Self {
        Self {
            faculty_id: "01HAH59BXPW9M7VXHG52H0R13M".to_string(),
            faculty_name: "Faculty of Science".to_string(),
            curriculum_id: "01HAH5A150ZEX4VTAJXPC58QSM".to_string(),
            curriculum_name: "Bachelor of Computer Science 4 year normal terms".to_string(),
            major_id: "01HAH5B4K0GZ5WRKGYBEMJFZH5".to_string(),
            major_name: "Bachelor of Computer Science".to_string(),
            year: 2020,
            minimum_credit: 120,
            year_amount: 4,
            minimum_gpa: Decimal::new(25, 1),
        }
    }
}

#[utoipa::path(
    get,
    path = "v1/programs",
    operation_id = "get_programs",
    tag = "programs",
    responses(
        (
            status = 200,
            description = "list of programs",
            body = GetProgramsResponseBody,
            example = json!(GetProgramsResponseBody::default())
        ),
        (
            status = "5XX",
            description = "something is wrong on our end",
            body = ErrorResponse
        )
    )
)]
pub async fn handler(State(state): State<SharedState>) -> Result<impl IntoResponse, HttpError> {
    let client = state.pool.get().await.unwrap();

    let mut query = Query::select();
    query
        .expr_as(
            Expr::col((FacultiesIden::Table, FacultiesIden::Id)),
            Alias::new("faculty_id"),
        )
        .expr_as(
            Expr::col((FacultiesIden::Table, FacultiesIden::Name)),
            Alias::new("faculty_name"),
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
            Expr::col((MajorsIden::Table, MajorsIden::Id)),
            Alias::new("major_id"),
        )
        .expr_as(
            Expr::col((MajorsIden::Table, MajorsIden::Name)),
            Alias::new("major_name"),
        )
        .expr_as(
            Expr::col((AcademicYearsIden::Table, AcademicYearsIden::Year)),
            Alias::new("year"),
        )
        .expr_as(
            Expr::col((MajorsIden::Table, MajorsIden::MinimumCredit)),
            Alias::new("minimum_credit"),
        )
        .expr_as(
            Expr::col((MajorsIden::Table, MajorsIden::YearAmount)),
            Alias::new("year_amount"),
        )
        .expr_as(
            Expr::col((MajorsIden::Table, MajorsIden::MinimumGpa)),
            Alias::new("minimum_gpa"),
        )
        .from(MajorsIden::Table)
        .join(
            JoinType::InnerJoin,
            CurriculumsIden::Table,
            Expr::col((MajorsIden::Table, MajorsIden::CurriculumId)).equals(CurriculumsIden::Id),
        )
        .join(
            JoinType::InnerJoin,
            FacultiesIden::Table,
            Expr::col((CurriculumsIden::Table, CurriculumsIden::FacultyId))
                .equals(FacultiesIden::Id),
        )
        .join(
            JoinType::InnerJoin,
            AcademicYearsIden::Table,
            Expr::col((MajorsIden::Table, MajorsIden::AcademicYearId))
                .equals(AcademicYearsIden::Id),
        );
    let querystring = query.to_string(PostgresQueryBuilder);

    let statement = client.prepare(&querystring).await?;
    let rows = client.query(&statement, &[]).await?;
    let curriculums = rows
        .iter()
        .map(|r| GetProgramsResponseBodyInner::try_from_row(r))
        .collect::<Result<Vec<GetProgramsResponseBodyInner>, tokio_postgres::Error>>()?;

    let mut headers = HeaderMap::new();
    headers.insert(CACHE_CONTROL, "public, s-maxage=43200".parse().unwrap());
    let body = GetProgramsResponseBody(curriculums);

    Ok((StatusCode::OK, headers, Json(body)).into_response())
}
