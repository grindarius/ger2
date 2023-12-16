create table semester_terms (
    id varchar(32) not null unique,
    semester_id varchar(32) not null,
    exam_type semester_type not null,
    subject_registration_start_at timestamptz not null default now(),
    subject_registration_end_at timestamptz not null default now(),
    start_at timestamptz not null default now(),
    end_at timestamptz not null default now(),
    exam_start_at timestamptz not null default now(),
    exam_end_at timestamptz not null default now(),
    created_at timestamptz not null default now(),
    updated_at timestamptz,
    primary key (id),
    foreign key (semester_id) references semesters(id)
);
