create table room (
    id varchar(32) not null unique,
    building_id varchar(32) not null,
    name text not null,
    description text not null default '',
    capacity int not null,
    floor int not null default 1,
    primary key (id),
    foreign key (building_id) references building(id)
);
