create table student (
    id varchar(32) not null,
    major_id varchar(32) not null,
    academic_year_id varchar(32) not null,
    professor_id varchar(32) not null,
    student_id int not null,
    student_nid text not null,
    previous_gpa numeric(3, 2) not null,
    primary key (id),
    foreign key (id) references account(id),
    foreign key (major_id) references major(id),
    foreign key (academic_year_id) references academic_year(id),
    foreign key (professor_id) references professor(id)
);

comment on column student.student_id is 'An N digit number (smaller than i32::max in rust) with meaning specified to each section/digit of the number as student''s ID.';
comment on column student.academic_year_id is 'First academic year that the student have joined the university.';
