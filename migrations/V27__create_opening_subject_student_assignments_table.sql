create table opening_subject_student_assignments (
    id varchar(32) not null unique,
    opening_subject_student_enrollment_id varchar(32) not null,
    opening_subject_assignment_id varchar(32) not null,
    score numeric(10, 3) not null,
    created_at timestamptz not null default now(),
    updated_at timestamptz,
    primary key (id),
    foreign key (opening_subject_student_enrollment_id) references opening_subject_student_enrollments(id),
    foreign key (opening_subject_assignment_id) references opening_subject_assignments(id)
);
