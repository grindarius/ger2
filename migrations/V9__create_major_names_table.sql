create table major_names (
    id varchar(32) not null unique,
    name varchar(32) not null unique,
    course_name varchar(32) not null,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    primary key (id)
);

comment on table major_names is 'Stores information about how the major names can be, there are just a subset of them so it''s fine.';
