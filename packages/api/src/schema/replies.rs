use sea_query::Iden;

#[derive(Iden)]
pub enum Replies {
    Table,
    Id,
    PostId,
    ParentId,
    AccountId,
    Content,
    CreatedAt,
    UpdatedAt,
}
