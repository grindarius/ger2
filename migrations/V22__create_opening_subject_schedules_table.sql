create table opening_subject_schedules (
    opening_subject_id varchar(32) not null references opening_subjects(id),
    room_id varchar(32) not null references rooms(id),
    day day_of_week not null,
    start time not null,
    "end" time not null,
    "timezone" varchar(64) not null,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    primary key (opening_subject_id, room_id)
);

comment on column opening_subject_schedules."timezone" is 'Stores timezone of where the event would occur, this value will get converted to other timezone on the frontend';
