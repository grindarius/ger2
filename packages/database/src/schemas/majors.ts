import { InferSelectModel, relations } from 'drizzle-orm'
import {
  index,
  integer,
  numeric,
  pgTable,
  smallint,
  text,
  uniqueIndex,
  varchar
} from 'drizzle-orm/pg-core'
import { TIMESTAMP_COLUMNS } from '../utils.js'
import { academicYears } from './academic-years.js'
import { curriculums } from './curriculums.js'
import { faculties } from './faculties.js'
import { majorNames } from './major-names.js'
import { majorSubjectGroups } from './major-subject-groups.js'
import { openingSubjectEligibleMajors } from './opening-subject-eligible-majors.js'
import { students } from './students.js'

export const majors = pgTable(
  'majors',
  {
    id: varchar('id', { length: 32 }).notNull().primaryKey(),
    majorNameId: varchar('major_name_id', { length: 32 }).notNull(),
    curriculumId: varchar('curriculum_id', { length: 32 }).notNull(),
    facultyId: varchar('faculty_id', { length: 32 }).notNull(),
    academicYearId: varchar('academic_year_id', { length: 32 }).notNull(),
    name: text('name').notNull(),
    minimumGpa: numeric('minimum_gpa', { precision: 3, scale: 2 }).notNull(),
    yearAmount: smallint('year_amount').notNull(),
    minimumCredit: integer('minimum_credit').notNull(),
    ...TIMESTAMP_COLUMNS
  },
  t => ({
    majorNameCurriculumFacultyAcademicYearUniqueIndex: uniqueIndex(
      'majors_major_name_id_curriculum_id_faculty_id_academic_year_id_unique_constraint'
    ).on(t.majorNameId, t.curriculumId, t.facultyId, t.academicYearId)
  })
)

export const majorsRelations = relations(majors, ({ one, many }) => ({
  curriculum: one(curriculums, {
    fields: [majors.curriculumId],
    references: [curriculums.id]
  }),
  majorName: one(majorNames, {
    fields: [majors.majorNameId],
    references: [majorNames.id]
  }),
  faculty: one(faculties, {
    fields: [majors.facultyId],
    references: [faculties.id]
  }),
  academicYear: one(academicYears, {
    fields: [majors.academicYearId],
    references: [academicYears.id]
  }),
  majorSubjectGroups: many(majorSubjectGroups),
  students: many(students),
  openingSubjectEligibleMajors: many(openingSubjectEligibleMajors)
}))
