import ulid from 'ulid'

import { faker } from '@faker-js/faker'

export const generateName = (students) => {
  return students.map(student => {
    return Array.from({ length: 2 }, () => {
      return {
        id: ulid.ulid(),
        user_id: student.id,
        name_language: faker.helpers.arrayElement(['en', 'th', 'fr']),
        first_name: faker.person.firstName(),
        middle_name: faker.datatype.boolean() ? faker.person.middleName() : '',
        last_name: faker.person.lastName()
      }
    })
  }).flat()
}
