create table opening_subject_additional_eligible_students (
    opening_subject_id varchar(32) not null references opening_subjects(id),
    student_id varchar(32) not null references students(user_id),
    primary key (opening_subject_id, student_id)
);
