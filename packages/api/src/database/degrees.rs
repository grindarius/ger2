use sea_query::Iden;

#[derive(Iden)]
pub enum Degrees {
    Table,
    Id,
    Name,
    CreatedAt,
    UpdatedAt,
}
