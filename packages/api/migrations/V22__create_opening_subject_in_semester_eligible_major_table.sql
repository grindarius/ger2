create table opening_subject_in_semester_eligible_major (
    semester_term_id varchar(32) not null references semester_term(id),
    subject_id varchar(32) not null references subject(id),
    major_id varchar(32) not null references major(id),
    academic_year_id varchar(32) not null references academic_year(id),
    primary key (semester_term_id, subject_id, major_id, academic_year_id)
);
