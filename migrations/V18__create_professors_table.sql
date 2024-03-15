create table professors (
    user_id varchar(32) not null unique,
    description text not null default '',
    primary key (user_id),
    foreign key (user_id) references users(id)
);
