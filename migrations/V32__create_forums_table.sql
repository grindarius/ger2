create table forums (
    id varchar(32) not null unique,
    name varchar(255) not null unique,
    slug varchar(255) not null unique,
    description text not null,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    primary key (id)
);
