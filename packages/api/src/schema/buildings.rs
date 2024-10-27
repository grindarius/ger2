use sea_query::Iden;

#[derive(Iden)]
pub enum Buildings {
    Table,
    Id,
    Name,
    Coordinates,
    Floors,
    BuildingCreatedAt,
    CreatedAt,
    UpdatedAt,
}
