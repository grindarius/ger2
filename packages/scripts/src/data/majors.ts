import { faker } from '@faker-js/faker'
import dayjs from 'dayjs'
import ulid from 'ulid'
import { type NewAcademicYears, type NewCurriculums, type NewMajors } from '../types/index.js'

export const generateMajors = (
  curriculums: Array<NewCurriculums>,
  academicYears: Array<NewAcademicYears>,
): Array<NewMajors> => {
  return curriculums.flatMap(curriculum => {
    return Array.from({ length: faker.number.int({ min: 3, max: 8 }) }, () => {
      return {
        id: ulid.ulid(),
        curriculum_id: curriculum.id,
        academic_year_id: faker.helpers.arrayElement(academicYears).id,
        name: faker.commerce.productName(),
        minimum_gpa: faker.helpers.arrayElement([1.5, 2.0, 2.5, 3.0]),
        year_amount: faker.number.int({ min: 4, max: 6 }),
        minimum_credit: faker.number.int({ min: 3, max: 6 }),
        created_at: dayjs().toISOString(),
      }
    })
  })
}
