import { faker } from '@faker-js/faker'
import { ulid } from 'ulid'
import {
  NewAcademicYears,
  NewMajors,
  NewOpeningSubjectEligibleMajors,
  NewOpeningSubjects,
} from '../../types/index.js'

export const generateOpeningSubjectEligibleMajors = (
  openingSubjects: Array<NewOpeningSubjects>,
  academicYears: Array<NewAcademicYears>,
  majors: Array<NewMajors>
): Array<NewOpeningSubjectEligibleMajors> => {
  return openingSubjects.flatMap(os => {
    return {
      id: ulid(),
      opening_subject_id: os.id,
      major_id: faker.helpers.arrayElement(majors).id,
      academic_year_id: faker.helpers.arrayElement(academicYears).id,
    }
  })
}
