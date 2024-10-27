use sea_query::Iden;

#[derive(Iden)]
pub enum Transactions {
    Table,
    Id,
    TransactionType,
    TransactionStatus,
    AccountId,
    Price,
    CreatedAt,
    UpdatedAt,
}
