create table professor (
    id varchar(32) not null unique,
    prefix text not null,
    description text not null default '',
    primary key (id),
    foreign key (id) references account(id)
);
