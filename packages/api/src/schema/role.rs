use std::fmt::Display;

use postgres_types::{FromSql, ToSql};
use sea_query::Iden;
use serde::{Deserialize, Serialize};

#[derive(Debug, Iden, PartialEq, Eq, FromSql, ToSql, Deserialize, Serialize)]
#[postgres(name = "role")]
#[serde(rename_all = "lowercase")]
pub enum Role {
    Admin,
    Professor,
    Student,
}

impl Display for Role {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(
            f,
            "{}",
            match self {
                Self::Admin => "admin",
                Self::Professor => "professor",
                Self::Student => "student",
            }
        )
    }
}

impl From<Role> for sea_query::Value {
    fn from(value: Role) -> Self {
        sea_query::Value::String(Some(Box::new(<Role as ToString>::to_string(&value))))
    }
}

impl From<&Role> for sea_query::Value {
    fn from(value: &Role) -> Self {
        sea_query::Value::String(Some(Box::new(<Role as ToString>::to_string(value))))
    }
}
