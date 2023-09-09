import chalk from 'chalk'

import { generateAcademicYear } from './data/academic-year.mjs'
import { generateBuilding } from './data/building.mjs'
import { generateCurriculum } from './data/curriculum.mjs'
import { generateFaculty } from './data/faculty.mjs'
import { generateMajor } from './data/major.mjs'
import { generateMajorSubject } from './data/major-subject.mjs'
import { generateMajorSubjectGroup } from './data/major-subject-group.mjs'
import { generateRoom } from './data/room.mjs'
import { generateSemester } from './data/semester.mjs'
import { generateSemesterExam } from './data/semester-exam.mjs'
import { generateSemesterRegistration } from './data/semester-registration.mjs'
import { generateSubject } from './data/subject.mjs'
import { k } from './postgres/index.mjs'
import { toJson } from './seed/save-json-file.mjs'

const chunk = 100

console.log(chalk.blueBright('Started generating data'))

console.log(chalk.yellow('- Generating academic years data'))
const academicYears = generateAcademicYear(2010)
console.log(chalk.greenBright('- Successfully generated academic years data'))

console.log(chalk.yellow('- Generating semesters data'))
const semesters = generateSemester(academicYears)
const semesterExams = generateSemesterExam(semesters)
const semesterRegistrations = generateSemesterRegistration(semesters)
console.log(chalk.greenBright('- Successfully generated semesters data'))

console.log(chalk.yellow('- Generating faculties and majors data'))
const faculties = generateFaculty()
const curriculums = generateCurriculum(faculties)
const majors = generateMajor(curriculums, academicYears)
console.log(chalk.greenBright('- Successfully generated faculties and majors data'))

console.log(chalk.yellow('- Generating subjects data'))
const subjects = generateSubject()
const majorSubjectGroups = generateMajorSubjectGroup(majors)
const majorSubjects = generateMajorSubject(majors, subjects)
console.log(chalk.greenBright('- Successfully generated subjects data'))

console.log(chalk.yellow('- Generating buildings data'))
const buildings = generateBuilding()
const rooms = generateRoom(buildings)
console.log(chalk.greenBright('- Successfully generated buildings data'))

console.log()
console.log(chalk.blueBright('Started saving data'))

await toJson(academicYears, 'academic-year')
await toJson(semesters, 'semester')
await toJson(semesterExams, 'semester-exam')
await toJson(semesterRegistrations, 'semester-registration')
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
await k.batchInsert('academic_year', academicYears, chunk)
console.log(chalk.greenBright('- Successfully inserted academic years data'))

console.log(chalk.yellow('- Inserting semesters data'))
await k.batchInsert('semester', semesters, chunk)
await k.batchInsert('semester_exam', semesterExams, chunk)
await k.batchInsert('semester_registration', semesterRegistrations, chunk)
console.log(chalk.greenBright('- Successfylly inserted semesters data'))

console.log(chalk.yellow('- Inserting faculties and majors data'))
await k.batchInsert('faculty', faculties, chunk)
await k.batchInsert('curriculum', curriculums, chunk)
await k.batchInsert('major', majors, chunk)
console.log(chalk.greenBright('- Successfully inserted faculties and majors data'))

console.log(chalk.yellow('- Inserting subjects data'))
await k.batchInsert('subject', subjects, chunk)
await k.batchInsert('major_subject_group', majorSubjectGroups, chunk)
await k.batchInsert('major_subject', majorSubjects, chunk)
console.log(chalk.greenBright('- Successfully inserted subjects data'))

console.log(chalk.yellow('- Inserting buildings data'))
await k.batchInsert('building', buildings, chunk)
await k.batchInsert('room', rooms, chunk)
console.log(chalk.greenBright('- Successfully inserted buildings data'))

console.log(chalk.bgGreenBright(chalk.black('Done!')))

process.exit()
