create table account (
    id varchar(32) not null unique,
    username varchar(32) not null unique,
    email varchar(64) not null unique,
    password text not null,
    role user_role not null,
    birthdate date not null,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    primary key (id)
);
