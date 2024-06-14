create table subjects (
    id varchar(32) not null unique,
    name text not null,
    description text not null default '',
    credit int not null,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    primary key (id)
);
