use sea_query::Iden;

#[derive(Iden)]
pub enum OpeningSubjectAdditionalStudents {
    Table,
    Id,
    OpeningSubjectId,
    StudentId,
}
