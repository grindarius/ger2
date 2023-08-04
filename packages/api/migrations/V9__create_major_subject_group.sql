create table major_subject_group (
    id varchar(32) not null unique,
    major_id varchar(32) not null,
    parent_id varchar(32),
    name text not null,
    minimum_credit smallint,
    primary key (id),
    foreign key (major_id) references major(id)
);

comment on table major_subject_group is 'Stores hierarchical data about the group of each subjects and the minimum credit of each group';
comment on column major_subject_group.minimum_credit is 'Minimum credit that the student must take from this category of subjects along the four years';
