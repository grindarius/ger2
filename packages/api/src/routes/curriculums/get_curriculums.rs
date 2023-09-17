use actix_web::{
    http::header::{self, CacheDirective},
    web, HttpResponse,
};
use postgres_from_row::FromRow;
use rust_decimal::Decimal;
use serde::Serialize;
use ts_rs::TS;
use utoipa::ToSchema;

use crate::{
    errors::{HttpError, EXAMPLE_INTERNAL_SERVER_ERROR_RESPONSE},
    macros::top_level_array_ts_type,
    shared::SharedAppData,
};

#[derive(Serialize, ToSchema)]
#[serde(transparent)]
pub struct GetCurriculumsResponseBody(Vec<GetCurriculumsResponseBodyInner>);

impl Default for GetCurriculumsResponseBody {
    fn default() -> Self {
        Self(vec![GetCurriculumsResponseBodyInner::default()])
    }
}

#[derive(Serialize, ToSchema, TS, FromRow)]
#[ts(export)]
pub struct GetCurriculumsResponseBodyInner {
    faculty_id: String,
    faculty_name: String,
    curriculum_id: String,
    curriculum_name: String,
    major_id: String,
    major_name: String,
    year: i32,
    minimum_credit: i32,
    year_amount: i16,
    #[ts(type = "string")]
    #[serde(with = "rust_decimal::serde::str")]
    minimum_gpa: Decimal,
}

impl Default for GetCurriculumsResponseBodyInner {
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

top_level_array_ts_type!(GetCurriculumsResponseBody, GetCurriculumsResponseBodyInner);

/// API route to return all data of all faculty, curriculums, and majors in the school/university.
#[utoipa::path(
    get,
    path = "/curriculums",
    tag = "curriculums",
    operation_id = "get_curriculums",
    responses(
        (
            status = 200,
            description = "you get list of curriculums",
            body = GetCurriculumsResponseBody,
            example = json!(GetCurriculumsResponseBody::default())
        ),
        (
            status = 500,
            description = "something wrong on our end",
            body = ErrorResponse,
            example = json!(*EXAMPLE_INTERNAL_SERVER_ERROR_RESPONSE)
        )
    )
)]
pub async fn handler(data: web::Data<SharedAppData>) -> Result<HttpResponse, HttpError> {
    let client = data.pool.get().await?;

    let statement = client
        .prepare(
            r##"
            select
                faculty.id as faculty_id,
                faculty.name as faculty_name,
                curriculum.id as curriculum_id,
                curriculum.name as curriculum_name,
                major.id as major_id,
                major.name as major_name,
                academic_year.year as year,
                major.minimum_credit as minimum_credit,
                major.year_amount as year_amount,
                major.minimum_gpa as minimum_gpa
            from major
            inner join curriculum on major.curriculum_id = curriculum.id
            inner join faculty on curriculum.faculty_id = faculty.id
            inner join academic_year on major.academic_year_id = academic_year.id
            "##,
        )
        .await?;

    let rows = client.query(&statement, &[]).await?;
    let curriculums = rows
        .iter()
        .map(|r| GetCurriculumsResponseBodyInner::try_from_row(r))
        .collect::<Result<Vec<GetCurriculumsResponseBodyInner>, tokio_postgres::Error>>()?;

    Ok(HttpResponse::Ok()
        .insert_header(header::CacheControl(vec![
            CacheDirective::Public,
            CacheDirective::SMaxAge(43200),
        ]))
        .json(GetCurriculumsResponseBody(curriculums)))
}