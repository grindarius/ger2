use sea_query::Iden;

#[derive(Iden)]
pub enum CalendarEventTypes {
    Table,
    Id,
    Name,
    Slug,
    CreatedAt,
    UpdatedAt,
}
