use postgres_types::{FromSql, ToSql};
use serde::{Deserialize, Serialize};
use ts_rs::TS;
use utoipa::ToSchema;

#[derive(Debug, Deserialize, Serialize, ToSchema, TS, FromSql, ToSql)]
#[postgres(name = "user_role")]
#[serde(rename_all = "lowercase")]
#[ts(export)]
pub enum Role {
    #[postgres(name = "admin")]
    Admin,
    #[postgres(name = "professor")]
    Professor,
    #[postgres(name = "student")]
    Student,
}

#[derive(Debug, Deserialize, Serialize, ToSchema, TS, FromSql, ToSql)]
#[postgres(name = "day_of_week")]
#[serde(rename_all = "lowercase")]
#[ts(export)]
pub enum DayOfWeek {
    #[postgres(name = "sunday")]
    Sunday,
    #[postgres(name = "monday")]
    Monday,
    #[postgres(name = "tuesday")]
    Tuesday,
    #[postgres(name = "wednesday")]
    Wednesday,
    #[postgres(name = "thursday")]
    Thursday,
    #[postgres(name = "friday")]
    Friday,
    #[postgres(name = "saturday")]
    Saturday,
}

#[derive(Debug, Deserialize, Serialize, ToSchema, TS, FromSql, ToSql)]
#[postgres(name = "semester_type")]
#[serde(rename_all = "lowercase")]
#[ts(export)]
pub enum SemesterType {
    #[postgres(name = "midterm")]
    Midterm,
    #[postgres(name = "final")]
    Final,
}
