create table account_sessions (
    id varchar(32) not null unique,
    account_id varchar(32) not null,
    expires timestamptz not null,
    fresh boolean not null,
    primary key (id),
    foreign key (account_id) references accounts(id)
);
