#[derive(
    ::std::fmt::Debug,
    ::std::cmp::PartialEq,
    ::std::clone::Clone,
    ::postgres_types::FromSql,
    ::postgres_types::ToSql,
    ::serde::Deserialize,
    ::serde::Serialize,
    ::ts_rs::TS
)]
#[serde(rename_all = "lowercase")]
#[postgres(name = "day_of_week")]
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

#[derive(
    ::std::fmt::Debug,
    ::std::cmp::PartialEq,
    ::std::clone::Clone,
    ::postgres_types::FromSql,
    ::postgres_types::ToSql,
    ::serde::Deserialize,
    ::serde::Serialize,
    ::ts_rs::TS
)]
#[serde(rename_all = "lowercase")]
#[postgres(name = "payment_status")]
#[ts(export)]
pub enum PaymentStatus {
    #[postgres(name = "pending")]
    Pending,
    #[postgres(name = "completed")]
    Completed,
    #[postgres(name = "cancelled")]
    Cancelled,
}

#[derive(
    ::std::fmt::Debug,
    ::std::cmp::PartialEq,
    ::std::clone::Clone,
    ::postgres_types::FromSql,
    ::postgres_types::ToSql,
    ::serde::Deserialize,
    ::serde::Serialize,
    ::ts_rs::TS
)]
#[serde(rename_all = "lowercase")]
#[postgres(name = "role")]
#[ts(export)]
pub enum Role {
    #[postgres(name = "admin")]
    Admin,
    #[postgres(name = "professor")]
    Professor,
    #[postgres(name = "student")]
    Student,
}

#[derive(
    ::std::fmt::Debug,
    ::std::cmp::PartialEq,
    ::std::clone::Clone,
    ::postgres_types::FromSql,
    ::postgres_types::ToSql,
    ::serde::Deserialize,
    ::serde::Serialize,
    ::ts_rs::TS
)]
#[serde(rename_all = "lowercase")]
#[postgres(name = "room_type")]
#[ts(export)]
pub enum RoomType {
    #[postgres(name = "lab")]
    Lab,
    #[postgres(name = "lecture")]
    Lecture,
    #[postgres(name = "conference")]
    Conference,
    #[postgres(name = "toilet")]
    Toilet,
    #[postgres(name = "co-working-spaces")]
    CoWorkingSpaces,
    #[postgres(name = "work")]
    Work,
    #[postgres(name = "other")]
    Other,
}

#[derive(
    ::std::fmt::Debug,
    ::std::cmp::PartialEq,
    ::std::clone::Clone,
    ::postgres_types::FromSql,
    ::postgres_types::ToSql,
    ::serde::Deserialize,
    ::serde::Serialize,
    ::ts_rs::TS
)]
#[serde(rename_all = "lowercase")]
#[postgres(name = "semester_exam_type")]
#[ts(export)]
pub enum SemesterExamType {
    #[postgres(name = "midterm")]
    Midterm,
    #[postgres(name = "final")]
    Final,
}
