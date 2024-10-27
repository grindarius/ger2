use sea_query::Iden;

#[derive(Iden)]
pub enum PostReactions {
    Table,
    AccountId,
    ReactionId,
    PostId,
}
