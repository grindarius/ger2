import type { ColumnType, Insertable, Selectable, Updateable } from 'kysely'

export type DayOfWeek = 'sunday' | 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday'
export type PaymentStatus = 'pending' | 'completed' | 'cancelled'
export type Role = 'admin' | 'professor' | 'student'
export type RoomType = 'lab' | 'lecture' | 'conference' | 'toilet' | 'co-working-spaces' | 'work' | 'other'

export interface AcademicYearsTable {
  id: ColumnType<string, string, never>
  year: ColumnType<number, number | undefined, number | undefined>
  created_at: ColumnType<string, string | undefined, string | undefined>
  updated_at: ColumnType<string, string | undefined, string | undefined>
}

export type AcademicYears = Selectable<AcademicYearsTable>
export type NewAcademicYears = Insertable<AcademicYearsTable>
export type UpdateAcademicYears = Updateable<AcademicYearsTable>

export interface BuildingsTable {
  id: ColumnType<string, string, never>
  name: ColumnType<string, string, string | undefined>
  coordinates: ColumnType<{ x: number, y: number }, string | undefined, string | undefined>
  building_created_at: ColumnType<string, string, string | undefined>
  created_at: ColumnType<string, string | undefined, string | undefined>
  updated_at: ColumnType<string, string | undefined, string | undefined>
}

export type Buildings = Selectable<BuildingsTable>
export type NewBuildings = Insertable<BuildingsTable>
export type UpdateBuildings = Updateable<BuildingsTable>

export interface CurriculumsTable {
  id: ColumnType<string, string, never>
  name: ColumnType<string, string, string | undefined>
  created_at: ColumnType<string, string | undefined, string | undefined>
  updated_at: ColumnType<string, string | undefined, string | undefined>
}

export type Curriculums = Selectable<CurriculumsTable>
export type NewCurriculums = Insertable<CurriculumsTable>
export type UpdateCurriculums = Updateable<CurriculumsTable>

export interface FacultiesTable {
  id: ColumnType<string, string, never>
  name: ColumnType<string, string, string | undefined>
  created_at: ColumnType<string, string | undefined, string | undefined>
  updated_at: ColumnType<string, string | undefined, string | undefined>
}

export type Faculties = Selectable<FacultiesTable>
export type NewFaculties = Insertable<FacultiesTable>
export type UpdateFaculties = Updateable<FacultiesTable>

export interface ForumMembersTable {
  forum_id: ColumnType<string, string, string | undefined>
  user_id: ColumnType<string, string, string | undefined>
  role_id: ColumnType<string, string, string | undefined>
}

export type ForumMembers = Selectable<ForumMembersTable>
export type NewForumMembers = Insertable<ForumMembersTable>
export type UpdateForumMembers = Updateable<ForumMembersTable>

export interface ForumPostCommentsTable {
  id: ColumnType<string, string, never>
  forum_post_id: ColumnType<string, string, string | undefined>
  forum_member_id: ColumnType<string, string, string | undefined>
  content: ColumnType<string, string, string | undefined>
  created_at: ColumnType<string, string | undefined, string | undefined>
  updated_at: ColumnType<string, string | undefined, string | undefined>
}

export type ForumPostComments = Selectable<ForumPostCommentsTable>
export type NewForumPostComments = Insertable<ForumPostCommentsTable>
export type UpdateForumPostComments = Updateable<ForumPostCommentsTable>

export interface ForumPostsTable {
  id: ColumnType<string, string, never>
  forum_member_id: ColumnType<string, string, string | undefined>
  name: ColumnType<string, string, string | undefined>
  content: ColumnType<string, string, string | undefined>
  created_at: ColumnType<string, string | undefined, string | undefined>
  updated_at: ColumnType<string, string | undefined, string | undefined>
}

export type ForumPosts = Selectable<ForumPostsTable>
export type NewForumPosts = Insertable<ForumPostsTable>
export type UpdateForumPosts = Updateable<ForumPostsTable>

export interface ForumRolesTable {
  id: ColumnType<string, string, never>
  name: ColumnType<string, string, string | undefined>
  description: ColumnType<string, string, string | undefined>
}

export type ForumRoles = Selectable<ForumRolesTable>
export type NewForumRoles = Insertable<ForumRolesTable>
export type UpdateForumRoles = Updateable<ForumRolesTable>

export interface ForumsTable {
  id: ColumnType<string, string, never>
  user_id: ColumnType<string, string, string | undefined>
  name: ColumnType<string, string, string | undefined>
  slug: ColumnType<string, string, string | undefined>
  description: ColumnType<string, string, string | undefined>
  created_at: ColumnType<string, string | undefined, string | undefined>
  updated_at: ColumnType<string, string | undefined, string | undefined>
}

export type Forums = Selectable<ForumsTable>
export type NewForums = Insertable<ForumsTable>
export type UpdateForums = Updateable<ForumsTable>

export interface MajorSubjectGroupsTable {
  id: ColumnType<string, string, never>
  major_id: ColumnType<string, string, string | undefined>
  group_index: ColumnType<number, number, number | undefined>
  parent_id: ColumnType<string | null, string | null | undefined, string | null | undefined>
  name: ColumnType<string, string, string | undefined>
  minimum_credit: ColumnType<number | null, number | null | undefined, number | null | undefined>
  created_at: ColumnType<string, string | undefined, string | undefined>
  updated_at: ColumnType<string, string | undefined, string | undefined>
}

export type MajorSubjectGroups = Selectable<MajorSubjectGroupsTable>
export type NewMajorSubjectGroups = Insertable<MajorSubjectGroupsTable>
export type UpdateMajorSubjectGroups = Updateable<MajorSubjectGroupsTable>

export interface MajorSubjectsTable {
  major_subject_group_id: ColumnType<string, string, string | undefined>
  subject_id: ColumnType<string, string, string | undefined>
}

export type MajorSubjects = Selectable<MajorSubjectsTable>
export type NewMajorSubjects = Insertable<MajorSubjectsTable>
export type UpdateMajorSubjects = Updateable<MajorSubjectsTable>

export interface MajorsTable {
  id: ColumnType<string, string, never>
  curriculum_id: ColumnType<string, string, string | undefined>
  faculty_id: ColumnType<string, string, string | undefined>
  academic_year_id: ColumnType<string, string, string | undefined>
  name: ColumnType<string, string, string | undefined>
  minimum_gpa: ColumnType<number, number, number | undefined>
  year_amount: ColumnType<number, number, number | undefined>
  minimum_credit: ColumnType<number, number, number | undefined>
  created_at: ColumnType<string, string | undefined, string | undefined>
  updated_at: ColumnType<string, string | undefined, string | undefined>
}

export type Majors = Selectable<MajorsTable>
export type NewMajors = Insertable<MajorsTable>
export type UpdateMajors = Updateable<MajorsTable>

export interface OpeningSubjectAdditionalEligibleStudentsTable {
  id: ColumnType<string, string, never>
  opening_subject_id: ColumnType<string, string, string | undefined>
  student_id: ColumnType<string, string, string | undefined>
}

export type OpeningSubjectAdditionalEligibleStudents = Selectable<OpeningSubjectAdditionalEligibleStudentsTable>
export type NewOpeningSubjectAdditionalEligibleStudents = Insertable<OpeningSubjectAdditionalEligibleStudentsTable>
export type UpdateOpeningSubjectAdditionalEligibleStudents = Updateable<OpeningSubjectAdditionalEligibleStudentsTable>

export interface OpeningSubjectAssignmentsTable {
  id: ColumnType<string, string, never>
  opening_subject_id: ColumnType<string, string, string | undefined>
  name: ColumnType<string, string, string | undefined>
  full_score: ColumnType<number, number, number | undefined>
  percentage: ColumnType<number, number, number | undefined>
  created_at: ColumnType<string, string | undefined, string | undefined>
  updated_at: ColumnType<string, string | undefined, string | undefined>
}

export type OpeningSubjectAssignments = Selectable<OpeningSubjectAssignmentsTable>
export type NewOpeningSubjectAssignments = Insertable<OpeningSubjectAssignmentsTable>
export type UpdateOpeningSubjectAssignments = Updateable<OpeningSubjectAssignmentsTable>

export interface OpeningSubjectEligibleMajorsTable {
  id: ColumnType<string, string, never>
  opening_subject_id: ColumnType<string, string, string | undefined>
  major_id: ColumnType<string, string, string | undefined>
  academic_year_id: ColumnType<string, string, string | undefined>
}

export type OpeningSubjectEligibleMajors = Selectable<OpeningSubjectEligibleMajorsTable>
export type NewOpeningSubjectEligibleMajors = Insertable<OpeningSubjectEligibleMajorsTable>
export type UpdateOpeningSubjectEligibleMajors = Updateable<OpeningSubjectEligibleMajorsTable>

export interface OpeningSubjectProfessorsTable {
  id: ColumnType<string, string, never>
  opening_subject_id: ColumnType<string, string, string | undefined>
  professor_id: ColumnType<string, string, string | undefined>
}

export type OpeningSubjectProfessors = Selectable<OpeningSubjectProfessorsTable>
export type NewOpeningSubjectProfessors = Insertable<OpeningSubjectProfessorsTable>
export type UpdateOpeningSubjectProfessors = Updateable<OpeningSubjectProfessorsTable>

export interface OpeningSubjectSchedulesTable {
  id: ColumnType<string, string, never>
  opening_subject_id: ColumnType<string, string, string | undefined>
  room_id: ColumnType<string, string, string | undefined>
  day: ColumnType<DayOfWeek, DayOfWeek, DayOfWeek | undefined>
  start: ColumnType<string, string, string | undefined>
  end: ColumnType<string, string, string | undefined>
  timezone: ColumnType<string, string, string | undefined>
  created_at: ColumnType<string, string | undefined, string | undefined>
  updated_at: ColumnType<string, string | undefined, string | undefined>
}

export type OpeningSubjectSchedules = Selectable<OpeningSubjectSchedulesTable>
export type NewOpeningSubjectSchedules = Insertable<OpeningSubjectSchedulesTable>
export type UpdateOpeningSubjectSchedules = Updateable<OpeningSubjectSchedulesTable>

export interface OpeningSubjectStudentAssignmentsTable {
  id: ColumnType<string, string, never>
  opening_subject_student_enrollment_id: ColumnType<string, string, string | undefined>
  opening_subject_assignment_id: ColumnType<string, string, string | undefined>
  score: ColumnType<number, number, number | undefined>
  created_at: ColumnType<string, string | undefined, string | undefined>
  updated_at: ColumnType<string, string | undefined, string | undefined>
}

export type OpeningSubjectStudentAssignments = Selectable<OpeningSubjectStudentAssignmentsTable>
export type NewOpeningSubjectStudentAssignments = Insertable<OpeningSubjectStudentAssignmentsTable>
export type UpdateOpeningSubjectStudentAssignments = Updateable<OpeningSubjectStudentAssignmentsTable>

export interface OpeningSubjectStudentEnrollmentsTable {
  id: ColumnType<string, string, never>
  opening_subject_id: ColumnType<string, string, string | undefined>
  student_id: ColumnType<string, string, string | undefined>
  class_comment: ColumnType<string, string | undefined, string | undefined>
}

export type OpeningSubjectStudentEnrollments = Selectable<OpeningSubjectStudentEnrollmentsTable>
export type NewOpeningSubjectStudentEnrollments = Insertable<OpeningSubjectStudentEnrollmentsTable>
export type UpdateOpeningSubjectStudentEnrollments = Updateable<OpeningSubjectStudentEnrollmentsTable>

export interface OpeningSubjectsTable {
  id: ColumnType<string, string, never>
  subject_id: ColumnType<string, string, string | undefined>
  semester_id: ColumnType<string, string, string | undefined>
  subject_capacity: ColumnType<number, number, number | undefined>
  grading_criteria: ColumnType<string, string, string | undefined>
  created_at: ColumnType<string, string | undefined, string | undefined>
  updated_at: ColumnType<string, string | undefined, string | undefined>
}

export type OpeningSubjects = Selectable<OpeningSubjectsTable>
export type NewOpeningSubjects = Insertable<OpeningSubjectsTable>
export type UpdateOpeningSubjects = Updateable<OpeningSubjectsTable>

export interface ProfessorsTable {
  user_id: ColumnType<string, string, string | undefined>
  description: ColumnType<string, string | undefined, string | undefined>
}

export type Professors = Selectable<ProfessorsTable>
export type NewProfessors = Insertable<ProfessorsTable>
export type UpdateProfessors = Updateable<ProfessorsTable>

export interface RoomsTable {
  id: ColumnType<string, string, never>
  building_id: ColumnType<string, string, string | undefined>
  name: ColumnType<string, string, string | undefined>
  room_type: ColumnType<RoomType, RoomType, RoomType | undefined>
  capacity: ColumnType<number, number, number | undefined>
  floor: ColumnType<number, number | undefined, number | undefined>
  created_at: ColumnType<string, string | undefined, string | undefined>
  updated_at: ColumnType<string, string | undefined, string | undefined>
}

export type Rooms = Selectable<RoomsTable>
export type NewRooms = Insertable<RoomsTable>
export type UpdateRooms = Updateable<RoomsTable>

export interface SemesterDateNamesTable {
  id: ColumnType<string, string, never>
  name: ColumnType<string, string, string | undefined>
  created_at: ColumnType<string, string | undefined, string | undefined>
  updated_at: ColumnType<string, string | undefined, string | undefined>
}

export type SemesterDateNames = Selectable<SemesterDateNamesTable>
export type NewSemesterDateNames = Insertable<SemesterDateNamesTable>
export type UpdateSemesterDateNames = Updateable<SemesterDateNamesTable>

export interface SemesterDatesTable {
  semester_date_name_id: ColumnType<string, string, string | undefined>
  semester_id: ColumnType<string, string, string | undefined>
  start: ColumnType<string, string, string | undefined>
  end: ColumnType<string, string, string | undefined>
  created_at: ColumnType<string, string | undefined, string | undefined>
  updated_at: ColumnType<string, string | undefined, string | undefined>
}

export type SemesterDates = Selectable<SemesterDatesTable>
export type NewSemesterDates = Insertable<SemesterDatesTable>
export type UpdateSemesterDates = Updateable<SemesterDatesTable>

export interface SemestersTable {
  id: ColumnType<string, string, never>
  academic_year_id: ColumnType<string, string, string | undefined>
  start: ColumnType<string, string, string | undefined>
  end: ColumnType<string, string, string | undefined>
  created_at: ColumnType<string, string | undefined, string | undefined>
  updated_at: ColumnType<string, string | undefined, string | undefined>
}

export type Semesters = Selectable<SemestersTable>
export type NewSemesters = Insertable<SemestersTable>
export type UpdateSemesters = Updateable<SemestersTable>

export interface StudentsTable {
  user_id: ColumnType<string, string, string | undefined>
  major_id: ColumnType<string, string, string | undefined>
  academic_year_id: ColumnType<string, string, string | undefined>
  professor_id: ColumnType<string, string, string | undefined>
  student_id: ColumnType<string, string, string | undefined>
  student_behavior_score: ColumnType<number, number, number | undefined>
  student_status: ColumnType<string, string, string | undefined>
  previous_gpa: ColumnType<number, number, number | undefined>
  created_at: ColumnType<string, string | undefined, string | undefined>
  updated_at: ColumnType<string, string | undefined, string | undefined>
}

export type Students = Selectable<StudentsTable>
export type NewStudents = Insertable<StudentsTable>
export type UpdateStudents = Updateable<StudentsTable>

export interface SubjectsTable {
  id: ColumnType<string, string, never>
  name: ColumnType<string, string, string | undefined>
  description: ColumnType<string, string | undefined, string | undefined>
  credit: ColumnType<number, number, number | undefined>
  created_at: ColumnType<string, string | undefined, string | undefined>
  updated_at: ColumnType<string, string | undefined, string | undefined>
}

export type Subjects = Selectable<SubjectsTable>
export type NewSubjects = Insertable<SubjectsTable>
export type UpdateSubjects = Updateable<SubjectsTable>

export interface TransactionsTable {
  id: ColumnType<string, string, never>
  user_id: ColumnType<string, string, string | undefined>
  price: ColumnType<number, number, number | undefined>
  payment_status: ColumnType<PaymentStatus, PaymentStatus, PaymentStatus | undefined>
  transaction_type: ColumnType<string, string, string | undefined>
  created_at: ColumnType<string, string | undefined, string | undefined>
  updated_at: ColumnType<string, string | undefined, string | undefined>
}

export type Transactions = Selectable<TransactionsTable>
export type NewTransactions = Insertable<TransactionsTable>
export type UpdateTransactions = Updateable<TransactionsTable>

export interface UserNamesTable {
  id: ColumnType<string, string, never>
  user_id: ColumnType<string, string, string | undefined>
  name_language: ColumnType<string, string, string | undefined>
  first_name: ColumnType<string, string, string | undefined>
  middle_name: ColumnType<string, string | undefined, string | undefined>
  last_name: ColumnType<string, string | undefined, string | undefined>
  created_at: ColumnType<string, string | undefined, string | undefined>
  updated_at: ColumnType<string, string | undefined, string | undefined>
}

export type UserNames = Selectable<UserNamesTable>
export type NewUserNames = Insertable<UserNamesTable>
export type UpdateUserNames = Updateable<UserNamesTable>

export interface UserSessionsTable {
  id: ColumnType<string, string, never>
  user_id: ColumnType<string, string, string | undefined>
  expires_at: ColumnType<string, string, string | undefined>
}

export type UserSessions = Selectable<UserSessionsTable>
export type NewUserSessions = Insertable<UserSessionsTable>
export type UpdateUserSessions = Updateable<UserSessionsTable>

export interface UsersTable {
  id: ColumnType<string, string, never>
  username: ColumnType<string, string, string | undefined>
  email: ColumnType<string, string, string | undefined>
  password: ColumnType<string, string, string | undefined>
  role: ColumnType<Role, Role, Role | undefined>
  birthdate: ColumnType<string, string, string | undefined>
  created_at: ColumnType<string, string | undefined, string | undefined>
  updated_at: ColumnType<string, string | undefined, string | undefined>
}

export type Users = Selectable<UsersTable>
export type NewUsers = Insertable<UsersTable>
export type UpdateUsers = Updateable<UsersTable>

export interface Database {
  academic_years: AcademicYearsTable
  buildings: BuildingsTable
  curriculums: CurriculumsTable
  faculties: FacultiesTable
  forum_members: ForumMembersTable
  forum_post_comments: ForumPostCommentsTable
  forum_posts: ForumPostsTable
  forum_roles: ForumRolesTable
  forums: ForumsTable
  major_subject_groups: MajorSubjectGroupsTable
  major_subjects: MajorSubjectsTable
  majors: MajorsTable
  opening_subject_additional_eligible_students: OpeningSubjectAdditionalEligibleStudentsTable
  opening_subject_assignments: OpeningSubjectAssignmentsTable
  opening_subject_eligible_majors: OpeningSubjectEligibleMajorsTable
  opening_subject_professors: OpeningSubjectProfessorsTable
  opening_subject_schedules: OpeningSubjectSchedulesTable
  opening_subject_student_assignments: OpeningSubjectStudentAssignmentsTable
  opening_subject_student_enrollments: OpeningSubjectStudentEnrollmentsTable
  opening_subjects: OpeningSubjectsTable
  professors: ProfessorsTable
  rooms: RoomsTable
  semester_date_names: SemesterDateNamesTable
  semester_dates: SemesterDatesTable
  semesters: SemestersTable
  students: StudentsTable
  subjects: SubjectsTable
  transactions: TransactionsTable
  user_names: UserNamesTable
  user_sessions: UserSessionsTable
  users: UsersTable
}
