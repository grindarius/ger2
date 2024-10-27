use sea_query::Iden;

#[derive(Iden)]
pub enum StudentAssignments {
    Table,
    AssignmentId,
    StudentId,
    Score,
    CreatedAt,
    UpdatedAt,
}
