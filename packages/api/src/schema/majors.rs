use sea_query::Iden;

#[derive(Iden)]
pub enum Majors {
    Table,
    Id,
    FacultyId,
    ProgramId,
    DegreeId,
    AcademicYearId,
    Name,
    MinimumGpa,
    Duration,
    MinimumCredit,
    CreatedAt,
    UpdatedAt,
}
