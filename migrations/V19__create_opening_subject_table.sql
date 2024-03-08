create table opening_subjects (
    id varchar(32) not null unique,
    semester_term_id varchar(32) not null,
    subject_id varchar(32) not null,
    subject_capacity int not null,
    grading_criteria jsonb not null,
    credit int not null,
    primary key (id),
    foreign key (semester_term_id) references semester_terms(id),
    foreign key (subject_id) references subjects(id)
);

comment on column opening_subjects.grading_criteria is 'jsonb of Array<{ key: string, score: number }> stores grading information to grade students';
