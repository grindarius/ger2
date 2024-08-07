create table forum_posts (
    id varchar(32) not null unique,
    forum_id varchar(32) not null,
    user_id varchar(32) not null,
    name varchar(255) not null,
    content text not null,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    primary key (id),
    foreign key (forum_id) references forums(id),
    foreign key (user_id) references users(id)
);
