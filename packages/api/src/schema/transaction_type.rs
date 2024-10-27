use std::fmt::Display;

use postgres_types::{FromSql, ToSql};
use sea_query::Iden;
use serde::{Deserialize, Serialize};

#[derive(Debug, Iden, PartialEq, Eq, FromSql, ToSql, Deserialize, Serialize)]
#[postgres(name = "transaction_type", rename_all = "kebab-case")]
#[serde(rename_all = "kebab-case")]
pub enum TransactionType {
    #[iden = "enroll-subject"]
    EnrollSubject,

    #[iden = "move-subject"]
    MoveSubject,
}

impl Display for TransactionType {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(
            f,
            "{}",
            match self {
                Self::EnrollSubject => "enroll-subject",
                Self::MoveSubject => "move-subject",
            }
        )
    }
}

impl From<TransactionType> for sea_query::Value {
    fn from(value: TransactionType) -> Self {
        sea_query::Value::String(Some(Box::new(<TransactionType as ToString>::to_string(
            &value,
        ))))
    }
}

impl From<&TransactionType> for sea_query::Value {
    fn from(value: &TransactionType) -> Self {
        sea_query::Value::String(Some(Box::new(<TransactionType as ToString>::to_string(
            value,
        ))))
    }
}
