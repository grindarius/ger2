create table curriculums (
    id varchar(32) not null unique,
    faculty_id varchar(32) not null,
    name text not null,
    created_at timestamptz not null default now(),
    updated_at timestamptz,
    primary key (id),
    foreign key (faculty_id) references faculties(id)
);
