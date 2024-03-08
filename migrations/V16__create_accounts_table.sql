create table accounts (
    id varchar(32) not null unique,
    username varchar(32) not null unique,
    email varchar(64) not null unique,
    password text not null,
    role role not null,
    birthdate date not null,
    created_at timestamptz not null default now(),
    updated_at timestamptz,
    primary key (id)
);
