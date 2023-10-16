use actix_web::{web, HttpResponse};
use postgres_from_row::FromRow;
use postgres_types::Type;
use serde::{Deserialize, Serialize};
use ts_rs::TS;
use utoipa::{IntoParams, ToSchema};

use crate::{
    errors::{
        HttpError, EXAMPLE_INTERNAL_SERVER_ERROR_RESPONSE, EXAMPLE_PROGRAM_DATA_NOT_FOUND_RESPONSE,
    },
    shared::SharedAppData,
};

#[derive(Deserialize, ToSchema, IntoParams, TS)]
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
    academic_year_id: String,
    year: i32,
    #[schema(format = Double)]
    #[serde(with = "rust_decimal::serde::str")]
    #[ts(type = "string")]
    minimum_gpa: rust_decimal::Decimal,
    year_amount: i16,
    minimum_credit: i32,
    #[schema(format = DateTime)]
    #[serde(with = "time::serde::iso8601")]
    #[ts(type = "string")]
    created_at: time::OffsetDateTime,
}

impl Default for GetProgramResponseBody {
    fn default() -> Self {
        return Self {
            id: "01HCD9J08N58KWQA479S1M6G0C".to_string(),
            name: "Bachelor of Software Engineer, \"A\" version".to_string(),
            academic_year_id: "01HCD9P06P61BPY9Q3BDSRWWW6".to_string(),
            year: 2022,
            minimum_gpa: rust_decimal::Decimal::new(20, 1),
            year_amount: 4,
            minimum_credit: 130,
            created_at: time::OffsetDateTime::from_unix_timestamp(1696958674).unwrap(),
        };
    }
}

/// Path to get program's description about the format and all that stuff
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
    params: web::Path<GetProgramRequestParams>,
    data: web::Data<SharedAppData>,
) -> Result<HttpResponse, HttpError> {
    let client = data.pool.get().await?;
    let statement = client
        .prepare_typed(
            r##"
                select
                    major.id as id,
                    major.name as name,
                    major.academic_year_id as academic_year_id,
                    academic_year.year as year,
                    major.minimum_gpa as minimum_gpa,
                    major.year_amount as year_amount,
                    major.minimum_credit as minimum_credit,
                    major.created_at as created_at
                from major
                inner join academic_year on major.academic_year_id = academic_year.id
                where major.id = $1
            "##,
            &[Type::TEXT],
        )
        .await?;

    let major = client
        .query_one(&statement, &[&params.major_id])
        .await
        .map_err(|_e| HttpError::QueryNotFound { field: "major_id" })?;
    let major = GetProgramResponseBody::try_from_row(&major)?;

    Ok(HttpResponse::Ok().json(major))
}
