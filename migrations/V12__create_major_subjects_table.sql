create table major_subjects (
    major_subject_group_id varchar(32) not null references major_subject_groups(id),
    subject_id varchar(32) not null references subjects(id),
    credit int not null,
    primary key (major_subject_group_id, subject_id)
);

comment on table major_subjects is 'Stores subjects related to its category and major. The major subject group id will likely be the leaf id of the major_subject_group table.';
