use sea_query::Iden;

#[derive(Iden)]
pub enum Faculties {
    Table,
    Id,
    Name,
    CreatedAt,
    UpdatedAt,
}
