create table semester_date_names (
    id varchar(32) not null unique,
    name varchar(255) not null unique,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    primary key (id)
);

comment on table semester_date_names is 'Stores date names that are needed to be shown across semesters';
