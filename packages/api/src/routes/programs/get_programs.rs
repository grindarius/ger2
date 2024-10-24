use axum::{
    extract::State,
    http::{header::CACHE_CONTROL, HeaderMap, StatusCode},
    response::IntoResponse,
    Json,
};
use postgres_from_row::FromRow;
use rust_decimal::Decimal;
use serde::Serialize;
use ts_rs::TS;
use utoipa::ToSchema;

use crate::{
    errors::{ErrorResponse, HttpError, EXAMPLE_INTERNAL_SERVER_ERROR_RESPONSE},
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
    path = "/programs",
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
            status = "4XX",
            description = "user is wrong",
            body = ErrorResponse
        ),
        (
            status = "5XX",
            description = "something is wrong on our end",
            body = ErrorResponse,
            example = json!(*EXAMPLE_INTERNAL_SERVER_ERROR_RESPONSE)
        )
    )
)]
pub async fn handler(State(state): State<SharedState>) -> Result<impl IntoResponse, HttpError> {
    let client = state.pool.get().await.unwrap();

    let querystring = r##"
        select
            majors.faculty_id,
            faculties.name as faculty_name,
            majors.curriculum_id,
            curriculums.name as curriculum_name,
            majors.id as major_id,
            majors.name as major_name,
            academic_years.year,
            majors.minimum_credit,
            majors.year_amount,
            majors.minimum_gpa
        from majors
        inner join curriculums on majors.curriculum_id = curriculums.id
        inner join faculties on majors.faculty_id = faculties.id
        inner join academic_years on majors.academic_year_id = academic_years.id
    "##;

    let statement = client.prepare(querystring).await?;
    let rows = client.query(&statement, &[]).await?;
    let curriculums = rows
        .iter()
        .map(GetProgramsResponseBodyInner::try_from_row)
        .collect::<Result<Vec<GetProgramsResponseBodyInner>, tokio_postgres::Error>>()?;

    let mut headers = HeaderMap::new();
    headers.insert(CACHE_CONTROL, "public, s-maxage=43200".parse().unwrap());
    let body = GetProgramsResponseBody(curriculums);

    Ok((StatusCode::OK, headers, Json(body)).into_response())
}
