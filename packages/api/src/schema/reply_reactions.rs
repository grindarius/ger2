use sea_query::Iden;

#[derive(Iden)]
pub enum ReplyReactions {
    Table,
    AccountId,
    ReactionId,
    ReplyId,
}
