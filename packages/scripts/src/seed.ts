import { faker } from '@faker-js/faker'
import chalk from 'chalk'
import { generateAcademicYears } from './data/academic-years.js'
import { generateAdmins } from './data/account/admins.js'
import { generateProfessors } from './data/account/professors.js'
import { generateStudents } from './data/account/students.js'
import { generateBuildings } from './data/buildings.js'
import { generateCurriculums } from './data/curriculums.js'
import { generateFaculties } from './data/faculties.js'
import { generateMajorSubjectGroups } from './data/major-subject-groups.js'
import { generateMajorSubjects } from './data/major-subjects.js'
import { generateMajors } from './data/majors.js'
import { generateOpeningSubjectAdditionalEligibleStudents } from './data/opening-subjects/opening-subject-additional-eligible-students.js'
import { generateOpeningSubjectAssignments } from './data/opening-subjects/opening-subject-assignments.js'
import { generateOpeningSubjectEligibleMajors } from './data/opening-subjects/opening-subject-eligible-majors.js'
import { generateOpeningSubjectProfessors } from './data/opening-subjects/opening-subject-professors.js'
import { generateOpeningSubjectSchedules } from './data/opening-subjects/opening-subject-schedules.js'
import { generateOpeningSubjectStudentAssignments } from './data/opening-subjects/opening-subject-student-assignments.js'
import { generateOpeningSubjectsStudentEnrollments } from './data/opening-subjects/opening-subject-student-enrollments.js'
import { generateOpeningSubjects } from './data/opening-subjects/opening-subjects.js'
import { generateRooms } from './data/rooms.js'
import { generateSemesterTerms } from './data/semester-terms.js'
import { generateSemesters } from './data/semesters.js'
import { generateSubjects } from './data/subjects.js'
import { k } from './postgres/index.js'
import { toJson } from './seed/save-json-file.js'

faker.seed(3312503)

console.log(chalk.blueBright('Started generating data'))

console.log(chalk.yellow('- Generating academic years data'))
const academicYears = generateAcademicYears(2010)
console.log(chalk.greenBright('- Successfully generated academic years data'))

console.log(chalk.yellow('- Generating semesters data'))
const semesters = generateSemesters(academicYears)
const semesterTerms = generateSemesterTerms(semesters)
console.log(chalk.greenBright('- Successfully generated semesters data'))

console.log(chalk.yellow('- Generating faculties and majors data'))
const faculties = generateFaculties()
const curriculums = generateCurriculums(faculties)
const majors = generateMajors(curriculums, academicYears)
console.log(chalk.greenBright('- Successfully generated faculties and majors data'))

console.log(chalk.yellow('- Generating subjects data'))
const subjects = generateSubjects()
const majorSubjectGroups = generateMajorSubjectGroups(majors)
console.log(chalk.greenBright('- Successfully generated subjects data'))

console.log(chalk.yellow('- Generating buildings data'))
const buildings = generateBuildings()
const rooms = generateRooms(buildings)
console.log(chalk.greenBright('- Successfully generated buildings data'))

console.log(chalk.yellow("- Generating people's data"))
const admins = generateAdmins()
const professors = generateProfessors()
const students = generateStudents(
  majors,
  academicYears,
  professors.map(p => p.professors),
)
console.log(chalk.greenBright("- Successfully generated people's data"))

console.log(chalk.yellow('- Generating opening subjects data'))
const openingSubjects = await generateOpeningSubjects(semesterTerms)
const openingSubjectSchedules = generateOpeningSubjectSchedules(openingSubjects, rooms)
const openingSubjectProfessors = generateOpeningSubjectProfessors(
  professors.map(p => p.professors),
  openingSubjects,
)
const openingSubjectEligibleMajors = generateOpeningSubjectEligibleMajors(
  openingSubjects,
  academicYears,
  majors,
)
const openingSubjectAdditionalEligibleStudents = generateOpeningSubjectAdditionalEligibleStudents(
  students.map(s => s.students),
  openingSubjects,
)
const openingSubjectStudentEnrollments = generateOpeningSubjectsStudentEnrollments(
  openingSubjects,
  students.map(s => s.students),
)
const openingSubjectAssignments = generateOpeningSubjectAssignments(
  openingSubjects,
  professors.map(p => p.professors),
)
const openingSubjectStudentAssignments = generateOpeningSubjectStudentAssignments(
  openingSubjectAssignments,
  openingSubjectStudentEnrollments,
)

console.log()
console.log(chalk.blueBright('Started saving data'))

await toJson(academicYears, 'academic-year')
await toJson(semesters, 'semester')
await toJson(semesterTerms, 'semester-term')
await toJson(faculties, 'faculty')
await toJson(curriculums, 'curriculum')
await toJson(majors, 'major')
await toJson(subjects, 'subject')
await toJson(majorSubjectGroups, 'major-subject-group')
await toJson(buildings, 'building')
await toJson(rooms, 'room')

console.log()
console.log(chalk.blueBright('Started inserting data'))

console.log(chalk.yellow('- Inserting academic years data'))
await k.insertInto('academic_years').values(academicYears).execute()
console.log(chalk.greenBright('- Successfully inserted academic years data'))

console.log(chalk.yellow('- Inserting semesters data'))
await k.insertInto('semesters').values(semesters).execute()
await k.insertInto('semester_terms').values(semesterTerms).execute()
console.log(chalk.greenBright('- Successfylly inserted semesters data'))

console.log(chalk.yellow('- Inserting faculties and majors data'))
await k.insertInto('faculties').values(faculties).execute()
await k.insertInto('curriculums').values(curriculums).execute()
await k.insertInto('majors').values(majors).execute()
console.log(chalk.greenBright('- Successfully inserted faculties and majors data'))

console.log(chalk.yellow('- Inserting subjects data'))
await k.insertInto('subjects').values(subjects).execute()
await k.insertInto('major_subject_groups').values(majorSubjectGroups).execute()
const majorSubjects = await generateMajorSubjects(majors, subjects)

await k.insertInto('major_subjects').values(majorSubjects).execute()
console.log(chalk.greenBright('- Successfully inserted subjects data'))

console.log(chalk.yellow('- Inserting buildings data'))
await k.insertInto('buildings').values(buildings).execute()
await k.insertInto('rooms').values(rooms).execute()
console.log(chalk.greenBright('- Successfully inserted buildings data'))

console.log(chalk.yellow("- Inserting people's data"))

await k.transaction().execute(async txn => {
  await txn
    .insertInto('accounts')
    .values([
      ...admins.map(a => a.accounts),
      ...professors.map(p => p.accounts),
      ...students.map(s => s.accounts),
    ])
    .execute()

  await txn
    .insertInto('account_names')
    .values([
      ...admins.map(a => a.account_names),
      ...professors.map(p => p.account_names),
      ...students.map(s => s.account_names),
    ])
    .execute()

  await k
    .insertInto('professors')
    .values([...professors.map(p => p.professors)])
    .execute()
  await k
    .insertInto('students')
    .values([...students.map(s => s.students)])
    .execute()
})
console.log(chalk.greenBright("- Successfully inserted people's data"))

console.log()
console.log(chalk.yellow('Inserting opening subjects data'))

console.log(chalk.bgGreenBright(chalk.black('Done!')))

process.exit()
