create table forum_post_comments (
    id varchar(32) not null unique,
    forum_post_id varchar(32) not null,
    forum_member_id varchar(32) not null,
    content text not null,
    created_at timestamptz not null default now(),
    updated_at timestamptz,
    primary key (id),
    foreign key (forum_post_id) references forum_posts(id),
    foreign key (forum_member_id) references accounts(id)
);
