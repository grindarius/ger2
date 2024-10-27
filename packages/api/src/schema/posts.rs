use sea_query::Iden;

#[derive(Iden)]
pub enum Posts {
    Table,
    Id,
    Name,
    AccountId,
    ForumId,
    Content,
    LastActiveAt,
    Views,
    CreatedAt,
    UpdatedAt,
}
