create table user_sessions (
    id varchar(32) not null unique,
    user_id varchar(32) not null,
    expires timestamptz not null,
    fresh boolean not null,
    primary key (id),
    foreign key (user_id) references users(id)
);
