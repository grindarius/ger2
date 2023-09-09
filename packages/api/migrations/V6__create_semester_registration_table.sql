create table semester_registration (
    id varchar(32) not null unique,
    semester_id varchar(32) not null,
    start_at timestamptz not null default now(),
    end_at timestamptz not null default now(),
    created_at timestamptz not null default now(),
    primary key (id),
    foreign key (semester_id) references semester(id)
);
