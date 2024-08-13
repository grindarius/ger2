DO $$ BEGIN
 CREATE TYPE "public"."day_of_week" AS ENUM('sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."opening_subject_status" AS ENUM('open', 'open-only-for-disenrollment', 'closed');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."role" AS ENUM('professor', 'admin', 'student');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."room_type" AS ENUM('study', 'lab', 'conference', 'other');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."transaction_status" AS ENUM('pending', 'completed', 'failed');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."transaction_type" AS ENUM('enroll-subject', 'move-subject');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "academic_years" (
	"id" varchar(26) PRIMARY KEY NOT NULL,
	"year" integer DEFAULT cast(date_part('year', now()) as int) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "academic_years_year_unique" UNIQUE("year")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "account_names" (
	"id" varchar(26) PRIMARY KEY NOT NULL,
	"account_id" varchar(26) NOT NULL,
	"name_language" varchar(2) NOT NULL,
	"first_name" text NOT NULL,
	"middle_name" text NOT NULL,
	"last_name" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "accounts" (
	"id" varchar(26) PRIMARY KEY NOT NULL,
	"username" varchar(30) NOT NULL,
	"email" varchar(320) NOT NULL,
	"password" varchar(256) NOT NULL,
	"role" "role" NOT NULL,
	"birthdate" date NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "accounts_username_unique" UNIQUE("username"),
	CONSTRAINT "accounts_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "asssignments" (
	"id" varchar(26) PRIMARY KEY NOT NULL,
	"opening_subject_id" varchar(26) NOT NULL,
	"opening_subject_professor_id" varchar(26) NOT NULL,
	"name" varchar(256) NOT NULL,
	"full_score" numeric(6, 3) NOT NULL,
	"percentage" numeric(5, 2) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "buildings" (
	"id" varchar(26) PRIMARY KEY NOT NULL,
	"name" varchar(512) NOT NULL,
	"coordinates" "point" NOT NULL,
	"floors" integer NOT NULL,
	"building_created_at" timestamp with time zone NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "buildings_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "calendar_event_types" (
	"id" varchar(26) PRIMARY KEY NOT NULL,
	"name" varchar(512) NOT NULL,
	"slug" varchar(30) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "calendar_events" (
	"calendar_event_type_id" varchar(26) NOT NULL,
	"semester_id" varchar(26) NOT NULL,
	"start" timestamp with time zone NOT NULL,
	"end" timestamp with time zone NOT NULL,
	"timezone" varchar(128) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "calendar_events_calendar_event_type_id_semester_id_pk" PRIMARY KEY("calendar_event_type_id","semester_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "degrees" (
	"id" varchar(26) PRIMARY KEY NOT NULL,
	"name" varchar(512) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "degrees_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "disenrolled_subjects" (
	"transaction_id" varchar(26) PRIMARY KEY NOT NULL,
	"subject_id" varchar(26) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "enrolled_subjects" (
	"id" varchar(26) PRIMARY KEY NOT NULL,
	"transactionId" varchar(26) NOT NULL,
	"opening_subject_id" varchar(26) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "faculties" (
	"id" varchar(26) PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "faculties_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "major_study_plans" (
	"id" varchar(26) PRIMARY KEY NOT NULL,
	"major_id" varchar(26) NOT NULL,
	"semester_id" varchar(26) NOT NULL,
	"additional_title" varchar(256),
	"additional_subject_id" varchar(32)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "major_subject_groups" (
	"id" varchar(26) PRIMARY KEY NOT NULL,
	"major_id" varchar(26) NOT NULL,
	"group_index" integer NOT NULL,
	"parent_id" varchar(26),
	"name" text NOT NULL,
	"minimum_credit" numeric(4, 1) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "major_subjects" (
	"major_subject_group_id" varchar(26) NOT NULL,
	"subject_id" varchar(26) NOT NULL,
	CONSTRAINT "major_subjects_subject_id_major_subject_group_id_pk" PRIMARY KEY("subject_id","major_subject_group_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "majors" (
	"id" varchar(26) PRIMARY KEY NOT NULL,
	"faculty_id" varchar(26) NOT NULL,
	"program_id" varchar(26) NOT NULL,
	"degree_id" varchar(26) NOT NULL,
	"academic_year_id" varchar(26) NOT NULL,
	"name" varchar(512) NOT NULL,
	"minimum_gpa" numeric(3, 2) NOT NULL,
	"duration" interval year NOT NULL,
	"minimum_credit" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "opening_subject_additional_students" (
	"id" varchar(26) PRIMARY KEY NOT NULL,
	"opening_subject_id" varchar(26) NOT NULL,
	"student_id" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "opening_subject_eligible_majors" (
	"id" varchar(26) PRIMARY KEY NOT NULL,
	"opening_subject_id" varchar(26) NOT NULL,
	"major_id" varchar(26) NOT NULL,
	"academic_year_id" varchar(26) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "opening_subject_professors" (
	"id" varchar(26) PRIMARY KEY NOT NULL,
	"opening_subject_id" varchar(26) NOT NULL,
	"professor_id" varchar(26) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "opening_subject_schedules" (
	"id" varchar(26) PRIMARY KEY NOT NULL,
	"opening_subject_id" varchar(26) NOT NULL,
	"room_id" varchar(26) NOT NULL,
	"day" "day_of_week" NOT NULL,
	"start" time NOT NULL,
	"end" time NOT NULL,
	"timezone" varchar(128) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "opening_subjects" (
	"id" varchar(26) PRIMARY KEY NOT NULL,
	"subject_id" varchar(26) NOT NULL,
	"semester_id" varchar(26) NOT NULL,
	"subject_capicity" integer NOT NULL,
	"status" "opening_subject_status" NOT NULL,
	"group_index" integer DEFAULT 1 NOT NULL,
	"grading_criteria" jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "professors" (
	"account_id" varchar(26) PRIMARY KEY NOT NULL,
	"rank" varchar(128) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "programs" (
	"id" varchar(26) PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "programs_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "rooms" (
	"id" varchar(26) PRIMARY KEY NOT NULL,
	"building_id" varchar(26) NOT NULL,
	"name" varchar(512) NOT NULL,
	"room_type" "room_type" NOT NULL,
	"capacity" integer NOT NULL,
	"floor" integer DEFAULT 1 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "semesters" (
	"id" varchar(26) PRIMARY KEY NOT NULL,
	"academic_year_id" varchar(26) NOT NULL,
	"start" timestamp with time zone NOT NULL,
	"end" timestamp with time zone NOT NULL,
	"semester_index" integer DEFAULT 1 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "student_assignments" (
	"assignment_id" varchar(26) NOT NULL,
	"student_id" varchar(26) NOT NULL,
	"score" numeric(6, 3) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "student_assignments_assignment_id_student_id_pk" PRIMARY KEY("assignment_id","student_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "students" (
	"account_id" varchar(26) PRIMARY KEY NOT NULL,
	"major_id" varchar(26) NOT NULL,
	"academic_year_id" varchar(26) NOT NULL,
	"professor_id" varchar(26) NOT NULL,
	"student_id" varchar(32) NOT NULL,
	"behavioral_score" integer DEFAULT 100 NOT NULL,
	"status" jsonb NOT NULL,
	"previous_gpa" numeric(3, 2) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "students_student_id_unique" UNIQUE("student_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "subjects" (
	"id" varchar(26) PRIMARY KEY NOT NULL,
	"subject_id" varchar(32) NOT NULL,
	"name" varchar(512) NOT NULL,
	"description" text NOT NULL,
	"credit" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "subjects_subject_id_unique" UNIQUE("subject_id"),
	CONSTRAINT "subjects_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "transactions" (
	"id" varchar(26) PRIMARY KEY NOT NULL,
	"transaction_type" "transaction_type" NOT NULL,
	"transaction_status" "transaction_status" NOT NULL,
	"account_id" varchar(26) NOT NULL,
	"price" numeric(12, 2) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "account_names" ADD CONSTRAINT "account_names_account_id_accounts_id_fk" FOREIGN KEY ("account_id") REFERENCES "public"."accounts"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "asssignments" ADD CONSTRAINT "asssignments_opening_subject_id_opening_subjects_id_fk" FOREIGN KEY ("opening_subject_id") REFERENCES "public"."opening_subjects"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "asssignments" ADD CONSTRAINT "asssignments_opening_subject_professor_id_opening_subject_professors_id_fk" FOREIGN KEY ("opening_subject_professor_id") REFERENCES "public"."opening_subject_professors"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "calendar_events" ADD CONSTRAINT "calendar_events_calendar_event_type_id_calendar_event_types_id_fk" FOREIGN KEY ("calendar_event_type_id") REFERENCES "public"."calendar_event_types"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "calendar_events" ADD CONSTRAINT "calendar_events_semester_id_semesters_id_fk" FOREIGN KEY ("semester_id") REFERENCES "public"."semesters"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "disenrolled_subjects" ADD CONSTRAINT "disenrolled_subjects_transaction_id_transactions_id_fk" FOREIGN KEY ("transaction_id") REFERENCES "public"."transactions"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "disenrolled_subjects" ADD CONSTRAINT "disenrolled_subjects_subject_id_opening_subjects_id_fk" FOREIGN KEY ("subject_id") REFERENCES "public"."opening_subjects"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "enrolled_subjects" ADD CONSTRAINT "enrolled_subjects_transactionId_transactions_id_fk" FOREIGN KEY ("transactionId") REFERENCES "public"."transactions"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "major_study_plans" ADD CONSTRAINT "major_study_plans_major_id_majors_id_fk" FOREIGN KEY ("major_id") REFERENCES "public"."majors"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "major_study_plans" ADD CONSTRAINT "major_study_plans_semester_id_semesters_id_fk" FOREIGN KEY ("semester_id") REFERENCES "public"."semesters"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "major_subject_groups" ADD CONSTRAINT "major_subject_groups_major_id_majors_id_fk" FOREIGN KEY ("major_id") REFERENCES "public"."majors"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "major_subjects" ADD CONSTRAINT "major_subjects_major_subject_group_id_major_subject_groups_id_fk" FOREIGN KEY ("major_subject_group_id") REFERENCES "public"."major_subject_groups"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "major_subjects" ADD CONSTRAINT "major_subjects_subject_id_subjects_id_fk" FOREIGN KEY ("subject_id") REFERENCES "public"."subjects"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "majors" ADD CONSTRAINT "majors_faculty_id_faculties_id_fk" FOREIGN KEY ("faculty_id") REFERENCES "public"."faculties"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "majors" ADD CONSTRAINT "majors_program_id_programs_id_fk" FOREIGN KEY ("program_id") REFERENCES "public"."programs"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "majors" ADD CONSTRAINT "majors_degree_id_degrees_id_fk" FOREIGN KEY ("degree_id") REFERENCES "public"."degrees"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "majors" ADD CONSTRAINT "majors_academic_year_id_academic_years_id_fk" FOREIGN KEY ("academic_year_id") REFERENCES "public"."academic_years"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "opening_subject_additional_students" ADD CONSTRAINT "opening_subject_additional_students_opening_subject_id_opening_subjects_id_fk" FOREIGN KEY ("opening_subject_id") REFERENCES "public"."opening_subjects"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "opening_subject_eligible_majors" ADD CONSTRAINT "opening_subject_eligible_majors_opening_subject_id_opening_subjects_id_fk" FOREIGN KEY ("opening_subject_id") REFERENCES "public"."opening_subjects"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "opening_subject_eligible_majors" ADD CONSTRAINT "opening_subject_eligible_majors_major_id_majors_id_fk" FOREIGN KEY ("major_id") REFERENCES "public"."majors"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "opening_subject_eligible_majors" ADD CONSTRAINT "opening_subject_eligible_majors_academic_year_id_academic_years_id_fk" FOREIGN KEY ("academic_year_id") REFERENCES "public"."academic_years"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "opening_subject_professors" ADD CONSTRAINT "opening_subject_professors_opening_subject_id_opening_subjects_id_fk" FOREIGN KEY ("opening_subject_id") REFERENCES "public"."opening_subjects"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "opening_subject_professors" ADD CONSTRAINT "opening_subject_professors_professor_id_professors_account_id_fk" FOREIGN KEY ("professor_id") REFERENCES "public"."professors"("account_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "opening_subject_schedules" ADD CONSTRAINT "opening_subject_schedules_opening_subject_id_opening_subjects_id_fk" FOREIGN KEY ("opening_subject_id") REFERENCES "public"."opening_subjects"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "opening_subject_schedules" ADD CONSTRAINT "opening_subject_schedules_room_id_rooms_id_fk" FOREIGN KEY ("room_id") REFERENCES "public"."rooms"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "opening_subjects" ADD CONSTRAINT "opening_subjects_subject_id_subjects_id_fk" FOREIGN KEY ("subject_id") REFERENCES "public"."subjects"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "opening_subjects" ADD CONSTRAINT "opening_subjects_semester_id_semesters_id_fk" FOREIGN KEY ("semester_id") REFERENCES "public"."semesters"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "professors" ADD CONSTRAINT "professors_account_id_accounts_id_fk" FOREIGN KEY ("account_id") REFERENCES "public"."accounts"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "rooms" ADD CONSTRAINT "rooms_building_id_buildings_id_fk" FOREIGN KEY ("building_id") REFERENCES "public"."buildings"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "semesters" ADD CONSTRAINT "semesters_academic_year_id_academic_years_id_fk" FOREIGN KEY ("academic_year_id") REFERENCES "public"."academic_years"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "student_assignments" ADD CONSTRAINT "student_assignments_assignment_id_asssignments_id_fk" FOREIGN KEY ("assignment_id") REFERENCES "public"."asssignments"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "student_assignments" ADD CONSTRAINT "student_assignments_student_id_students_account_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."students"("account_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "students" ADD CONSTRAINT "students_account_id_accounts_id_fk" FOREIGN KEY ("account_id") REFERENCES "public"."accounts"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "students" ADD CONSTRAINT "students_major_id_majors_id_fk" FOREIGN KEY ("major_id") REFERENCES "public"."majors"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "students" ADD CONSTRAINT "students_academic_year_id_academic_years_id_fk" FOREIGN KEY ("academic_year_id") REFERENCES "public"."academic_years"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "students" ADD CONSTRAINT "students_professor_id_professors_account_id_fk" FOREIGN KEY ("professor_id") REFERENCES "public"."professors"("account_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "transactions" ADD CONSTRAINT "transactions_account_id_accounts_id_fk" FOREIGN KEY ("account_id") REFERENCES "public"."accounts"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "accounts_email_unique_index" ON "accounts" USING btree (lower("email"));--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "calendar_event_types_name_slug_unique_index" ON "calendar_event_types" USING btree ("name","slug");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "major_subject_groups_parent_id_index" ON "major_subject_groups" USING btree ("parent_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "majors_faculty_id_program_id_degree_id_academic_year_id_index" ON "majors" USING btree ("faculty_id","program_id","degree_id","academic_year_id");