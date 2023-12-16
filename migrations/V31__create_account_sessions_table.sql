create table account_sessions (
    id varchar(32) not null unique,
    account_id varchar(32) not null,
    active_expires timestamptz not null,
    idle_expires timestamptz not null,
    primary key (id),
    foreign key (account_id) references accounts(id)
);
