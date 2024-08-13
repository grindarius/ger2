use sea_query::Iden;

#[derive(Iden)]
pub enum MajorStudyPlans {
    Table,
    MajorId,
    SemesterId,
    Description,
    SubjectId,
}
