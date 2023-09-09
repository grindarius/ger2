import dayjs from 'dayjs'
import ulid from 'ulid'

import { faker } from '@faker-js/faker'

export const generateProfessor = () => {
  const users = Array.from({ length: faker.number.int({ min: 30, max: 60 }) }, () => {
    const firstName = faker.person.firstName()
    const lastName = faker.person.lastName()
    const createdAt = dayjs().toISOString()

    return {
      id: ulid.ulid(),
      username: faker.internet.userName({ firstName, lastName }),
      email: faker.internet.email({ firstName, lastName }),
      role: 'admin',
      birthdate: dayjs(faker.date.between({ from: dayjs().subtract(50, 'years').toDate(), to: dayjs().subtract(30, 'years').toDate() })).toISOString(),
      created_at: createdAt,
      updated_at: createdAt
    }
  })

  const professors = users.map(u => {
    return {
      id: u.id,
      description: faker.lorem.words(20)
    }
  })

  return [...users, ...professors]
}
