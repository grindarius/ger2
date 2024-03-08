create table faculties (
    id varchar(32) not null unique,
    name text not null,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    primary key (id)
);
