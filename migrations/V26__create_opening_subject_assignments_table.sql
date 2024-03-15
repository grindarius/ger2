create table opening_subject_assignments (
    id varchar(32) not null unique,
    opening_subject_id varchar(32) not null,
    professor_id varchar(32) not null,
    name varchar(255) not null,
    full_score numeric(10, 3) not null,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    primary key (id),
    foreign key (opening_subject_id) references opening_subjects(id),
    foreign key (professor_id) references professors(user_id)
);
