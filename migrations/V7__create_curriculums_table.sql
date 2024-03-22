create table curriculums (
    id varchar(32) not null unique,
    name text not null,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    primary key (id)
);

comment on table curriculums is 'Stores information about which ''pathway of study a faculty can have. This stores information like ''Bachelor normal degree'' or ''Masters special degree''.';
