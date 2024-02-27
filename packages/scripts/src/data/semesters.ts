import dayjs from 'dayjs'
import { ulid } from 'ulidx'
import { type NewAcademicYears, type NewSemesters } from '../types/index.js'

export const generateSemesters = (academicYears: Array<NewAcademicYears>): Array<NewSemesters> => {
  return academicYears.flatMap(year => {
    const start = dayjs(year.start_at)

    return [
      {
        id: ulid(),
        academic_year_id: year.id,
        start_at: dayjs(`${start.year()}-03-01T00:00:00.000+07:00`).toISOString(),
        end_at: dayjs(`${start.year()}-05-31T23:59:59.999+07:00`).toISOString(),
        created_at: dayjs().toISOString()
      },
      {
        id: ulid(),
        academic_year_id: year.id,
        start_at: dayjs(`${start.year()}-07-01T00:00:00.000+07:00`).toISOString(),
        end_at: dayjs(`${start.year()}-09-30T23:59:59.999+07:00`).toISOString(),
        created_at: dayjs().toISOString()
      }
    ]
  })
}
