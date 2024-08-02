create table opening_subject_student_enrollments (
    id varchar(32) not null unique,
    opening_subject_id varchar(32) not null,
    student_id varchar(32) not null references students(user_id),
    class_comment text not null default '',
    primary key (id),
    foreign key (opening_subject_id) references opening_subjects(id),
    foreign key (student_id) references students(user_id)
);
