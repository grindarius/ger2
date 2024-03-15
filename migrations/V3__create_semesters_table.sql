create table semesters (
    id varchar(32) not null unique,
    academic_year_id varchar(32) not null,
    start timestamptz not null,
    "end" timestamptz not null,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    primary key (id),
    foreign key (academic_year_id) references academic_years(id)
);

comment on table semesters is 'Stores information about semesters in one academic year';
comment on column semesters.start is 'Stores the datetime when the first studying day starts';
comment on column semesters."end" is 'Stores the datetime when it''s the last date of studying, you cannot arrange hours for student to study after this.';
