import { faker } from '@faker-js/faker'
import dayjs from 'dayjs'
import ulid from 'ulid'
import { type NewSubjects } from '../types/index.js'

export const generateSubjects = (): Array<NewSubjects> => {
  return Array.from({ length: faker.number.int({ min: 200, max: 300 }) }, () => {
    return {
      id: ulid.ulid(),
      name: faker.commerce.productName(),
      description: faker.lorem.words(20),
      created_at: dayjs().toISOString()
    }
  })
}
