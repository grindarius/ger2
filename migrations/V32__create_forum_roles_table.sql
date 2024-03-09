create table forum_roles (
    id varchar(32) not null unique,
    name varchar(32) not null unique,
    description text not null,
    primary key (id)
);
