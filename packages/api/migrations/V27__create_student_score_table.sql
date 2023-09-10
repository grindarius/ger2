create table student_score (
    subject_id varchar(32) not null references subject(id),
    semester_id varchar(32) not null references semester(id),
    student_id varchar(32) not null references student(id),
    assignment_id varchar(32) not null references assignment(id),
    score numeric(10, 2) not null,
    primary key (subject_id, semester_id, student_id, assignment_id)
);
