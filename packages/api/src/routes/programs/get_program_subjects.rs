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
    errors::{HttpError, EXAMPLE_INTERNAL_SERVER_ERROR_RESPONSE},
    state::SharedState,
};

#[derive(Deserialize, IntoParams, ToSchema, TS)]
#[ts(export)]
pub struct GetProgramSubjectsRequestParams {
    #[into_params(parameter_in = Path)]
    #[schema(format = Ulid)]
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
    Path(path): Path<GetProgramSubjectsRequestParams>,
    State(state): State<SharedState>,
) -> Result<impl IntoResponse, HttpError> {
    let client = state.pool.get().await?;

    let tree_querystring = r##"
        select
            major_subject_groups.id,
            major_subject_groups.major_id,
            major_subject_groups.parent_id,
            major_subject_groups.name,
            major_subject_groups.minimum_credit
        from major_subject_groups
        where major_subject_groups.major_id = $1
    "##;

    let subjects_querystring = r##"
        select
            subjects.id,
            subjects.name,
            subjects.credit,
            subjects.created_at,
            major_subjects.major_subject_group_id
        from subjects
        inner join major_subjects on subjects.id = major_subjects.subject_id
        inner join major_subject_groups on major_subjects.major_subject_group_id = major_subject_groups.id
        inner join majors on major_subject_groups.major_id = majors.id
        where majors.id = $1
    "##;

    let tree_statement = client
        .prepare_typed(tree_querystring, &[Type::VARCHAR])
        .await?;
    let subjects_statement = client
        .prepare_typed(subjects_querystring, &[Type::VARCHAR])
        .await?;

    let tree = client.query(&tree_statement, &[&path.major_id]).await?;
    let subjects = client.query(&subjects_statement, &[&path.major_id]).await?;

    let tree = tree
        .iter()
        .map(GetProgramSubjectsResponseBodyTree::try_from_row)
        .collect::<Result<Vec<GetProgramSubjectsResponseBodyTree>, tokio_postgres::Error>>()?;

    let subjects = subjects
        .iter()
        .map(GetProgramSubjectsResponseBodySubject::try_from_row)
        .collect::<Result<Vec<GetProgramSubjectsResponseBodySubject>, tokio_postgres::Error>>()?;

    Ok(Json(GetProgramSubjectsResponseBody { tree, subjects }))
}
