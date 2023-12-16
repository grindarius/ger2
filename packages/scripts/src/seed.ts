import chalk from 'chalk'

import { faker } from '@faker-js/faker'

import { generateAcademicYear } from './data/academic-year.js'
import { generateAdmin } from './data/account/admin.js'
import { generateProfessor } from './data/account/professor.js'
import { generateStudent } from './data/account/student.js'
import { generateBuilding } from './data/building.js'
import { generateCurriculum } from './data/curriculum.js'
import { generateFaculty } from './data/faculty.js'
import { generateMajor } from './data/major.js'
import { generateMajorSubject } from './data/major-subject.js'
import { generateMajorSubjectGroup } from './data/major-subject-group.js'
import { generateRoom } from './data/room.js'
import { generateSemester } from './data/semester.js'
import { generateSemesterTerm } from './data/semester-term.js'
import { generateSubject } from './data/subject.js'
import { k } from './postgres/index.js'
import { toJson } from './seed/save-json-file.js'

faker.seed(3312503)

console.log(chalk.blueBright('Started generating data'))

console.log(chalk.yellow('- Generating academic years data'))
const academicYears = generateAcademicYear(2010)
console.log(chalk.greenBright('- Successfully generated academic years data'))

console.log(chalk.yellow('- Generating semesters data'))
const semesters = generateSemester(academicYears)
const semesterTerms = generateSemesterTerm(semesters)
console.log(chalk.greenBright('- Successfully generated semesters data'))

console.log(chalk.yellow('- Generating faculties and majors data'))
const faculties = generateFaculty()
const curriculums = generateCurriculum(faculties)
const majors = generateMajor(curriculums, academicYears)
console.log(chalk.greenBright('- Successfully generated faculties and majors data'))

console.log(chalk.yellow('- Generating subjects data'))
const subjects = generateSubject()
const majorSubjectGroups = generateMajorSubjectGroup(majors)
console.log(chalk.greenBright('- Successfully generated subjects data'))

console.log(chalk.yellow('- Generating buildings data'))
const buildings = generateBuilding()
const rooms = generateRoom(buildings)
console.log(chalk.greenBright('- Successfully generated buildings data'))

console.log(chalk.yellow('- Generating people\'s data'))
const admins = generateAdmin()
const professors = generateProfessor()
const students = generateStudent(majors, academicYears, professors.map(p => p.professor))
console.log(chalk.greenBright('- Successfully generated people\'s data'))

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
const majorSubjects = await generateMajorSubject(majors, subjects)

await k.insertInto('major_subjects').values(majorSubjects).execute()
console.log(chalk.greenBright('- Successfully inserted subjects data'))

console.log(chalk.yellow('- Inserting buildings data'))
await k.insertInto('buildings').values(buildings).execute()
await k.insertInto('rooms').values(rooms).execute()
console.log(chalk.greenBright('- Successfully inserted buildings data'))

console.log(chalk.yellow('- Inserting people\'s data'))
await k.insertInto('accounts').values([...admins, ...professors.map(p => p.account), ...students.map(s => s.account)]).execute()
await k.insertInto('professors').values([...professors.map(p => p.professor)]).execute()
await k.insertInto('students').values([...students.map(s => s.student)]).execute()
console.log(chalk.greenBright('- Successfully inserted people\'s data'))

console.log(chalk.bgGreenBright(chalk.black('Done!')))
process.exit()
