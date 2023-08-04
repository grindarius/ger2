create table opening_subject_in_semester_description (
    semester_id varchar(32) not null references semester(id),
    subject_id varchar(32) not null references subject(id),
    subject_capacity int not null,
    is_grade_released boolean not null default false,
    grading_criteria jsonb not null,
    primary key (semester_id, subject_id)
);

comment on column opening_subject_in_semester_description.grading_criteria is 'How this subject should be graded, The schema in Rust is HashMap<String, i32> specifying the minimum score for each grading character.'
