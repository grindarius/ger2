use sea_query::Iden;

#[derive(Iden)]
pub enum Programs {
    Table,
    Id,
    Name,
    CreatedAt,
    UpdatedAt,
}
