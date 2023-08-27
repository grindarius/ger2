import { faker } from '@faker-js/faker'

export const generateMajorSubject = (majorGroups, subjects) => {
  return majorGroups.filter(group => group.parent_id != null).map(group => {
    return faker.helpers.arrayElements(subjects, 8).map(subjectGroup => {
      return {
        major_subject_group_id: group.id,
        subject_id: subjectGroup.id
      }
    })
  })
}
