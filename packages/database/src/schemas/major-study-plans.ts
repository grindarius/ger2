import { relations } from 'drizzle-orm'
import { pgTable, varchar } from 'drizzle-orm/pg-core'
import { majors } from './majors.js'
import { semesters } from './semesters.js'

/**
 * Store guides for a student about which subjects they need to take
 * in each semester.
 */
export const majorStudyPlans = pgTable('major_study_plans', {
  id: varchar('id', { length: 26 }).notNull().primaryKey(),
  majorId: varchar('major_id', { length: 26 }).notNull(),
  semesterId: varchar('semester_id', { length: 26 }).notNull(),
  description: varchar('additional_title', { length: 256 }),
  subjectId: varchar('additional_subject_id', { length: 32 })
})

export const majorStudyPlansRelations = relations(majorStudyPlans, ({ one }) => ({
  major: one(majors, {
    fields: [majorStudyPlans.majorId],
    references: [majors.id]
  }),
  semesterId: one(semesters, {
    fields: [majorStudyPlans.semesterId],
    references: [semesters.id]
  })
}))
