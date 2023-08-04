create table building (
    id varchar(32) not null unique,
    name text not null,
    description text not null default '',
    coordinates point not null,
    created_at timestamptz not null default now(),
    building_created_at timestamptz not null,
    primary key (id)
);
