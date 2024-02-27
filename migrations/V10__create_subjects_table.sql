create table subjects (
    id varchar(32) not null unique,
    name text not null,
    description text not null default '',
    created_at timestamptz not null default now(),
    updated_at timestamptz,
    primary key (id)
);
