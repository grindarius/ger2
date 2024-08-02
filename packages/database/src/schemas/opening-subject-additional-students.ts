import { relations } from 'drizzle-orm'
import { pgTable, varchar } from 'drizzle-orm/pg-core'
import { openingSubjects } from './opening-subjects.js'
import { students } from './students.js'

export const openingSubjectAdditionalStudents = pgTable('opening_subject_additiona_students', {
  id: varchar('id', { length: 26 }).notNull().primaryKey(),
  openingSubjectId: varchar('opening_subject_id', { length: 26 }).notNull(),
  studentId: varchar('student_id').notNull()
})

export const openingSubjectAdditionalStudentsRelations = relations(
  openingSubjectAdditionalStudents,
  ({ one }) => ({
    openingSubject: one(openingSubjects, {
      fields: [openingSubjectAdditionalStudents.openingSubjectId],
      references: [openingSubjects.id]
    }),
    student: one(students, {
      fields: [openingSubjectAdditionalStudents.studentId],
      references: [students.accountId]
    })
  })
)
