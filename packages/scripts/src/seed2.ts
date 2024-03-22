import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat.js'
import timezone from 'dayjs/plugin/timezone.js'
import utc from 'dayjs/plugin/utc.js'
import { k } from './postgres/index.js'
import { academicYears } from './seed2/academic-years.js'
import { buildings } from './seed2/buildings.js'
import { curriculums } from './seed2/curriculums.js'
import { faculties } from './seed2/faculties.js'
import { majorSubjectGroups } from './seed2/major-subject-groups.js'
import { majorSubjects } from './seed2/major-subjects.js'
import { majors } from './seed2/majors.js'
import { openingSubjectAssignments } from './seed2/opening-subject-assignments.js'
import { openingSubjectEligibleMajors } from './seed2/opening-subject-eligible-majors.js'
import { openingSubjectSchedules } from './seed2/opening-subject-schedules.js'
import { openingSubjectStudentAssignments } from './seed2/opening-subject-student-assignments.js'
import { openingSubjectStudentEnrollments } from './seed2/opening-subject-student-enrollments.js'
import { openingSubjectProfessors } from './seed2/opening-subjects-professors.js'
import { openingSubjects } from './seed2/opening-subjects.js'
import { professors } from './seed2/professors.js'
import { rooms } from './seed2/rooms.js'
import { semesterDateNames } from './seed2/semester-date-names.js'
import { semesterDates } from './seed2/semester-dates.js'
import { semesters } from './seed2/semesters.js'
import { students } from './seed2/students.js'
import { subjects } from './seed2/subjects.js'
import { transactions } from './seed2/transactions.js'
import { userNames } from './seed2/user-names.js'
import { users } from './seed2/users.js'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(customParseFormat)

await k.insertInto('academic_years').values(academicYears).execute()
await k.insertInto('semesters').values(semesters).execute()
await k.insertInto('semester_date_names').values(semesterDateNames).execute()
await k.insertInto('semester_dates').values(semesterDates).execute()
await k.insertInto('faculties').values(faculties).execute()
await k.insertInto('curriculums').values(curriculums).execute()
await k.insertInto('majors').values(majors).execute()
await k.insertInto('subjects').values(subjects).execute()
await k.insertInto('major_subject_groups').values(majorSubjectGroups).execute()
await k.insertInto('major_subjects').values(majorSubjects).execute()
await k.insertInto('buildings').values(buildings).execute()
await k.insertInto('rooms').values(rooms).execute()
await k.insertInto('users').values(users).execute()
await k.insertInto('user_names').values(userNames).execute()
await k.insertInto('professors').values(professors).execute()
await k.insertInto('students').values(students).execute()
await k.insertInto('opening_subjects').values(openingSubjects).execute()
await k.insertInto('opening_subject_schedules').values(openingSubjectSchedules).execute()
await k.insertInto('opening_subject_professors').values(openingSubjectProfessors).execute()
await k.insertInto('opening_subject_eligible_majors').values(openingSubjectEligibleMajors).execute()
await k
  .insertInto('opening_subject_student_enrollments')
  .values(openingSubjectStudentEnrollments)
  .execute()
await k.insertInto('opening_subject_assignments').values(openingSubjectAssignments).execute()
await k
  .insertInto('opening_subject_student_assignments')
  .values(openingSubjectStudentAssignments)
  .execute()
await k.insertInto('transactions').values(transactions).execute()

process.exit()
