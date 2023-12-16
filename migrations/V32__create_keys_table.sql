create table keys (
    id varchar(32) not null unique,
    account_id varchar(32) not null,
    hashed_password varchar(256),
    primary key (id),
    foreign key (account_id) references accounts(id)
);
