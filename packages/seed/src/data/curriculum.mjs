import dayjs from 'dayjs'
import ulid from 'ulid'

import { faker } from '@faker-js/faker'

export const generateCurriculum = (faculties) => {
  return faculties.map(faculty => {
    return Array.from({ length: faker.number.int({ min: 4, max: 7 }) }, () => {
      return {
        id: ulid.ulid(),
        faculty_id: faculty.id,
        name: faker.commerce.productName(),
        created_at: dayjs().toISOString()
      }
    })
  }).flat()
}
