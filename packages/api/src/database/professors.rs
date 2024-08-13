use sea_query::Iden;

#[derive(Iden)]
pub enum Professors {
    Table,
    AccountId,
    Rank,
    CreatedAt,
    UpdatedAt,
}
