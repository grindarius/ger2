import { relations } from 'drizzle-orm'
import { pgTable, varchar } from 'drizzle-orm/pg-core'
import { academicYears } from './academic-years.js'
import { degrees } from './degrees.js'
import { faculties } from './faculties.js'
import { programs } from './programs.js'

/**
 * Stores majors information.
 */
export const majors = pgTable('majors', {
  id: varchar('id', { length: 26 }).notNull().primaryKey(),
  facultyId: varchar('faculty_id', { length: 26 }).notNull(),
  programId: varchar('program_id', { length: 26 }).notNull(),
  degreeId: varchar('degree_id', { length: 26 }).notNull(),
  academicYearId: varchar('academic_year_id', { length: 26 }).notNull(),
  name: varchar('name', { length: 512 }).notNull()
})

export const majorsRelations = relations(majors, ({ one }) => ({
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
  })
}))
