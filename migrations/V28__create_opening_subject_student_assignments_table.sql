create table opening_subject_student_assignments (
    opening_subject_assignment_id varchar(32) not null references opening_subject_assignments(id),
    opening_subject_student_enrollment_id varchar(32) not null references opening_subject_student_enrollments(id),
    score numeric(10, 3) not null,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    primary key (opening_subject_assignment_id, opening_subject_student_enrollment_id)
);
