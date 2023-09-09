create table semester (
    id varchar(32) not null unique,
    academic_year_id varchar(32) not null,
    start_at timestamptz not null default now(),
    end_at timestamptz not null default now(),
    created_at timestamptz not null default now(),
    primary key (id),
    foreign key (academic_year_id) references academic_year(id)
);

create type semester_type as enum (
    'midterm',
    'final'
);

create table semester_exam (
    id varchar(32) not null unique,
    semester_id varchar(32) not null,
    type semester_type not null,
    start_at timestamptz not null default now(),
    end_at timestamptz not null default now(),
    created_at timestamptz not null default now(),
    primary key (id),
    foreign key (semester_id) references semester(id)
);

create table semester_registration (
    id varchar(32) not null unique,
    semester_id varchar(32) not null,
    start_at timestamptz not null default now(),
    end_at timestamptz not null default now(),
    created_at timestamptz not null default now(),
    primary key (id),
    foreign key (semester_id) references semester(id)
);
