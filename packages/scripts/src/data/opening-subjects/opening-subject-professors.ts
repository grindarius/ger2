import { faker } from '@faker-js/faker'
import { ulid } from 'ulidx'
import {
  NewOpeningSubjects,
  NewOpeningSubjectsProfessors,
  NewProfessors
} from '../../types/index.js'

export const generateOpeningSubjectProfessors = (
  professors: Array<NewProfessors>,
  openingSubjects: Array<NewOpeningSubjects>
): Array<NewOpeningSubjectsProfessors> => {
  return openingSubjects.flatMap(os => {
    return faker.helpers.arrayElements(professors, { min: 1, max: 3 }).map(p => {
      return {
        id: ulid(),
        opening_subject_id: os.id,
        professor_id: p.account_id
      }
    })
  })
}
