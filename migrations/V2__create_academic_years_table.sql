create table academic_years (
    id varchar(32) not null unique,
    year int not null unique default cast(date_part('year', now()) as int),
    start_at timestamptz not null,
    end_at timestamptz not null,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    primary key (id)
);

comment on table academic_years is 'Stores information about academic year of the school/uni';
