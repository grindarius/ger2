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

#[derive(Serialize, ToSchema, TS)]
#[ts(export)]
pub struct GetProgramSubjectsResponseBody {
    tree: Vec<GetProgramSubjectsResponseBodyTree>,
    subjects: Vec<GetProgramSubjectsResponseBodySubject>,
}

impl Default for GetProgramSubjectsResponseBody {
    fn default() -> Self {
        let first_subject_group = GetProgramSubjectsResponseBodyTree {
            id: "01HCRXZ9PTDCJ7A4S9XPBGVM30".to_string(),
            major_id: "01HCRXZPJZ9WEAJKFB4MNR54FF".to_string(),
            parent_id: None,
            name: "1. GE subjects".to_string(),
            minimum_credit: Decimal::new(600, 2),
        };

        let first_subject_subgroup = GetProgramSubjectsResponseBodyTree {
            id: "01HCRY9R1G9XZS2FZJ5Y7Z1NP5".to_string(),
            major_id: "01HCRXZPJZ9WEAJKFB4MNR54FF".to_string(),
            parent_id: Some("01HCRXZ9PTDCJ7A4S9XPBGVM30".to_string()),
            name: "1.1 Direct GE".to_string(),
            minimum_credit: Decimal::new(300, 2),
        };

        let second_subject_group = GetProgramSubjectsResponseBodyTree {
            id: "01HE0FVRK8DYJ8PRNH5ZQG0W3A".to_string(),
            major_id: "01HCRXZPJZ9WEAJKFB4MNR54FF".to_string(),
            parent_id: None,
            name: "2 Subjects you need to do".to_string(),
            minimum_credit: Decimal::new(300, 2),
        };

        let second_subject_subgroup = GetProgramSubjectsResponseBodyTree {
            id: "01HE0FSX75NGDFEFKM4SNGCFMW".to_string(),
            major_id: "01HCRXZPJZ9WEAJKFB4MNR54FF".to_string(),
            parent_id: Some("01HE0FVRK8DYJ8PRNH5ZQG0W3A".to_string()),
            name: "2.1 Main subjects".to_string(),
            minimum_credit: Decimal::new(300, 2),
        };

        let subjects: Vec<GetProgramSubjectsResponseBodySubject> = vec![
            GetProgramSubjectsResponseBodySubject {
                id: "01HE0H7AJC6AFMAC4HV7Y4SW2V".to_string(),
                major_subject_group_id: "01HE0FSX75NGDFEFKM4SNGCFMW".to_string(),
                name: "Web Development and Technology".to_string(),
                credit: 6,
                created_at: time::OffsetDateTime::from_unix_timestamp(1698677499).unwrap(),
            },
            GetProgramSubjectsResponseBodySubject {
                id: "01HE0H7FYTRE5JDE08Y4PGMRTB".to_string(),
                major_subject_group_id: "01HE0FSX75NGDFEFKM4SNGCFMW".to_string(),
                name: "Trading 101".to_string(),
                credit: 6,
                created_at: time::OffsetDateTime::from_unix_timestamp(1698677499).unwrap(),
            },
            GetProgramSubjectsResponseBodySubject {
                id: "01HE0H7QCSGYQ1CC1W31555RAY".to_string(),
                major_subject_group_id: "01HE0FSX75NGDFEFKM4SNGCFMW".to_string(),
                name: "Species Topics in Computer Science".to_string(),
                credit: 6,
                created_at: time::OffsetDateTime::from_unix_timestamp(1698677499).unwrap(),
            },
        ];

        Self {
            tree: vec![
                first_subject_group,
                first_subject_subgroup,
                second_subject_group,
                second_subject_subgroup,
            ],
            subjects,
        }
    }
}

#[derive(Serialize, ToSchema, TS, FromRow)]
#[ts(export)]
pub struct GetProgramSubjectsResponseBodyTree {
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
}

#[derive(Serialize, ToSchema, TS, FromRow)]
#[ts(export)]
pub struct GetProgramSubjectsResponseBodySubject {
    #[schema(format = Ulid)]
    id: String,
    #[schema(format = Ulid)]
    major_subject_group_id: String,
    name: String,
    credit: i32,
    #[schema(format = DateTime)]
    #[serde(with = "time::serde::iso8601")]
    #[ts(type = "string")]
    created_at: time::OffsetDateTime,
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
    let tree_statement = client
        .prepare_typed(
            r##"
            select
                major_subject_group.id,
                major_subject_group.major_id,
                major_subject_group.parent_id,
                major_subject_group.name,
                major_subject_group.minimum_credit
            from major_subject_group
            where major_subject_group.major_id = $1"##,
            &[Type::TEXT],
        )
        .await?;

    let subjects_statement = client
        .prepare_typed(
            r##"
            select
                subject.id,
                major_subject.major_subject_group_id,
                subject.name,
                subject.credit,
                subject.created_at
            from subject
            inner join major_subject on subject.id = major_subject.subject_id
            inner join major_subject_group on major_subject.major_subject_group_id = major_subject_group.id
            inner join major on major_subject_group.major_id = major.id
            where major.id = $1"##,
            &[Type::TEXT],
        )
        .await?;

    let subjects_tree = client.query(&tree_statement, &[&path.major_id]).await?;
    let subjects = client.query(&subjects_statement, &[&path.major_id]).await?;

    let subjects_tree = subjects_tree
        .iter()
        .map(|subject| GetProgramSubjectsResponseBodyTree::try_from_row(subject))
        .collect::<Result<Vec<GetProgramSubjectsResponseBodyTree>, tokio_postgres::Error>>()?;

    let subjects = subjects
        .iter()
        .map(|subject| GetProgramSubjectsResponseBodySubject::try_from_row(subject))
        .collect::<Result<Vec<GetProgramSubjectsResponseBodySubject>, tokio_postgres::Error>>()?;

    Ok(HttpResponse::Ok().json(GetProgramSubjectsResponseBody {
        tree: subjects_tree,
        subjects,
    }))
}
