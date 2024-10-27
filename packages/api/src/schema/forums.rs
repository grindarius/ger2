use sea_query::Iden;

#[derive(Iden)]
pub enum Forums {
    Table,
    Id,
    Name,
    Slug,
    Content,
    AccountId,
    Color,
    CreatedAt,
    UpdatedAt,
}
