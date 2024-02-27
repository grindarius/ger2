//! Stores information about database's tables and types. This file is automagically
//! generated. Please do not edit this file by hand at all means.

use super::custom_types::*;

#[allow(dead_code)]
pub enum DayOfWeekIden {
    Type,
    Sunday,
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday,
}

impl ::sea_query::Iden for DayOfWeekIden {
    fn unquoted(&self, s: &mut dyn ::std::fmt::Write) {
        write!(
            s,
            "{}",
            match self {
                Self::Type => "day_of_week",
                Self::Sunday => "sunday",
                Self::Monday => "monday",
                Self::Tuesday => "tuesday",
                Self::Wednesday => "wednesday",
                Self::Thursday => "thursday",
                Self::Friday => "friday",
                Self::Saturday => "saturday",
            }
        )
        .unwrap()
    }
}

#[allow(dead_code)]
pub enum PaymentStatusIden {
    Type,
    Pending,
    Completed,
    Cancelled,
}

impl ::sea_query::Iden for PaymentStatusIden {
    fn unquoted(&self, s: &mut dyn ::std::fmt::Write) {
        write!(
            s,
            "{}",
            match self {
                Self::Type => "payment_status",
                Self::Pending => "pending",
                Self::Completed => "completed",
                Self::Cancelled => "cancelled",
            }
        )
        .unwrap()
    }
}

#[allow(dead_code)]
pub enum RoleIden {
    Type,
    Admin,
    Professor,
    Student,
}

impl ::sea_query::Iden for RoleIden {
    fn unquoted(&self, s: &mut dyn ::std::fmt::Write) {
        write!(
            s,
            "{}",
            match self {
                Self::Type => "role",
                Self::Admin => "admin",
                Self::Professor => "professor",
                Self::Student => "student",
            }
        )
        .unwrap()
    }
}

#[allow(dead_code)]
pub enum SemesterTypeIden {
    Type,
    Midterm,
    Final,
}

impl ::sea_query::Iden for SemesterTypeIden {
    fn unquoted(&self, s: &mut dyn ::std::fmt::Write) {
        write!(
            s,
            "{}",
            match self {
                Self::Type => "semester_type",
                Self::Midterm => "midterm",
                Self::Final => "final",
            }
        )
        .unwrap()
    }
}

#[allow(dead_code)]
#[sea_query::enum_def]
pub struct AcademicYears {
    id: ::std::string::String,
    year: ::std::primitive::i32,
    start_at: ::time::OffsetDateTime,
    end_at: ::time::OffsetDateTime,
    created_at: ::time::OffsetDateTime,
    updated_at: ::time::OffsetDateTime,
}

#[allow(dead_code)]
#[sea_query::enum_def]
pub struct AccountNames {
    id: ::std::string::String,
    account_id: ::std::string::String,
    name_language: ::std::string::String,
    first_name: ::std::string::String,
    middle_name: ::std::string::String,
    last_name: ::std::string::String,
}

#[allow(dead_code)]
#[sea_query::enum_def]
pub struct AccountSessions {
    id: ::std::string::String,
    account_id: ::std::string::String,
    expires: ::time::OffsetDateTime,
    fresh: ::std::primitive::bool,
}

#[allow(dead_code)]
#[sea_query::enum_def]
pub struct Accounts {
    id: ::std::string::String,
    username: ::std::string::String,
    email: ::std::string::String,
    password: ::std::string::String,
    role: Role,
    birthdate: ::time::Date,
    created_at: ::time::OffsetDateTime,
    updated_at: ::std::option::Option<::time::OffsetDateTime>,
}

#[allow(dead_code)]
#[sea_query::enum_def]
pub struct Buildings {
    id: ::std::string::String,
    name: ::std::string::String,
    description: ::std::string::String,
    coordinates: ::geo_types::Point<f64>,
    building_created_at: ::time::OffsetDateTime,
    created_at: ::time::OffsetDateTime,
    updated_at: ::std::option::Option<::time::OffsetDateTime>,
}

#[allow(dead_code)]
#[sea_query::enum_def]
pub struct Curriculums {
    id: ::std::string::String,
    faculty_id: ::std::string::String,
    name: ::std::string::String,
    created_at: ::time::OffsetDateTime,
    updated_at: ::std::option::Option<::time::OffsetDateTime>,
}

#[allow(dead_code)]
#[sea_query::enum_def]
pub struct Faculties {
    id: ::std::string::String,
    name: ::std::string::String,
    created_at: ::time::OffsetDateTime,
    updated_at: ::std::option::Option<::time::OffsetDateTime>,
}

#[allow(dead_code)]
#[sea_query::enum_def]
pub struct ForumMembers {
    forum_id: ::std::string::String,
    account_id: ::std::string::String,
    role_id: ::std::string::String,
}

#[allow(dead_code)]
#[sea_query::enum_def]
pub struct ForumPostComments {
    id: ::std::string::String,
    forum_post_id: ::std::string::String,
    forum_member_id: ::std::string::String,
    content: ::std::string::String,
    created_at: ::time::OffsetDateTime,
    updated_at: ::std::option::Option<::time::OffsetDateTime>,
}

#[allow(dead_code)]
#[sea_query::enum_def]
pub struct ForumPosts {
    id: ::std::string::String,
    forum_member_id: ::std::string::String,
    name: ::std::string::String,
    content: ::std::string::String,
    created_at: ::time::OffsetDateTime,
    updated_at: ::std::option::Option<::time::OffsetDateTime>,
}

#[allow(dead_code)]
#[sea_query::enum_def]
pub struct ForumRoles {
    id: ::std::string::String,
    name: ::std::string::String,
    description: ::std::string::String,
}

#[allow(dead_code)]
#[sea_query::enum_def]
pub struct Forums {
    id: ::std::string::String,
    account_id: ::std::string::String,
    name: ::std::string::String,
    slug: ::std::string::String,
    description: ::std::string::String,
    created_at: ::time::OffsetDateTime,
    updated_at: ::std::option::Option<::time::OffsetDateTime>,
}

#[allow(dead_code)]
#[sea_query::enum_def]
pub struct MajorSubjectGroups {
    id: ::std::string::String,
    major_id: ::std::string::String,
    hierarchy: Ltree,
    name: ::std::string::String,
    minimum_credit: ::std::option::Option<::rust_decimal::Decimal>,
    created_at: ::time::OffsetDateTime,
    updated_at: ::std::option::Option<::time::OffsetDateTime>,
}

#[allow(dead_code)]
#[sea_query::enum_def]
pub struct MajorSubjects {
    major_subject_group_id: ::std::string::String,
    subject_id: ::std::string::String,
    credit: ::std::primitive::i32,
}

#[allow(dead_code)]
#[sea_query::enum_def]
pub struct Majors {
    id: ::std::string::String,
    curriculum_id: ::std::string::String,
    academic_year_id: ::std::string::String,
    name: ::std::string::String,
    minimum_gpa: ::rust_decimal::Decimal,
    year_amount: ::std::primitive::i16,
    minimum_credit: ::std::primitive::i32,
    created_at: ::time::OffsetDateTime,
}

#[allow(dead_code)]
#[sea_query::enum_def]
pub struct OpeningSubjectAdditionalEligibleStudents {
    id: ::std::string::String,
    opening_subject_id: ::std::string::String,
    student_id: ::std::string::String,
}

#[allow(dead_code)]
#[sea_query::enum_def]
pub struct OpeningSubjectAssignments {
    id: ::std::string::String,
    opening_subject_id: ::std::string::String,
    professor_id: ::std::string::String,
    name: ::std::string::String,
    full_score: ::rust_decimal::Decimal,
    created_at: ::time::OffsetDateTime,
    updated_at: ::std::option::Option<::time::OffsetDateTime>,
}

#[allow(dead_code)]
#[sea_query::enum_def]
pub struct OpeningSubjectEligibleMajors {
    id: ::std::string::String,
    opening_subject_id: ::std::string::String,
    major_id: ::std::string::String,
    academic_year_id: ::std::string::String,
}

#[allow(dead_code)]
#[sea_query::enum_def]
pub struct OpeningSubjectSchedules {
    id: ::std::string::String,
    opening_subject_id: ::std::string::String,
    room_id: ::std::string::String,
    day: DayOfWeek,
    start_at: ::time::Time,
    end_at: ::time::Time,
    created_at: ::time::OffsetDateTime,
    updated_at: ::std::option::Option<::time::OffsetDateTime>,
}

#[allow(dead_code)]
#[sea_query::enum_def]
pub struct OpeningSubjectStudentAssignments {
    id: ::std::string::String,
    opening_subject_student_enrollment_id: ::std::string::String,
    opening_subject_assignment_id: ::std::string::String,
    score: ::rust_decimal::Decimal,
    created_at: ::time::OffsetDateTime,
    updated_at: ::std::option::Option<::time::OffsetDateTime>,
}

#[allow(dead_code)]
#[sea_query::enum_def]
pub struct OpeningSubjectStudentEnrollments {
    id: ::std::string::String,
    opening_subject_id: ::std::string::String,
    student_id: ::std::string::String,
    class_comment: ::std::string::String,
}

#[allow(dead_code)]
#[sea_query::enum_def]
pub struct OpeningSubjects {
    id: ::std::string::String,
    semester_term_id: ::std::string::String,
    subject_id: ::std::string::String,
    subject_capacity: ::std::primitive::i32,
    grading_criteria: ::serde_json::Value,
}

#[allow(dead_code)]
#[sea_query::enum_def]
pub struct OpeningSubjectsProfessors {
    id: ::std::string::String,
    opening_subject_id: ::std::string::String,
    professor_id: ::std::string::String,
}

#[allow(dead_code)]
#[sea_query::enum_def]
pub struct Professors {
    account_id: ::std::string::String,
    description: ::std::string::String,
}

#[allow(dead_code)]
#[sea_query::enum_def]
pub struct Rooms {
    id: ::std::string::String,
    building_id: ::std::string::String,
    name: ::std::string::String,
    description: ::std::string::String,
    capacity: ::std::primitive::i32,
    floor: ::std::primitive::i32,
}

#[allow(dead_code)]
#[sea_query::enum_def]
pub struct SemesterTerms {
    id: ::std::string::String,
    semester_id: ::std::string::String,
    exam_type: SemesterType,
    subject_registration_start_at: ::time::OffsetDateTime,
    subject_registration_end_at: ::time::OffsetDateTime,
    start_at: ::time::OffsetDateTime,
    end_at: ::time::OffsetDateTime,
    exam_start_at: ::time::OffsetDateTime,
    exam_end_at: ::time::OffsetDateTime,
    created_at: ::time::OffsetDateTime,
    updated_at: ::time::OffsetDateTime,
}

#[allow(dead_code)]
#[sea_query::enum_def]
pub struct Semesters {
    id: ::std::string::String,
    academic_year_id: ::std::string::String,
    start_at: ::time::OffsetDateTime,
    end_at: ::time::OffsetDateTime,
    created_at: ::time::OffsetDateTime,
    updated_at: ::time::OffsetDateTime,
}

#[allow(dead_code)]
#[sea_query::enum_def]
pub struct Students {
    account_id: ::std::string::String,
    major_id: ::std::string::String,
    academic_year_id: ::std::string::String,
    professor_id: ::std::string::String,
    student_id: ::std::string::String,
    student_nid: ::std::string::String,
    previous_gpa: ::rust_decimal::Decimal,
}

#[allow(dead_code)]
#[sea_query::enum_def]
pub struct Subjects {
    id: ::std::string::String,
    name: ::std::string::String,
    description: ::std::string::String,
    created_at: ::time::OffsetDateTime,
    updated_at: ::std::option::Option<::time::OffsetDateTime>,
}

#[allow(dead_code)]
#[sea_query::enum_def]
pub struct TransactionSubjectEnrollments {
    opening_subject_student_enrollment_id: ::std::string::String,
    transaction_id: ::std::string::String,
}

#[allow(dead_code)]
#[sea_query::enum_def]
pub struct Transactions {
    id: ::std::string::String,
    account_id: ::std::string::String,
    payment_method: ::std::string::String,
    price: ::rust_decimal::Decimal,
    payment_status: PaymentStatus,
    transaction_type: ::serde_json::Value,
    created_at: ::time::OffsetDateTime,
    updated_at: ::std::option::Option<::time::OffsetDateTime>,
}
