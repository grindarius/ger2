create table faculty (
    id varchar(32) not null unique,
    name text not null,
    created_at timestamptz not null,
    primary key (id)
);
