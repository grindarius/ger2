import dayjs from 'dayjs'
import ulid from 'ulid'

import { faker } from '@faker-js/faker'
import { hashSync } from '@node-rs/argon2'

import { argon2Options, rawPassword } from '../../argon2.mjs'

export const generateStudent = (majors, academicYears, professors) => {
  const students = Array.from({ length: faker.number.int({ min: 300, max: 500 }) }, () => {
    const id = ulid.ulid()
    const firstName = faker.person.firstName()
    const lastName = faker.person.lastName()
    const createdAt = dayjs().toISOString()

    return {
      account: {
        id,
        username: faker.internet.userName({ firstName, lastName }),
        email: faker.internet.email({ firstName, lastName }),
        password: hashSync(rawPassword, argon2Options),
        role: 'admin',
        birthdate: dayjs(faker.date.between({ from: dayjs().subtract(50, 'years').toDate(), to: dayjs().subtract(30, 'years').toDate() })).toISOString(),
        created_at: createdAt,
        updated_at: null
      },
      student: {
        id,
        major_id: faker.helpers.arrayElement(majors).id,
        academic_year_id: faker.helpers.arrayElement(academicYears).id,
        professor_id: faker.helpers.arrayElement(professors).id,
        student_id: Array.from({ length: 8 }, () => faker.number.int({ min: 0, max: 9 })).join(''),
        student_nid: Array.from({ length: 13 }, () => faker.number.int({ min: 0, max: 9 })).join(''),
        previous_gpa: faker.number.float({ min: 1.0, max: 4.01, precision: 0.01 })
      }
    }
  })

  return students
}
