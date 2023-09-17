create table student_transaction (
    id varchar(32) not null unique,
    semester_term_id varchar(32) not null,
    student_id varchar(32) not null,
    price numeric(8, 2) not null,
    created_at timestamptz not null default now(),
    updated_at timestamptz,
    primary key (id),
    foreign key (semester_term_id) references semester_term(id),
    foreign key (student_id) references student(id)
);
