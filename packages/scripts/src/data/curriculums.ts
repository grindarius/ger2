import dayjs from 'dayjs'
import ulid from 'ulid'

import { faker } from '@faker-js/faker'

import { type NewCurriculums, type NewFaculties } from '../types/index.js'

export const generateCurriculums = (faculties: Array<NewFaculties>): Array<NewCurriculums> => {
  return faculties.flatMap((faculty) => {
    return Array.from({ length: faker.number.int({ min: 4, max: 7 }) }, () => {
      return {
        id: ulid.ulid(),
        faculty_id: faculty.id,
        name: faker.commerce.productName(),
        created_at: dayjs().toISOString(),
      }
    })
  })
}
