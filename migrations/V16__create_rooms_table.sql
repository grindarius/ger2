create table rooms (
    id varchar(32) not null unique,
    building_id varchar(32) not null,
    name text not null,
    room_type room_type not null,
    capacity int not null,
    floor int not null default 1,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    primary key (id),
    foreign key (building_id) references buildings(id)
);
