use sea_query::Iden;

#[derive(Iden)]
pub enum AcademicYears {
    Table,
    Id,
    Year,
    CreatedAt,
    UpdatedAt,
}
