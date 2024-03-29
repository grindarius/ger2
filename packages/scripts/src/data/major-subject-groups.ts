import flatten from 'just-flatten-it'
import { ulid } from 'ulidx'
import { type NewMajorSubjectGroups, type NewMajors } from '../types/index.js'

export const generateMajorSubjectGroups = (
  majors: Array<NewMajors>
): Array<NewMajorSubjectGroups> => {
  const firstLevelGroup = majors.map(major => {
    const oneId = ulid()
    const onePointOneId = ulid()
    const onePointOnePointOneId = ulid()
    const onePointOnePointTwoId = ulid()

    const twoId = ulid()
    const twoPointOneId = ulid()
    const twoPointTwoId = ulid()
    const twoPointThreeId = ulid()

    return [
      {
        id: oneId,
        major_id: major.id,
        parent_id: null,
        name: '1. main group',
        minimum_credit: 30
      },
      {
        id: onePointOneId,
        major_id: major.id,
        parent_id: oneId,
        name: '1.1 general missions',
        minimum_credit: 30
      },
      {
        id: onePointOnePointOneId,
        major_id: major.id,
        parent_id: onePointOneId,
        name: '1.1.1 mental stuffs',
        minimum_credit: 30
      },
      {
        id: onePointOnePointTwoId,
        major_id: major.id,
        parent_id: onePointOneId,
        name: '1.1.2 stuffs about people',
        minimum_credit: 15
      },
      {
        id: twoId,
        major_id: major.id,
        parent_id: null,
        name: '2. specific class stuffs',
        minimum_credit: 30
      },
      {
        id: twoPointOneId,
        major_id: major.id,
        parent_id: twoId,
        name: '2.1 math related stuffs',
        minimum_credit: 10
      },
      {
        id: twoPointTwoId,
        major_id: major.id,
        parent_id: twoId,
        name: '2.2 main biology stuffs',
        minimum_credit: 10
      },
      {
        id: twoPointThreeId,
        major_id: major.id,
        parent_id: twoId,
        name: '2.3 other electives stuffs',
        minimum_credit: 10
      }
    ]
  })

  return flatten([...firstLevelGroup])
}

// 1. main group
// 1.1 general missions
// 1.1.1 mental stuffs
// 1.1.2 stuffs about people
//
// 2. specific class stuffs
// 2.1 math related stuffs
// 2.2 main biology stuffs
// 2.3 other electives stuffs
