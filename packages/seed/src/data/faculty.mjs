import dayjs from 'dayjs'
import { ulid } from 'ulid'

import { faker } from '@faker-js/faker'

export const generateFaculty = () => {
  return Array.from({ length: 10 }, () => {
    return {
      id: ulid.ulid(),
      name: faker.commerce.productName(),
      created_at: dayjs().toISOString()
    }
  })
}
