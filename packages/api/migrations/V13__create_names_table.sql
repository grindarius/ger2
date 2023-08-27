create table name (
    id varchar(32) not null unique,
    user_id varchar(32) not null,
    name_language varchar(2) not null,
    first_name text not null,
    middle_name text not null,
    last_name text not null,
    primary key (id),
    foreign key (user_id) references account(id)
);

comment on column name.name_language is 'ISO 639-1 alpha-2 language code in all lowercase.';
