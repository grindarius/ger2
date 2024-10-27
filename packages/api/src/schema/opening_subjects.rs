use sea_query::Iden;

#[derive(Iden)]
pub enum OpeningSubjects {
    Table,
    Id,
    SubjectId,
    SemesterId,
    GroupIndex,
    SubjectCapacity,
    Status,
    GradingCriteria,
    CreatedAt,
    UpdatedAt,
}
