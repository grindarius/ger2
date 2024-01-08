import { randomBytes } from 'node:crypto'
import { faker } from '@faker-js/faker'
import { hashSync } from '@node-rs/argon2'
import dayjs from 'dayjs'
import ulid from 'ulid'
import { argon2Options, rawPassword } from '../../argon2.js'
import {
  type NewAcademicYears,
  NewAccountNames,
  type NewAccounts,
  type NewMajors,
  type NewProfessors,
  type NewStudents,
  type Role
} from '../../types/index.js'

export const generateStudents = (
  majors: Array<NewMajors>,
  academicYears: Array<NewAcademicYears>,
  professors: Array<NewProfessors>
): Array<{ accounts: NewAccounts; account_names: NewAccountNames; students: NewStudents }> => {
  const students = academicYears.flatMap(a => {
    return Array.from({ length: faker.number.int({ min: 100, max: 200 }) }, () => {
      const id = ulid.ulid()
      const firstName = faker.person.firstName()
      const lastName = faker.person.lastName()
      const createdAt = dayjs(
        faker.date.between({
          from: dayjs(a.start_at).subtract(1, 'month').toISOString(),
          to: dayjs(a.start_at).toISOString()
        })
      ).toISOString()

      return {
        accounts: {
          id,
          username: (
            faker.internet.userName({ firstName, lastName }) + randomBytes(4).toString('hex')
          ).substring(0, 30),
          email: faker.internet.email({ firstName, lastName }),
          password: hashSync(rawPassword, argon2Options),
          role: 'student' as Role,
          birthdate: dayjs(faker.date.past({ years: 20 })).toISOString(),
          created_at: createdAt
        },
        account_names: {
          id: ulid.ulid(),
          account_id: id,
          name_language: 'en',
          first_name: firstName,
          middle_name: '',
          last_name: lastName
        },
        students: {
          account_id: id,
          major_id: faker.helpers.arrayElement(majors).id,
          academic_year_id: a.id,
          professor_id: faker.helpers.arrayElement(professors).account_id,
          student_id: Array.from({ length: 8 }, () => faker.number.int({ min: 0, max: 9 })).join(
            ''
          ),
          student_nid: Array.from({ length: 13 }, () => faker.number.int({ min: 0, max: 9 })).join(
            ''
          ),
          previous_gpa: faker.number.float({ min: 1.0, max: 4.01, precision: 0.01 })
        }
      }
    })
  })

  return students
}
