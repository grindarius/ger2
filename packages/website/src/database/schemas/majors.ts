import { relations, sql } from 'drizzle-orm'
import { integer, numeric, pgTable, smallint, text, timestamp, varchar } from 'drizzle-orm/pg-core'
import { academicYears } from './academic-years'
import { curriculums } from './curriculums'
import { faculties } from './faculties'
import { openingSubjectEligibleMajors } from './opening-subject-eligible-majors'
import { students } from './students'
import { majorSubjectGroups } from './major-subject-groups'

export const majors = pgTable('majors', {
  id: varchar('id', { length: 26 }).notNull().primaryKey(),
  curriculumId: varchar('curriculum_id', { length: 26 }).notNull(),
  facultyId: varchar('faculty_id', { length: 26 }).notNull(),
  academicYearId: varchar('academic_year_id', { length: 26 }).notNull(),
  name: text('name').notNull(),
  minmumGpa: numeric('minimum_gpa', { precision: 3, scale: 2 }).notNull(),
  yearAmount: smallint('year_amount').notNull(),
  minimumCredit: integer('minimum_credit').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'string' })
    .notNull()
    .defaultNow()
    .$onUpdateFn(() => sql`now()`)
})

export const majorsRelations = relations(majors, ({ one, many }) => ({
  curriculum: one(curriculums, {
    fields: [majors.curriculumId],
    references: [curriculums.id]
  }),
  faculty: one(faculties, {
    fields: [majors.facultyId],
    references: [faculties.id]
  }),
  academicYear: one(academicYears, {
    fields: [majors.academicYearId],
    references: [academicYears.id]
  }),
  subjectGroups: many(majorSubjectGroups),
  students: many(students),
  eligibleMajors: many(openingSubjectEligibleMajors)
}))
