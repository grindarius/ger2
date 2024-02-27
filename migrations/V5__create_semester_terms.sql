create table semester_terms (
    id varchar(32) not null unique,
    semester_id varchar(32) not null,
    exam_type semester_type not null,
    subject_registration_start_at timestamptz not null,
    subject_registration_end_at timestamptz not null,
    start_at timestamptz not null,
    end_at timestamptz not null,
    exam_start_at timestamptz not null,
    exam_end_at timestamptz not null,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    primary key (id),
    foreign key (semester_id) references semesters(id)
);