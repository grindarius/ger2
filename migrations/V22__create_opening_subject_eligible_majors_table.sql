create table opening_subject_eligible_majors (
    id varchar(32) not null unique,
    opening_subject_id varchar(32) not null,
    major_id varchar(32) not null,
    academic_year_id varchar(32) not null,
    primary key (id),
    foreign key (opening_subject_id) references opening_subjects(id),
    foreign key (major_id) references majors(id),
    foreign key (academic_year_id) references academic_years(id)
);
