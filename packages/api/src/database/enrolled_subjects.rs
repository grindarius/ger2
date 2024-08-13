use sea_query::Iden;

#[derive(Iden)]
pub enum EnrolledSubjects {
    Table,
    Id,
    TransactionId,
    OpeningSubjectId,
}
