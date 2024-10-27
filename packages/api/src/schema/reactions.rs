use sea_query::Iden;

#[derive(Iden)]
pub enum Reactions {
    Table,
    Id,
    Name,
    Slug,
    Icon,
    Score,
    AccountId,
    CreatedAt,
    UpdatedAt,
}
