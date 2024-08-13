use sea_query::Iden;

#[derive(Iden)]
pub enum Semesters {
    Table,
    Id,
    AcademicYearId,
    Start,
    End,
    SemesterIndex,
    CreatedAt,
    UpdatedAt,
}
