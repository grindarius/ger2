create table opening_subject_schedules (
    id varchar(32) not null unique,
    opening_subject_id varchar(32) not null,
    room_id varchar(32) not null,
    day day_of_week not null,
    start_at time not null,
    end_at time not null,
    created_at timestamptz not null default now(),
    updated_at timestamptz,
    primary key (id),
    foreign key (opening_subject_id) references opening_subjects(id),
    foreign key (room_id) references rooms(id)
);
