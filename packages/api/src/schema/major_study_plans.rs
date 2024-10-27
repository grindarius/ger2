use sea_query::Iden;

#[derive(Iden)]
pub enum MajorStudyPlans {
    Table,
    Id,
    MajorId,
    SemesterId,
    AdditionalTitle,
    AdditionalSubjectId,
}
