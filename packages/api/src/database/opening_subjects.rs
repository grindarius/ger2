use sea_query::Iden;

#[derive(Iden)]
pub enum OpeningSubjects {
    Table,
    Id,
    SubjectId,
    SemesterId,
    SubjectCapacity,
    Status,
    GroupIndex,
    GradingCriteria,
    CreatedAt,
    UpdatedAt,
}
