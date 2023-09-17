create table assignment (
    id varchar(32) not null unique,
    subject_id varchar(32) not null,
    semester_term_id varchar(32) not null,
    name text not null,
    description text not null default '',
    score numeric(10, 2) not null,
    primary key (id),
    foreign key (subject_id) references subject(id),
    foreign key (semester_term_id) references semester_term(id)
);
