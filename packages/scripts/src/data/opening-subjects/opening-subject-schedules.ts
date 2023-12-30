import { faker } from '@faker-js/faker'
import { ulid } from 'ulid'
import { NewOpeningSubjectSchedules, NewOpeningSubjects, NewRooms } from '../../types/index.js'

export const generateOpeningSubjectSchedules = (
  openingSubjects: Array<NewOpeningSubjects>,
  rooms: Array<NewRooms>,
): Array<NewOpeningSubjectSchedules> => {
  return openingSubjects.flatMap(os => {
    const subjectStart = faker.number.int({ min: 8, max: 17 })

    return {
      id: ulid(),
      opening_subject_id: os.id,
      room_id: faker.helpers.arrayElement(rooms).id,
      day: faker.helpers.arrayElement(['monday', 'tuesday', 'wednesday', 'thursday', 'friday']),
      start_at: `${subjectStart.toString().padStart(2, '0')}:00`,
      end_at: `${subjectStart + 2}:00`,
    }
  })
}
