create table opening_subject_in_semester_professor (
    semester_id varchar(32) not null references semester(id),
    subject_id varchar(32) not null references subject(id),
    professor_id varchar(32) not null references professor(id),
    primary key (semester_id, subject_id, professor_id)
);
