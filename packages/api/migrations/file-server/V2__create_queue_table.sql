create table queue (
    id varchar(32) not null unique,
    created_at timestamptz not null,
    updated_at timestamptz,
    failed_attempts int not null,
    status job_status not null,
    file_path text not null,
    primary key (id)
);

comment on table queue is 'Stores information about image processing queue, anything that would go into the queue will only be image files.';
