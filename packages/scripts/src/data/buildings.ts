import dayjs from 'dayjs'
import ulid from 'ulid'

import { faker } from '@faker-js/faker'

import { type NewBuildings } from '../types/index.js'

export class Point {
  latitude: number
  longitude: number

  constructor(lat: number, lng: number) {
    this.latitude = lat
    this.longitude = lng
  }

  asObject(): { latitude: number; longitude: number } {
    return {
      latitude: this.latitude,
      longitude: this.longitude,
    }
  }

  asXYObject(): { x: number; y: number } {
    return {
      x: this.longitude,
      y: this.latitude,
    }
  }

  asArray(): [number, number] {
    return [this.latitude, this.longitude]
  }

  asLatLngString(): string {
    return `${this.latitude}, ${this.longitude}`
  }

  asLngLatString(): string {
    return `${this.longitude}, ${this.latitude}`
  }

  /**
   * longitude is x, latitude is y
   */
  asPostgresPointString(): string {
    return `(${this.longitude}, ${this.latitude})`
  }
}

export const generateBuildings = (): Array<NewBuildings> => {
  // TLV. Tel Aviv Airport
  const coordinate = new Point(63.00247547162684, 25.699322998379134)

  return Array.from({ length: faker.number.int({ min: 10, max: 20 }) }, () => {
    return {
      id: ulid.ulid(),
      name: faker.commerce.productName(),
      description: faker.lorem.words(20),
      // INFO: who the fuck use miles tbh
      coordinates: new Point(
        ...faker.location.nearbyGPSCoordinate({
          origin: coordinate.asArray(),
          radius: 100,
          isMetric: true,
        }),
      ).asPostgresPointString(),
      created_at: dayjs().toISOString(),
      building_created_at: dayjs(faker.date.past({ years: 20 })).toISOString(),
    }
  })
}
