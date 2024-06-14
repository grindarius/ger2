create table majors (
    id varchar(32) not null unique,
    major_name_id varchar(32) not null,
    curriculum_id varchar(32) not null,
    faculty_id varchar(32) not null,
    academic_year_id varchar(32) not null,
    name text not null,
    minimum_gpa numeric(3, 2) not null,
    year_amount smallint not null,
    minimum_credit int not null,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    primary key (id),
    foreign key (curriculum_id) references curriculums(id),
    foreign key (major_name_id) references major_names(id),
    foreign key (faculty_id) references faculties(id),
    foreign key (academic_year_id) references academic_years(id)
);

alter table majors add constraint majors_major_name_id_curriculum_id_faculty_id_academic_year_id_unique_constraint unique (major_name_id, curriculum_id, faculty_id, academic_year_id);

comment on table majors is 'Stores information about a major like ''Computer Science''. Also stores information about the minimum GPA needed to finish, how many years to study for and how many credits to take.';
comment on column majors.minimum_gpa is 'The minimum grade that a student is required to surpass the class, They will be forced to take a drop when their grade is not higher than this value.';
comment on column majors.academic_year_id is 'The year that the major starts effecting. The year shown in the curriculum means that student that comes in that year will make use of the major content and subjects.';
comment on column majors.minimum_credit is 'The minimum credit from subjects that you need to study to success in the major.';
