use sea_query::Iden;

#[derive(Iden)]
pub enum Accounts {
    Table,
    Id,
    Username,
    Email,
    Password,
    Role,
    Birthdate,
    CreatedAt,
    UpdatedAt,
}
