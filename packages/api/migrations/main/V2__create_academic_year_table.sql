create table academic_year (
    id varchar(32) not null unique,
    year int not null unique default cast(date_part('year', now()) as int),
    start_at timestamptz not null default now(),
    end_at timestamptz not null default now(),
    created_at timestamptz not null default now(),
    primary key (id)
);
