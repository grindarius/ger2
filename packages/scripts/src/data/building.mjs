import dayjs from 'dayjs'
import ulid from 'ulid'

import { faker } from '@faker-js/faker'

export class Point {
  constructor(lat, lng) {
    this.lat = lat
    this.lng = lng
  }

  asObject() {
    return {
      latitude: this.lat,
      longitude: this.lng
    }
  }

  asArray() {
    return [this.lat, this.lng]
  }

  asLatLngString() {
    return `${this.lat}, ${this.lng}`
  }

  asLngLatString() {
    return `${this.lng}, ${this.lat}`
  }

  /**
   * longitude is x, latitude is y
   */
  asPostgresPoint() {
    return `(${this.lng}, ${this.lat})`
  }
}

export const generateBuilding = () => {
  // TLV
  const coordinate = new Point(63.00247547162684, 25.699322998379134)

  return Array.from({ length: faker.number.int({ min: 10, max: 20 }) }, () => {
    return {
      id: ulid.ulid(),
      name: faker.commerce.productName(),
      description: faker.lorem.words(20),
      // INFO: who the fuck use miles tbh
      coordinates: new Point(...faker.location.nearbyGPSCoordinate({ origin: coordinate.asArray(), radius: 100, isMetric: true })).asPostgresPoint(),
      created_at: dayjs().toISOString(),
      building_created_at: dayjs(faker.date.past({ years: 20 })).toISOString()
    }
  })
}
