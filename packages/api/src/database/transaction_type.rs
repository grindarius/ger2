#[derive(::serde::Serialize, ::serde::Deserialize)]
#[serde(tag = "type")]
#[serde(rename_all = "kebab-case")]
pub enum TransactionType {
    SubjectRegistration {
        opening_subject_ids: Vec<String>,
    },
    DropSubject {
        opening_subject_id: String,
    },
    MoveSubject {
        from_opening_subject_id: String,
        to_opening_subject_id: String,
    },
}
