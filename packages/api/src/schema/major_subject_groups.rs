use sea_query::Iden;

#[derive(Iden)]
pub enum MajorSubjectGroups {
    Table,
    Id,
    MajorId,
    GroupIndex,
    ParentId,
    Name,
    MinimumCredit,
    CreatedAt,
    UpdatedAt,
}
