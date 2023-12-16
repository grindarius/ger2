create table opening_subject_student_comments (
    id varchar(32) not null unique,
    opening_subject_id varchar(32) not null,
    opening_subject_student_enrollment_id varchar(32) not null,
    comment text not null,
    created_at timestamptz not null default now(),
    updated_at timestamptz,
    primary key (id),
    foreign key (opening_subject_id) references opening_subjects(id),
    foreign key (opening_subject_student_enrollment_id) references opening_subject_student_enrollments(id)
);
