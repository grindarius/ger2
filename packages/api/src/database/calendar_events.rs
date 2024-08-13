use sea_query::Iden;

#[derive(Iden)]
pub enum CalendarEvents {
    Table,
    CalendarEventTypeId,
    SemesterId,
    Start,
    End,
    Timezone,
    CreatedAt,
    UpdatedAt,
}
