create table forum_members (
    forum_id varchar(32) not null references forums(id),
    account_id varchar(32) not null references accounts(id),
    role_id varchar(32) not null references forum_roles(id),
    primary key (forum_id, account_id, role_id)
);
