create table opening_subject_in_semester_professor (
    semester_exam_id varchar(32) not null references semester_exam(id),
    subject_id varchar(32) not null references subject(id),
    professor_id varchar(32) not null references professor(id),
    primary key (semester_exam_id, subject_id, professor_id)
);
