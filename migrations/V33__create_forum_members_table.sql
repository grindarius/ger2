create table forum_members (
    forum_id varchar(32) not null references forums(id),
    user_id varchar(32) not null references users(id),
    role_id varchar(32) not null references forum_roles(id),
    primary key (forum_id, user_id, role_id)
);
