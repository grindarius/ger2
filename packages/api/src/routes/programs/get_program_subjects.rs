use actix_web::{web, HttpResponse};
use postgres_from_row::FromRow;
use postgres_types::Type;
use rust_decimal::Decimal;
use serde::{Deserialize, Serialize};
use ts_rs::TS;
use utoipa::{IntoParams, ToSchema};

use crate::{
    errors::{HttpError, EXAMPLE_INTERNAL_SERVER_ERROR_RESPONSE},
    macros::top_level_array_ts_type,
    shared::SharedAppData,
};

#[derive(Deserialize, ToSchema, IntoParams, TS)]
#[ts(export)]
pub struct GetProgramSubjectsRequestParams {
    #[into_params(parameter_in = Path)]
    major_id: String,
}

#[derive(Serialize, ToSchema)]
#[serde(transparent)]
pub struct GetProgramSubjectsResponseBody(Vec<GetProgramSubjectsResponseBodyInner>);

impl Default for GetProgramSubjectsResponseBody {
    fn default() -> Self {
        let top_level_subject_group = GetProgramSubjectsResponseBodyInner {
            id: "01HCRXZ9PTDCJ7A4S9XPBGVM30".to_string(),
            major_id: "01HCRXZPJZ9WEAJKFB4MNR54FF".to_string(),
            parent_id: None,
            name: "1. GE subjects".to_string(),
            minimum_credit: Decimal::new(600, 2),
            subject_id: None,
            subject_name: None,
            subject_description: None,
            subject_credit: None,
            subject_created_at: None,
        };

        let first_subject = GetProgramSubjectsResponseBodyInner {
            id: "01HCRY9R1G9XZS2FZJ5Y7Z1NP5".to_string(),
            major_id: "01HCRXZPJZ9WEAJKFB4MNR54FF".to_string(),
            parent_id: Some("01HCRXZ9PTDCJ7A4S9XPBGVM30".to_string()),
            name: "1.1 Direct GE".to_string(),
            minimum_credit: Decimal::new(300, 2),
            subject_id: Some("01HCRYFJH5SRFXDNRNP7PW8YP9".to_string()),
            subject_name: Some("Tai kek dance".to_string()),
            subject_description: Some("Take yourself out for some fresh air".to_string()),
            subject_credit: Some(3),
            subject_created_at: Some(
                time::OffsetDateTime::from_unix_timestamp(1697349722).unwrap(),
            ),
        };

        let second_subject = GetProgramSubjectsResponseBodyInner {
            id: "01HCRY9R1G9XZS2FZJ5Y7Z1NP5".to_string(),
            major_id: "01HCRXZPJZ9WEAJKFB4MNR54FF".to_string(),
            parent_id: Some("01HCRXZ9PTDCJ7A4S9XPBGVM30".to_string()),
            name: "1.1 Direct GE".to_string(),
            minimum_credit: Decimal::new(300, 2),
            subject_id: Some("01HCRYZFSMEHQRSA6JHC1B7ZAJ".to_string()),
            subject_name: Some("Swimming".to_string()),
            subject_description: Some("Come and swim with us".to_string()),
            subject_credit: Some(3),
            subject_created_at: Some(
                time::OffsetDateTime::from_unix_timestamp(1697349722).unwrap(),
            ),
        };

        let third_subject = GetProgramSubjectsResponseBodyInner {
            id: "01HCRY9R1G9XZS2FZJ5Y7Z1NP5".to_string(),
            major_id: "01HCRXZPJZ9WEAJKFB4MNR54FF".to_string(),
            parent_id: Some("01HCRXZ9PTDCJ7A4S9XPBGVM30".to_string()),
            name: "1.1 Direct GE".to_string(),
            minimum_credit: Decimal::new(300, 2),
            subject_id: Some("01HCRZ29T26KBVJ9FEATHRR6TC".to_string()),
            subject_name: Some("Running".to_string()),
            subject_description: Some("Come run with us".to_string()),
            subject_credit: Some(3),
            subject_created_at: Some(
                time::OffsetDateTime::from_unix_timestamp(1697349722).unwrap(),
            ),
        };

        Self(vec![
            top_level_subject_group,
            first_subject,
            second_subject,
            third_subject,
        ])
    }
}

top_level_array_ts_type!(
    GetProgramSubjectsResponseBody,
    GetProgramSubjectsResponseBodyInner
);

#[derive(Serialize, ToSchema, TS, FromRow)]
#[ts(export)]
pub struct GetProgramSubjectsResponseBodyInner {
    #[schema(format = Ulid)]
    id: String,
    #[schema(format = Ulid)]
    major_id: String,
    #[schema(format = Ulid)]
    parent_id: Option<String>,
    name: String,
    #[schema(format = Double)]
    #[serde(with = "rust_decimal::serde::str")]
    #[ts(type = "string")]
    minimum_credit: Decimal,
    #[schema(format = Ulid)]
    subject_id: Option<String>,
    subject_name: Option<String>,
    subject_description: Option<String>,
    subject_credit: Option<i32>,
    #[schema(format = DateTime)]
    #[serde(with = "time::serde::iso8601::option")]
    #[ts(type = "string")]
    subject_created_at: Option<time::OffsetDateTime>,
}

#[utoipa::path(
    get,
    path = "/programs/{major_id}/subjects",
    tag = "programs",
    operation_id = "get_program_subjects",
    params(GetProgramSubjectsRequestParams),
    responses(
        (
            status = 200,
            description = "list of subjects in the program",
            body = GetProgramSubjectsResponseBody,
            example = json!(GetProgramSubjectsResponseBody::default())
        ),
        (
            status = "5XX",
            description = "some mad errors",
            body = ErrorResponse,
            example = json!(*EXAMPLE_INTERNAL_SERVER_ERROR_RESPONSE)
        )
    )
)]
pub async fn handler(
    path: web::Path<GetProgramSubjectsRequestParams>,
    data: web::Data<SharedAppData>,
) -> Result<HttpResponse, HttpError> {
    let client = data.pool.get().await?;
    let statement = client.prepare_typed(r##"
        select
            major_subject_group.id,
            major_subject_group.major_id,
            major_subject_group.parent_id,
            major_subject_group.name,
            major_subject_group.minimum_credit,
            subject.id as subject_id,
            subject.name as subject_name,
            subject.description as subject_description,
            subject.credit as subject_credit,
            subject.created_at as subject_created_at
        from major_subject_group
        left join major_subject on major_subject_group.id = major_subject.major_subject_group_id
        left join subject on major_subject.subject_id = subject.id where major_subject_group.major_id = $1
    "##, &[Type::TEXT]).await?;

    let subjects = client.query(&statement, &[&path.major_id]).await?;
    let subjects = subjects
        .iter()
        .map(|subject| GetProgramSubjectsResponseBodyInner::try_from_row(subject))
        .collect::<Result<Vec<GetProgramSubjectsResponseBodyInner>, tokio_postgres::Error>>()?;

    Ok(HttpResponse::Ok().json(subjects))
}
