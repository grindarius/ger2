use sea_query::Iden;

#[derive(Iden)]
pub enum Subjects {
    Table,
    Id,
    SubjectId,
    Name,
    Description,
    Credit,
    CreatedAt,
    UpdatedAt,
}
