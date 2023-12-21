import dayjs from 'dayjs'
import ulid from 'ulid'

import { type NewAcademicYears } from '../types/index.js'

export const generateAcademicYears = (start: number): Array<NewAcademicYears> => {
  const endYear = dayjs().year()

  const years = []

  for (let i = start; i <= endYear; i += 1) {
    years.push({
      id: ulid.ulid(),
      year: i,
      start_at: dayjs(`${i}-06-01T00:00:00.000+07:00`).toISOString(),
      end_at: dayjs(`${i}-12-31T23:59:59.999+07:00`).toISOString(),
      created_at: dayjs().toISOString(),
    })
  }

  return years
}
