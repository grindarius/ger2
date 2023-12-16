import dayjs from 'dayjs'
import ulid from 'ulid'

import { faker } from '@faker-js/faker'
import { hashSync } from '@node-rs/argon2'

import { argon2Options, rawPassword } from '../../argon2.js'
import { type NewAccounts, type NewProfessors, type Role } from '../../types/index.js'

export const generateProfessor = (): Array<{ account: NewAccounts, professor: NewProfessors }> => {
  const users = Array.from({ length: faker.number.int({ min: 30, max: 60 }) }, () => {
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
        role: 'professor' as Role,
        birthdate: dayjs(faker.date.between({ from: dayjs().subtract(50, 'years').toDate(), to: dayjs().subtract(30, 'years').toDate() })).toISOString(),
        created_at: createdAt,
        updated_at: null
      },
      professor: {
        account_id: id,
        description: faker.lorem.words(20)
      }
    }
  })

  return users
}
