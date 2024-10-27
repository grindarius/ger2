use std::fmt::Display;

use postgres_types::{FromSql, ToSql};
use sea_query::Iden;
use serde::{Deserialize, Serialize};

#[derive(Debug, Iden, PartialEq, Eq, FromSql, ToSql, Deserialize, Serialize)]
#[postgres(name = "transaction_status")]
#[serde(rename_all = "lowercase")]
pub enum TransactionStatus {
    Pending,
    Completed,
    Failed,
}

impl Display for TransactionStatus {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(
            f,
            "{}",
            match self {
                Self::Pending => "pending",
                Self::Completed => "completed",
                Self::Failed => "failed",
            }
        )
    }
}

impl From<TransactionStatus> for sea_query::Value {
    fn from(value: TransactionStatus) -> Self {
        sea_query::Value::String(Some(Box::new(<TransactionStatus as ToString>::to_string(
            &value,
        ))))
    }
}

impl From<&TransactionStatus> for sea_query::Value {
    fn from(value: &TransactionStatus) -> Self {
        sea_query::Value::String(Some(Box::new(<TransactionStatus as ToString>::to_string(
            value,
        ))))
    }
}
