create table transaction_subject_enrollments (
    opening_subject_student_enrollment_id varchar(32) not null unique,
    transaction_id varchar(32) not null,
    primary key (opening_subject_student_enrollment_id),
    foreign key (transaction_id) references transactions(id) on delete cascade,
    constraint fk_opening_subject_student_enrollment_id foreign key (opening_subject_student_enrollment_id) references opening_subject_student_enrollments(id)
);
