use sea_query::Iden;

#[derive(Iden)]
pub enum Assignments {
    Table,
    Id,
    OpeningSubjectId,
    OpeningSubjectProfessorId,
    Name,
    FullScore,
    Percentage,
    CreatedAt,
    UpdatedAt,
}
