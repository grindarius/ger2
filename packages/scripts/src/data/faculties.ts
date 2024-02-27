import { faker } from '@faker-js/faker'
import dayjs from 'dayjs'
import { ulid } from 'ulidx'
import { type NewFaculties } from '../types/index.js'

export const generateFaculties = (): Array<NewFaculties> => {
  return Array.from({ length: 10 }, () => {
    return {
      id: ulid(),
      name: faker.commerce.productName(),
      created_at: dayjs().toISOString()
    }
  })
}
