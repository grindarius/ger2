create table opening_subjects_professors (
    id varchar(32) not null unique,
    opening_subject_id varchar(32) not null,
    professor_id varchar(32) not null,
    primary key (id),
    foreign key (opening_subject_id) references opening_subjects(id),
    foreign key (professor_id) references professors(user_id)
);
