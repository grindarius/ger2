create table semesters (
    id varchar(32) not null unique,
    academic_year_id varchar(32) not null,
    start_at timestamptz not null default now(),
    end_at timestamptz not null default now(),
    created_at timestamptz not null default now(),
    updated_at timestamptz,
    primary key (id),
    foreign key (academic_year_id) references academic_years(id)
);

comment on table semesters is 'Stores information about semesters in one academic year';
