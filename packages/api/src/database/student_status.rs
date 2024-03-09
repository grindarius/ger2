#[derive(::serde::Serialize, ::serde::Deserialize)]
#[serde(tag = "type")]
#[serde(rename_all = "kebab-case")]
pub enum StudentStatus {
    Studying,
    RestingForTreatment {
        semester_term_id: String,
    },
    Resting {
        semester_term_id: String,
    },
    ForcedToRest {
        semester_term_id: String,
    },
    RetiredByGradesBeingTooLow {
        #[serde(with = "time::serde::iso8601")]
        left_at: ::time::OffsetDateTime,
    },
    RetiredByNotPaying {
        #[serde(with = "time::serde::iso8601")]
        left_at: ::time::OffsetDateTime,
    },
    RetiredByNotSigning {
        #[serde(with = "time::serde::iso8601")]
        left_at: ::time::OffsetDateTime,
    },
    RetiredBySigningButNotPaying {
        #[serde(with = "time::serde::iso8601")]
        left_at: ::time::OffsetDateTime,
    },
    RetiredByRunningOutOfTimeToStudy {
        #[serde(with = "time::serde::iso8601")]
        left_at: ::time::OffsetDateTime,
    },
    RetiredByNotHavingHighEnoughEnglishGrades {
        #[serde(with = "time::serde::iso8601")]
        left_at: ::time::OffsetDateTime,
    },
    Resigned {
        #[serde(with = "time::serde::iso8601")]
        resigned_at: ::time::OffsetDateTime,
    },
    Fired {
        reason: String,
        #[serde(with = "time::serde::iso8601")]
        fired_at: ::time::OffsetDateTime,
    },
    PassedAway {
        #[serde(with = "time::serde::iso8601")]
        passed_away_at: ::time::OffsetDateTime,
    },
    Graduated {
        #[serde(with = "time::serde::iso8601")]
        graduated_at: ::time::OffsetDateTime,
    },
}
