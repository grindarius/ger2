create table opening_subject_professors (
    opening_subject_id varchar(32) not null references opening_subjects(id),
    professor_id varchar(32) not null references professors(user_id),
    primary key (opening_subject_id, professor_id)
);
