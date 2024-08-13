use sea_query::Iden;
use serde::{Deserialize, Serialize};
use time::OffsetDateTime;

#[derive(Iden)]
pub enum Students {
    Table,
    AccountId,
    MajorId,
    AcademicYearId,
    ProfessorId,
    StudentId,
    BehavioralScore,
    Status,
    PreviousGpa,
    CreatedAt,
    UpdatedAt,
}

/// Struct denoting the user's type in a `jsonb` column.
#[derive(Deserialize, Serialize)]
#[serde(tag = "type")]
#[serde(rename_all = "kebab-case")]
pub enum StudentStatus {
    Studying,
    RestingForTreatment {
        semester_id: String,
    },
    Resting {
        semester_id: String,
    },
    ForcedToRest {
        semester_id: String,
    },
    RetiredByInsufficientGrades {
        #[serde(with = "time::serde::iso8601")]
        retired_at: OffsetDateTime,
    },
    RetiredByNotPaying {
        #[serde(with = "time::serde::iso8601")]
        retired_at: OffsetDateTime,
    },
    RetiredByNotSigning {
        #[serde(with = "time::serde::iso8601")]
        retired_at: OffsetDateTime,
    },
    RetiredBySigningButNotPaying {
        #[serde(with = "time::serde::iso8601")]
        retired_at: OffsetDateTime,
    },
    RetiredByRunningOutOfTimeToStudy {
        #[serde(with = "time::serde::iso8601")]
        retired_at: OffsetDateTime,
    },
    RetiredByHavingInsufficientEnglishGrades {
        #[serde(with = "time::serde::iso8601")]
        retired_at: OffsetDateTime,
    },
    Resigned {
        reason: String,
        #[serde(with = "time::serde::iso8601")]
        resigned_at: OffsetDateTime,
    },
    Fired {
        reason: String,
        #[serde(with = "time::serde::iso8601")]
        fired_at: OffsetDateTime,
    },
    Deceased {
        #[serde(with = "time::serde::iso8601")]
        deceased_at: OffsetDateTime,
    },
    Graduated {
        #[serde(with = "time::serde::iso8601")]
        graduated_at: OffsetDateTime,
    },
}
