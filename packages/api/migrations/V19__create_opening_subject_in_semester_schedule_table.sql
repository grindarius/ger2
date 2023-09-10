create table opening_subject_in_semester_schedule (
    semester_exam_id varchar(32) not null references semester_exam(id),
    subject_id varchar(32) not null references subject(id),
    room_id varchar(32) not null references room(id),
    day day_of_week not null,
    start_at time not null,
    end_at time not null,
    created_at timestamptz not null default now(),
    primary key (semester_exam_id, subject_id, room_id)
);

comment on table opening_subject_in_semester_schedule is 'Showing which schedule the subject will be taken in the week and next semester section';
