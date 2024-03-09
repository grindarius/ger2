create table account_names (
    id varchar(32) not null unique,
    account_id varchar(32) not null,
    name_language varchar(2) not null,
    first_name text not null,
    middle_name text not null default '',
    last_name text not null default '',
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    primary key (id),
    foreign key (account_id) references accounts(id)
);

comment on column account_names.name_language is 'ISO 639-1 alpha-2 language code in all lowercase.';
