import ulid from 'ulid'

export const generateMajorSubjectGroup = (majors) => {
  const firstLevelGroup = majors.map(major => {
    return {
      id: ulid.ulid(),
      major_id: major.id,
      parent_id: null,
      name: 'main subject group',
      minimum_credit: 30
    }
  })

  const secondLevelGroup = firstLevelGroup.map(group => {
    return [
      {
        id: ulid.ulid(),
        major_id: group.major_id,
        parent_id: group.id,
        name: 'pe group',
        minimum_credit: 15
      },
      {
        id: ulid.ulid(),
        major_id: group.major_id,
        parent_id: group.id,
        name: 'main subjects',
        minimum_credit: 15
      }
    ]
  })

  return [...firstLevelGroup, ...secondLevelGroup]
}

// 1. main group
// 1.1 pe group
// 1.2 main subjects
