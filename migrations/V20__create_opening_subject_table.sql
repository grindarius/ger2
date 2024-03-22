create table opening_subjects (
    id varchar(32) not null unique,
    subject_id varchar(32) not null,
    semester_id varchar(32) not null,
    subject_capacity int not null,
    grading_criteria jsonb not null,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    primary key (id),
    foreign key (subject_id) references subjects(id),
    foreign key (semester_id) references semesters(id)
);

comment on column opening_subjects.grading_criteria is 'jsonb of Array<{ key: string, score: number }> stores grading information to grade students';
