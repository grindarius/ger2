create table major_subject_groups (
    id varchar(32) not null unique,
    major_id varchar(32) not null,
    group_index int not null,
    parent_id varchar(32),
    name text not null,
    minimum_credit numeric(4, 1),
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    primary key (id),
    foreign key (major_id) references majors(id)
);

create index on major_subject_groups using btree (parent_id);

comment on table major_subject_groups is 'Stores hierarchical data about the group of each subjects and the minimum credit of each group';
comment on column major_subject_groups.minimum_credit is 'Minimum credit that the student must take from this category of subjects along the study period';
comment on column major_subject_groups.group_index is 'Index of the group that the subject is in. Used to order the subject group in bulletin format.';
