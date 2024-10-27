use sea_query::Iden;

#[derive(Iden)]
pub enum AccountNames {
    Table,
    Id,
    AccountId,
    NameLanguage,
    FirstName,
    MiddleName,
    LastName,
    CreatedAt,
    UpdatedAt,
}
