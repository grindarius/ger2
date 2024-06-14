create table opening_subject_eligible_majors (
    opening_subject_id varchar(32) not null references opening_subjects(id),
    major_id varchar(32) not null references majors(id),
    academic_year_id varchar(32) not null references academic_years(id),
    primary key (opening_subject_id, major_id, academic_year_id)
);
