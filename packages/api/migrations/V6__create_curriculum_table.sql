create table curriculum (
    id varchar(32) not null unique,
    faculty_id varchar(32) not null,
    name text not null,
    created_at timestamptz not null default now(),
    primary key (id),
    foreign key (faculty_id) references faculty(id)
);
