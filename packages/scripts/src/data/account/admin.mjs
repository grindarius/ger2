import dayjs from 'dayjs'
import { ulid } from 'ulid'

import { faker } from '@faker-js/faker'

export const generateAdmin = () => {
  return Array.from({ length: faker.number.int({ min: 5, max: 10 }) }, () => {
    const firstName = faker.person.firstName()
    const lastName = faker.person.lastName()
    const createdAt = dayjs().toISOString()

    return {
      id: ulid.ulid(),
      username: faker.internet.userName({ firstName, lastName }),
      email: faker.internet.email({ firstName, lastName }),
      role: 'admin',
      birthdate: dayjs(faker.date.between({ from: dayjs().subtract(50, 'years').toDate(), to: dayjs().subtract(18, 'years').toDate() })).toISOString(),
      created_at: createdAt,
      updated_at: createdAt
    }
  })
}