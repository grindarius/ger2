use sea_query::Iden;

#[derive(Iden)]
pub enum OpeningSubjectProfessors {
    Table,
    Id,
    OpeningSubjectId,
    ProfessorId,
}
