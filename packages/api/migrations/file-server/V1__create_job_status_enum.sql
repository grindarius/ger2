create type job_status as enum (
    'queued',
    'running',
    'failed',
    'cancelled'
);
