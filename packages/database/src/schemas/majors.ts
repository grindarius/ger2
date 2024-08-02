import { relations } from 'drizzle-orm'
import { integer, interval, numeric, pgTable, uniqueIndex, varchar } from 'drizzle-orm/pg-core'
import { TIMESTAMP_COLUMNS } from '../utils.js'
import { academicYears } from './academic-years.js'
import { degrees } from './degrees.js'
import { faculties } from './faculties.js'
import { majorStudyPlans } from './major-study-plans.js'
import { majorSubjectGroups } from './major-subject-groups.js'
import { openingSubjectEligibleMajors } from './opening-subject-eligible-majors.js'
import { programs } from './programs.js'

/**
 * Stores majors information.
 *
 * A major will belong to
 * - faculty, on which faculty it is under.
 * - program, on which program the major resides.
 * - degree, on which kind of degree the user will get in the end.
 */
export const majors = pgTable(
  'majors',
  {
    id: varchar('id', { length: 26 }).notNull().primaryKey(),
    facultyId: varchar('faculty_id', { length: 26 }).notNull(),
    programId: varchar('program_id', { length: 26 }).notNull(),
    degreeId: varchar('degree_id', { length: 26 }).notNull(),
    academicYearId: varchar('academic_year_id', { length: 26 }).notNull(),
    name: varchar('name', { length: 512 }).notNull(),
    minimumGpa: numeric('minimum_gpa', { precision: 3, scale: 2 }).notNull(),
    duration: interval('duration', { fields: 'year' }).notNull(),
    minimum_credit: integer('minimum_credit').notNull(),
    ...TIMESTAMP_COLUMNS
  },
  t => ({
    majorsFacultyIdProgramIdDegreeIdAcademicYearIdIndex: uniqueIndex(
      'majors_\
      faculty_id_\
      program_id_\
      degree_id_\
      academic_year_id_\
      index'
    ).on(t.facultyId, t.programId, t.degreeId, t.academicYearId)
  })
)

export const majorsRelations = relations(majors, ({ one, many }) => ({
  faculty: one(faculties, {
    fields: [majors.facultyId],
    references: [faculties.id]
  }),
  program: one(programs, {
    fields: [majors.programId],
    references: [programs.id]
  }),
  degree: one(degrees, {
    fields: [majors.degreeId],
    references: [degrees.id]
  }),
  academicYear: one(academicYears, {
    fields: [majors.academicYearId],
    references: [academicYears.id]
  }),
  majorSubjectGroups: many(majorSubjectGroups),
  openingSubjectEligibleMajors: many(openingSubjectEligibleMajors),
  majorStudyPlans: many(majorStudyPlans)
}))
