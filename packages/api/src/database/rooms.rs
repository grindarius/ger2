use sea_query::Iden;

#[derive(Iden)]
pub enum Rooms {
    Table,
    Id,
    BuildingId,
    Name,
    Type,
    Capacity,
    Floor,
    CreatedAt,
    UpdatedAt,
}
