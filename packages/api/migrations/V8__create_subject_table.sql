create type day_of_week as enum (
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday'
);

create table subject (
    id varchar(32) not null unique,
    name text not null,
    description text not null default '',
    credit int not null,
    created_at timestamptz not null default now(),
    primary key (id)
);
