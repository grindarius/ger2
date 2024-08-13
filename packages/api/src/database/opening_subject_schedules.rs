use sea_query::Iden;

#[derive(Iden)]
pub enum OpeningSubjectSchedules {
    Table,
    Id,
    OpeningSubjectId,
    RoomId,
    Day,
    Start,
    End,
    Timezone,
    CreatedAt,
    UpdatedAt,
}
