use std::fmt::Display;

use postgres_types::{FromSql, ToSql};
use sea_query::Iden;
use serde::{Deserialize, Serialize};

#[derive(Debug, Iden, PartialEq, Eq, FromSql, ToSql, Deserialize, Serialize)]
#[postgres(name = "day_of_week", rename_all = "lowercase")]
#[serde(rename_all = "lowercase")]
pub enum DayOfWeek {
    Sunday,
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday,
}

impl Display for DayOfWeek {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(
            f,
            "{}",
            match self {
                Self::Sunday => "sunday",
                Self::Monday => "monday",
                Self::Tuesday => "tuesday",
                Self::Wednesday => "wednesday",
                Self::Thursday => "thursday",
                Self::Friday => "friday",
                Self::Saturday => "saturday",
            }
        )
    }
}

impl From<DayOfWeek> for sea_query::Value {
    fn from(value: DayOfWeek) -> Self {
        sea_query::Value::String(Some(Box::new(<DayOfWeek as ToString>::to_string(&value))))
    }
}

impl From<&DayOfWeek> for sea_query::Value {
    fn from(value: &DayOfWeek) -> Self {
        sea_query::Value::String(Some(Box::new(<DayOfWeek as ToString>::to_string(value))))
    }
}
