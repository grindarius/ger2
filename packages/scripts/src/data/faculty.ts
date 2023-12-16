import dayjs from 'dayjs'
import ulid from 'ulid'

import { faker } from '@faker-js/faker'

import { type NewFaculties } from '../types/index.js'

export const generateFaculty = (): Array<NewFaculties> => {
  return Array.from({ length: 10 }, () => {
    return {
      id: ulid.ulid(),
      name: faker.commerce.productName(),
      created_at: dayjs().toISOString()
    }
  })
}
