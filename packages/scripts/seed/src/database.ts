import {
  academicYears,
  academicYearsRelations,
  accountNames,
  accountNamesRelations,
  accounts,
  accountsRelations,
  assignments,
  assignmentsRelations,
  buildings,
  buildingsRelations,
  calendarEventTypes,
  calendarEventTypesRelations,
  calendarEvents,
  calendarEventsRelations,
  dayOfWeek,
  degrees,
  degreesRelations,
  disenrolledSubjects,
  disenrolledSubjectsRelations,
  enrolledSubjects,
  enrolledSubjectsRelations,
  faculties,
  facultiesRelations,
  forums,
  forumsRelations,
  majorStudyPlans,
  majorStudyPlansRelations,
  majorSubjectGroups,
  majorSubjectGroupsRelations,
  majorSubjects,
  majorSubjectsRelations,
  majors,
  majorsRelations,
  openingSubjectAdditionalStudents,
  openingSubjectAdditionalStudentsRelations,
  openingSubjectEligibleMajors,
  openingSubjectEligibleMajorsRelations,
  openingSubjectProfessors,
  openingSubjectProfessorsRelations,
  openingSubjectSchedules,
  openingSubjectSchedulesRelations,
  openingSubjectStatus,
  openingSubjects,
  openingSubjectsRelations,
  postReactions,
  postReactionsRelations,
  posts,
  postsRelations,
  professors,
  professorsRelations,
  programs,
  programsRelations,
  reactions,
  reactionsRelations,
  replies,
  repliesRelations,
  replyReactions,
  replyReactionsRelations,
  role,
  roomType,
  rooms,
  roomsRelations,
  semesters,
  semestersRelations,
  studentAssignments,
  studentAssignmentsRelations,
  students,
  studentsRelations,
  subjects,
  subjectsRelations,
  transactionStatus,
  transactionType,
  transactions,
  transactionsRelations
} from '@ger2/database'
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

export const client = postgres({
  database: process.env.PG_DBNAME,
  host: process.env.PG_HOST,
  user: process.env.PG_USER,
  password: process.env.PG_PASS,
  port: Number(process.env.PG_PORT),
  max: 1,
  onnotice: () => {}
})

export const db = drizzle(client, {
  schema: {
    academicYears,
    academicYearsRelations,

    accountNames,
    accountNamesRelations,

    accounts,
    accountsRelations,

    assignments,
    assignmentsRelations,

    buildings,
    buildingsRelations,

    calendarEventTypes,
    calendarEventTypesRelations,

    calendarEvents,
    calendarEventsRelations,

    dayOfWeek,

    degrees,
    degreesRelations,

    disenrolledSubjects,
    disenrolledSubjectsRelations,

    enrolledSubjects,
    enrolledSubjectsRelations,

    faculties,
    facultiesRelations,

    forums,
    forumsRelations,

    majorStudyPlans,
    majorStudyPlansRelations,

    majorSubjectGroups,
    majorSubjectGroupsRelations,

    majorSubjects,
    majorSubjectsRelations,

    majors,
    majorsRelations,

    openingSubjectAdditionalStudents,
    openingSubjectAdditionalStudentsRelations,

    openingSubjectEligibleMajors,
    openingSubjectEligibleMajorsRelations,

    openingSubjectProfessors,
    openingSubjectProfessorsRelations,

    openingSubjectSchedules,
    openingSubjectSchedulesRelations,

    openingSubjectStatus,

    openingSubjects,
    openingSubjectsRelations,

    postReactions,
    postReactionsRelations,

    posts,
    postsRelations,

    professors,
    professorsRelations,

    programs,
    programsRelations,

    reactions,
    reactionsRelations,

    replies,
    repliesRelations,

    replyReactions,
    replyReactionsRelations,

    role,

    roomType,

    rooms,
    roomsRelations,

    semesters,
    semestersRelations,

    studentAssignments,
    studentAssignmentsRelations,

    students,
    studentsRelations,

    subjects,
    subjectsRelations,

    transactionStatus,

    transactionType,

    transactions,
    transactionsRelations
  }
})
