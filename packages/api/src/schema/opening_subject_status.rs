use std::fmt::Display;

use postgres_types::{FromSql, ToSql};
use sea_query::Iden;
use serde::{Deserialize, Serialize};

#[derive(Debug, Iden, PartialEq, Eq, FromSql, ToSql, Deserialize, Serialize)]
#[postgres(name = "opening_subject_status", rename_all = "kebab-case")]
#[serde(rename_all = "kebab-case")]
pub enum OpeningSubjectStatus {
    Open,
    OpenOnlyForDisenrollment,
    Closed,
}

impl Display for OpeningSubjectStatus {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(
            f,
            "{}",
            match self {
                Self::Open => "open",
                Self::OpenOnlyForDisenrollment => "open-only-for-disenrollment",
                Self::Closed => "closed",
            }
        )
    }
}

impl From<OpeningSubjectStatus> for sea_query::Value {
    fn from(value: OpeningSubjectStatus) -> Self {
        sea_query::Value::String(Some(Box::new(
            <OpeningSubjectStatus as ToString>::to_string(&value),
        )))
    }
}

impl From<&OpeningSubjectStatus> for sea_query::Value {
    fn from(value: &OpeningSubjectStatus) -> Self {
        sea_query::Value::String(Some(Box::new(
            <OpeningSubjectStatus as ToString>::to_string(value),
        )))
    }
}
