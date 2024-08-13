use sea_query::Iden;

#[derive(Iden)]
pub enum OpeningSubjectEligibleMajors {
    Table,
    Id,
    OpeningSubjectId,
    MajorId,
    AcademicYearId,
}
