use sea_query::Iden;

#[derive(Iden)]
pub enum DisenrolledSubjects {
    Table,
    TransactionId,
    SubjectId,
}
