import { relations } from 'drizzle-orm'
import { pgTable, varchar } from 'drizzle-orm/pg-core'
import { majors } from './majors.js'
import { semesters } from './semesters.js'
import { subjects } from './subjects.js'

/**
 * Store guides for a student about which subjects they need to take
 * in each semester.
 */
export const majorStudyPlans = pgTable('major_study_plans', {
  id: varchar('id', { length: 26 }).notNull().primaryKey(),
  majorId: varchar('major_id', { length: 26 }).notNull(),
  semesterId: varchar('semester_id', { length: 26 }).notNull(),
  subjectId: varchar('subject_id', { length: 26 }),

  /*
   * Show this instead of the subject name when it's present.
   */
  additionalTitle: varchar('additional_title', { length: 256 }),

  /**
   * Show this instead when it's present.
   */
  additionalSubjectId: varchar('additional_subject_id', { length: 32 })
})

export const majorStudyPlansRelations = relations(majorStudyPlans, ({ one }) => ({
  major: one(majors, {
    fields: [majorStudyPlans.majorId],
    references: [majors.id]
  }),
  semesterId: one(semesters, {
    fields: [majorStudyPlans.semesterId],
    references: [semesters.id]
  }),
  subject: one(subjects, {
    fields: [majorStudyPlans.subjectId],
    references: [subjects.id]
  })
}))
