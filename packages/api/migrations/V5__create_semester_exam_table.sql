create table semester_exam (
    id varchar(32) not null unique,
    semester_id varchar(32) not null,
    type semester_type not null,
    registration_start_at timestamptz not null default now(),
    registration_end_at timestamptz not null default now(),
    exam_start_at timestamptz not null default now(),
    exam_end_at timestamptz not null default now(),
    created_at timestamptz not null default now(),
    primary key (id),
    foreign key (semester_id) references semester(id)
);
