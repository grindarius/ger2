import { relations } from 'drizzle-orm'
import { pgTable, text, varchar } from 'drizzle-orm/pg-core'
import { openingSubjectProfessors } from './opening-subject-professors.js'
import { students } from './students.js'
import { users } from './users.js'

export const professors = pgTable('professors', {
  userId: varchar('user_id', { length: 32 })
    .notNull()
    .primaryKey()
    .references(() => users.id),
  description: text('description').notNull()
})

export const professorsRelations = relations(professors, ({ many }) => ({
  students: many(students),
  openingSubjectProfessors: many(openingSubjectProfessors)
}))
