use axum::{
    extract::{Path, State},
    response::IntoResponse,
    Json,
};
use postgres_from_row::FromRow;
use rust_decimal::Decimal;
use sea_query::{Expr, PostgresQueryBuilder, Query};
use serde::{Deserialize, Serialize};
use ts_rs::TS;
use utoipa::{IntoParams, ToSchema};

use crate::{
    database::schema::{MajorSubjectGroupsIden, MajorSubjectsIden, MajorsIden, SubjectsIden},
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
    path = "/v1/programs/{major_id}/subjects",
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

    let mut tree_query = Query::select();
    tree_query
        .columns([
            (MajorSubjectGroupsIden::Table, MajorSubjectGroupsIden::Id),
            (
                MajorSubjectGroupsIden::Table,
                MajorSubjectGroupsIden::MajorId,
            ),
            (
                MajorSubjectGroupsIden::Table,
                MajorSubjectGroupsIden::ParentId,
            ),
            (MajorSubjectGroupsIden::Table, MajorSubjectGroupsIden::Name),
            (
                MajorSubjectGroupsIden::Table,
                MajorSubjectGroupsIden::MinimumCredit,
            ),
        ])
        .from(MajorSubjectGroupsIden::Table)
        .and_where(
            Expr::col((
                MajorSubjectGroupsIden::Table,
                MajorSubjectGroupsIden::MajorId,
            ))
            .eq(&path.major_id),
        );

    let mut subjects_query = Query::select();
    subjects_query
        .columns([
            (SubjectsIden::Table, SubjectsIden::Id),
            (SubjectsIden::Table, SubjectsIden::Name),
            (SubjectsIden::Table, SubjectsIden::Credit),
            (SubjectsIden::Table, SubjectsIden::CreatedAt),
        ])
        .column((
            MajorSubjectsIden::Table,
            MajorSubjectsIden::MajorSubjectGroupId,
        ))
        .from(SubjectsIden::Table)
        .inner_join(
            MajorSubjectsIden::Table,
            Expr::col((SubjectsIden::Table, SubjectsIden::Id))
                .equals((MajorSubjectsIden::Table, MajorSubjectsIden::SubjectId)),
        )
        .inner_join(
            MajorSubjectGroupsIden::Table,
            Expr::col((
                MajorSubjectsIden::Table,
                MajorSubjectsIden::MajorSubjectGroupId,
            ))
            .equals((MajorSubjectGroupsIden::Table, MajorSubjectGroupsIden::Id)),
        )
        .inner_join(
            MajorsIden::Table,
            Expr::col((
                MajorSubjectGroupsIden::Table,
                MajorSubjectGroupsIden::MajorId,
            ))
            .equals((MajorsIden::Table, MajorsIden::Id)),
        )
        .and_where(Expr::col((MajorsIden::Table, MajorsIden::Id)).eq(&path.major_id));

    let tree_statement = client
        .prepare(&tree_query.to_string(PostgresQueryBuilder))
        .await?;
    let subjects_statement = client
        .prepare(&subjects_query.to_string(PostgresQueryBuilder))
        .await?;

    let subjects_tree = client.query(&tree_statement, &[]).await?;
    let subjects = client.query(&subjects_statement, &[]).await?;

    let subjects_tree = subjects_tree
        .iter()
        .map(|subject| GetProgramSubjectsResponseBodyTree::try_from_row(subject))
        .collect::<Result<Vec<GetProgramSubjectsResponseBodyTree>, tokio_postgres::Error>>()?;

    let subjects = subjects
        .iter()
        .map(|subject| GetProgramSubjectsResponseBodySubject::try_from_row(subject))
        .collect::<Result<Vec<GetProgramSubjectsResponseBodySubject>, tokio_postgres::Error>>()?;

    Ok(Json(GetProgramSubjectsResponseBody {
        tree: subjects_tree,
        subjects,
    }))
}
