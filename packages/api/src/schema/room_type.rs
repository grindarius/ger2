use std::fmt::Display;

use postgres_types::{FromSql, ToSql};
use sea_query::Iden;
use serde::{Deserialize, Serialize};

#[derive(Debug, Iden, PartialEq, Eq, FromSql, ToSql, Deserialize, Serialize)]
#[postgres(name = "room_type")]
#[serde(rename_all = "lowercase")]
pub enum RoomType {
    Study,
    Lab,
    Conference,
    Other,
}

impl Display for RoomType {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(
            f,
            "{}",
            match self {
                Self::Study => "study",
                Self::Lab => "lab",
                Self::Conference => "conference",
                Self::Other => "other",
            }
        )
    }
}

impl From<RoomType> for sea_query::Value {
    fn from(value: RoomType) -> Self {
        sea_query::Value::String(Some(Box::new(<RoomType as ToString>::to_string(&value))))
    }
}

impl From<&RoomType> for sea_query::Value {
    fn from(value: &RoomType) -> Self {
        sea_query::Value::String(Some(Box::new(<RoomType as ToString>::to_string(value))))
    }
}
