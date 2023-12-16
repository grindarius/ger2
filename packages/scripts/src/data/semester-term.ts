import dayjs from 'dayjs'
import ulid from 'ulid'

import { type NewSemesters, type NewSemesterTerms, type SemesterType } from '../types/index.js'

export const generateSemesterTerm = (semesters: Array<NewSemesters>): Array<NewSemesterTerms> => {
  return semesters.map(semester => {
    const start = dayjs(semester.start_at)

    // First term if true, otherwise second term
    if (start.isSame(dayjs(`${start.year()}-03-01T00:00:00.000+07:00`))) {
      return [
        {
          id: ulid.ulid(),
          semester_id: semester.id,
          exam_type: 'midterm' as SemesterType,
          subject_registration_start_at: dayjs(`${start.year()}-03-01T00:00:00.000+07:00`).toISOString(),
          subject_registration_end_at: dayjs(`${start.year()}-03-05T23:59:59.999+07:00`).toISOString(),
          start_at: dayjs(`${start.year()}-03-06T00:00:00.000+07:00`).toISOString(),
          end_at: dayjs(`${start.year()}-03-31T23:59:59.999+07:00`).toISOString(),
          exam_start_at: dayjs(`${start.year()}-04-01T00:00:00.000+07:00`).toISOString(),
          exam_end_at: dayjs(`${start.year()}-04-05T23:59:59.999+07:00`).toISOString(),
          created_at: dayjs().toISOString()
        },
        {
          id: ulid.ulid(),
          semester_id: semester.id,
          exam_type: 'final' as SemesterType,
          subject_registration_start_at: dayjs(`${start.year()}-04-06T00:00:00.000+07:00`).toISOString(),
          subject_registration_end_at: dayjs(`${start.year()}-04-09T23:59:59.999+07:00`).toISOString(),
          start_at: dayjs(`${start.year()}-04-10T00:00:00.000+07:00`).toISOString(),
          end_at: dayjs(`${start.year()}-05-10T23:59:59.999+07:00`).toISOString(),
          exam_start_at: dayjs(`${start.year()}-05-25T00:00:00.000+07:00`).toISOString(),
          exam_end_at: dayjs(`${start.year()}-05-31T23:59:59.999+07:00`).toISOString(),
          created_at: dayjs().toISOString()
        }
      ]
    } else {
      return [
        {
          id: ulid.ulid(),
          semester_id: semester.id,
          exam_type: 'midterm' as SemesterType,
          subject_registration_start_at: dayjs(`${start.year()}-07-01T00:00:00.000+07:00`).toISOString(),
          subject_registration_end_at: dayjs(`${start.year()}-07-05T23:59:59.999+07:00`).toISOString(),
          start_at: dayjs(`${start.year()}-07-06T00:00:00.000+07:00`).toISOString(),
          end_at: dayjs(`${start.year()}-07-31T23:59:59.999+07:00`).toISOString(),
          exam_start_at: dayjs(`${start.year()}-08-01T00:00:00.000+07:00`).toISOString(),
          exam_end_at: dayjs(`${start.year()}-08-05T23:59:59.999+07:00`).toISOString(),
          created_at: dayjs().toISOString()
        },
        {
          id: ulid.ulid(),
          semester_id: semester.id,
          exam_type: 'final' as SemesterType,
          subject_registration_start_at: dayjs(`${start.year()}-08-06T00:00:00.000+07:00`).toISOString(),
          subject_registration_end_at: dayjs(`${start.year()}-08-09T23:59:59.999+07:00`).toISOString(),
          start_at: dayjs(`${start.year()}-08-06T00:00:00.000+07:00`).toISOString(),
          end_at: dayjs(`${start.year()}-09-10T23:59:59.999+07:00`).toISOString(),
          exam_start_at: dayjs(`${start.year()}-09-25T00:00:00.000+07:00`).toISOString(),
          exam_end_at: dayjs(`${start.year()}-09-30T23:59:59.999+07:00`).toISOString(),
          created_at: dayjs().toISOString()
        }
      ]
    }
  }).flat()
}
