create table professors (
    account_id varchar(32) not null unique,
    description text not null default '',
    primary key (account_id),
    foreign key (account_id) references accounts(id)
);
