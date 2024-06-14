import { relations } from 'drizzle-orm'
import { pgTable, primaryKey, text, varchar } from 'drizzle-orm/pg-core'
import { openingSubjects } from './opening-subjects.js'
import { students } from './students.js'
import { openingSubjectStudentAssignments } from './opening-subject-student-assignments.js'

export const openingSubjectStudentEnrollments = pgTable(
  'opening_subject_student_enrollments',
  {
    openingSubjectId: varchar('opening_subject_id', { length: 32 })
      .notNull()
      .references(() => openingSubjects.id),
    studentId: varchar('student_id', { length: 32 })
      .notNull()
      .references(() => students.userId),
    classComment: text('class_comment').notNull().default('')
  },
  t => ({
    pk: primaryKey({ columns: [t.openingSubjectId, t.studentId] })
  })
)

export const openingSubjectStudentEnrollmentsRelations = relations(
  openingSubjectStudentEnrollments,
  ({ one, many }) => ({
    openingSubject: one(openingSubjects, {
      fields: [openingSubjectStudentEnrollments.openingSubjectId],
      references: [openingSubjects.id]
    }),
    student: one(students, {
      fields: [openingSubjectStudentEnrollments.studentId],
      references: [students.userId]
    }),
    studentAssignments: many(openingSubjectStudentAssignments)
  })
)
