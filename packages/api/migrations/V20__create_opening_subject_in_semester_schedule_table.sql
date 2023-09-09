create table opening_subject_in_semester_schedule (
    semester_id varchar(32) not null references semester(id),
    subject_id varchar(32) not null references subject(id),
    room_id varchar(32) not null references room(id),
    day day_of_week not null,
    start_at time not null,
    end_at time not null,
    created_at timestamptz not null default now(),
    primary key (semester_id, subject_id, room_id)
);
