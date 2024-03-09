create table students (
    account_id varchar(32) not null,
    major_id varchar(32) not null,
    academic_year_id varchar(32) not null,
    professor_id varchar(32) not null,
    student_id text not null,
    student_behavior_score int not null,
    student_status jsonb not null,
    previous_gpa numeric(3, 2) not null,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    primary key (account_id),
    foreign key (account_id) references accounts(id),
    foreign key (major_id) references majors(id),
    foreign key (academic_year_id) references academic_years(id),
    foreign key (professor_id) references professors(account_id)
);

comment on column students.student_id is 'An N digit number (smaller than i32::max in rust) with meaning specified to each section/digit of the number as student''s ID.';
comment on column students.academic_year_id is 'First academic year that the student have joined the university.';
