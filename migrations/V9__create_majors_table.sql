create table majors (
    id varchar(32) not null unique,
    curriculum_id varchar(32) not null,
    academic_year_id varchar(32) not null,
    name text not null,
    minimum_gpa numeric(3, 2) not null,
    year_amount smallint not null,
    minimum_credit int not null,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    primary key (id),
    foreign key (curriculum_id) references curriculums(id)
);

comment on table majors is 'Stores data about the major. A major can have same name but different academic year because of program change of some sort.';
comment on column majors.minimum_gpa is 'The minimum grade that a student is required to surpass the class, They will be forced to take a drop when their grade is not higher than this value.';
comment on column majors.academic_year_id is 'The year that the major starts effecting. The year shown in the curriculum means that student that comes in that year will make use of the major content and subjects.';
