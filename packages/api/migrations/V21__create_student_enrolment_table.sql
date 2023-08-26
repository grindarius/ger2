create table student_enrollment (
    semester_id varchar(32) not null references semester(id),
    subject_id varchar(32) not null references subject(id),
    student_id varchar(32) not null references student(id),
    primary key (semester_id, subject_id, student_id)
);
