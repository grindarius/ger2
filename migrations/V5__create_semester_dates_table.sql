create table semester_dates (
    semester_date_name_id varchar(32) not null references semester_date_names(id),
    semester_id varchar(32) not null references semesters(id),
    start timestamptz not null,
    "end" timestamptz not null,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    primary key (semester_date_name_id, semester_id)
);

comment on table semester_dates is 'Stores information about dates that maybe some semesters are needed but not all of them';
