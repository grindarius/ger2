import { faker } from '@faker-js/faker'
import flatten from 'just-flatten-it'
import ulid from 'ulid'
import { type NewBuildings, type NewRooms } from '../types/index.js'

export const generateRooms = (buildings: Array<NewBuildings>): Array<NewRooms> => {
  const levels = faker.number.int({ min: 1, max: 8 })
  const roomsPerFloor = faker.number.int({ min: 8, max: 13 })

  return flatten(
    buildings.map(building => {
      return Array.from({ length: levels }, (_, i) => {
        return Array.from({ length: roomsPerFloor }, () => {
          return {
            id: ulid.ulid(),
            building_id: building.id,
            name: faker.commerce.productName(),
            description: faker.lorem.word(20),
            capacity: faker.number.int({ min: 10, max: 60 }),
            floor: i + 1,
          }
        })
      })
    }),
  )
}
