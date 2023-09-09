import dayjs from 'dayjs'
import ulid from 'ulid'

import { faker } from '@faker-js/faker'

export const generateSubject = () => {
  return Array.from({ length: faker.number.int({ min: 100, max: 130 }) }, () => {
    return {
      id: ulid.ulid(),
      name: faker.commerce.productName(),
      description: faker.lorem.words(20),
      credit: faker.number.int({ min: 3, max: 7 }),
      created_at: dayjs().toISOString()
    }
  })
}
