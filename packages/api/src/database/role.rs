use sea_query::Iden;

#[derive(Iden)]
pub enum Role {
    Type,
    Professor,
    Admin,
    Student,
}
