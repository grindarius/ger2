create table opening_subject_student_enrollments (
    opening_subject_id varchar(32) not null references opening_subjects(id),
    student_id varchar(32) not null references students(user_id),
    class_comment text not null default '',
    primary key (opening_subject_id, student_id),
);
