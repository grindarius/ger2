create table major_subject_groups (
    id varchar(32) not null unique,
    major_id varchar(32) not null,
    hierarchy ltree not null,
    name text not null,
    minimum_credit numeric(4, 1),
    created_at timestamptz not null default now(),
    updated_at timestamptz,
    primary key (id),
    foreign key (major_id) references majors(id)
);

comment on table major_subject_groups is 'Stores hierarchical data about the group of each subjects and the minimum credit of each group';
comment on column major_subject_groups.minimum_credit is 'Minimum credit that the student must take from this category of subjects along the four years';
