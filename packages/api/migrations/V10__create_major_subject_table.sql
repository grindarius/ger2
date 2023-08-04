create table major_subject (
    major_subject_group_id varchar(32) not null references major_subject_group(id),
    subject_id varchar(32) not null references subject(id),
    primary key (major_subject_group_id, subject_id)
);

comment on table major_subject is 'Stores subjects related to its category and major.';
