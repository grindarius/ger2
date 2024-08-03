import { relations } from 'drizzle-orm'
import { integer, jsonb, pgTable, varchar } from 'drizzle-orm/pg-core'
import { TIMESTAMP_COLUMNS } from '../utils.js'
import { assignments } from './assignments.js'
import { disenrolledSubjects } from './disenrolled-subjects.js'
import { enrolledSubjects } from './enrolled-subjects.js'
import { openingSubjectAdditionalStudents } from './opening-subject-additional-students.js'
import { openingSubjectEligibleMajors } from './opening-subject-eligible-majors.js'
import { openingSubjectProfessors } from './opening-subject-professors.js'
import { openingSubjectSchedules } from './opening-subject-schedules.js'
import { openingSubjectStatus } from './opening-subject-status.js'
import { semesters } from './semesters.js'
import { subjects } from './subjects.js'

/**
 * Stores information about opening subjects inside a semester.
 *
 * A subject inside semester can have multiple opening subjects.
 */
export const openingSubjects = pgTable('opening_subjects', {
  id: varchar('id', { length: 26 }).notNull().primaryKey(),
  subjectId: varchar('subject_id', { length: 26 }).notNull(),
  semesterId: varchar('semester_id', { length: 26 }).notNull(),
  subject_capacity: integer('subject_capicity').notNull(),
  status: openingSubjectStatus('status').notNull(),

  /**
   * Some subject will have multiple professors open it for
   * all the students to be able to take, so they will have this group index
   * to denote which group they are in.
   *
   * This will be a max + 1 for new subjects with same `subjectId` and `semesterId`.
   */
  groupIndex: integer('group_index').notNull().default(1),

  /**
   * An object in json format with the minimum score as key in `f64`, and the grade in `String`
   * (Rust type).
   *
   * For example:
   *
   * ```json
   * {
   *   80.0: "A",
   *   75.0: "B+",
   *   70.0: "B",
   *   65.0: "C+",
   *   60.0: "C",
   *   55.0: "D+",
   *   50.0: "D",
   *   0: "F"
   * }
   * ```
   *
   * The Rust code can be.
   *
   * ```rust
   * let mut grades: BTreeMap<i32, String> = BTreeMap::new();
   * grades.insert(80, "A".to_string());
   * grades.insert(75, "B+".to_string());
   * grades.insert(70, "B".to_string());
   * grades.insert(65, "C+".to_string());
   * grades.insert(60, "C".to_string());
   * grades.insert(55, "D+".to_string());
   * grades.insert(50, "D".to_string());
   * grades.insert(0, "F".to_string());
   *
   * let score = 76;
   * let grade = grades.range(..=score).next_back();
   *
   * println!("{:?}", grade.unwrap().1);
   * Ok(())
   * ```
   */
  grading_criteria: jsonb('grading_criteria').notNull(),
  ...TIMESTAMP_COLUMNS
})

export const openingSubjectsRelations = relations(openingSubjects, ({ one, many }) => ({
  subject: one(subjects, {
    fields: [openingSubjects.subjectId],
    references: [subjects.id]
  }),
  semester: one(semesters, {
    fields: [openingSubjects.semesterId],
    references: [semesters.id]
  }),
  openingSubjectSchedules: many(openingSubjectSchedules),
  openingSubjectProfessors: many(openingSubjectProfessors),
  openingSubjectEligibleMajors: many(openingSubjectEligibleMajors),
  openingSubjectAdditionalStudents: many(openingSubjectAdditionalStudents),
  enrolledSubjects: many(enrolledSubjects),
  disenrolledSubjects: many(disenrolledSubjects),
  assignments: many(assignments)
}))
