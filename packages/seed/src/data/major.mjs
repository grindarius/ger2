import dayjs from 'dayjs'
import { ulid } from 'ulid'

import { faker } from '@faker-js/faker'

export const generateMajor = (curriculums, academicYears) => {
  return curriculums.map(curriculum => {
    return Array.from({ length: faker.number.int({ min: 3, max: 8 }) }, () => {
      return {
        id: ulid.ulid(),
        curriculum_id: curriculum.id,
        academic_year_id: faker.helpers.arrayElement(academicYears).id,
        name: faker.commerce.productName(),
        minimum_credit: faker.number.int({ min: 3, max: 7 }),
        year_amount: faker.number.int({ min: 4, max: 7 }),
        minimum_grade: faker.helpers.arrayElement([1.5, 2.0, 2.5, 3.0]),
        created_at: dayjs().toISOString()
      }
    })
  }).flat()
}
