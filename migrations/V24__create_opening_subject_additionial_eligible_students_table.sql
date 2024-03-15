create table opening_subject_additional_eligible_students (
    id varchar(32) not null unique,
    opening_subject_id varchar(32) not null,
    student_id varchar(32) not null,
    primary key (id),
    foreign key (opening_subject_id) references opening_subjects(id),
    foreign key (student_id) references students(user_id)
);
