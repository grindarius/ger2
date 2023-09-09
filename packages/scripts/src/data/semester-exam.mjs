import dayjs from 'dayjs'
import ulid from 'ulid'

export const generateSemesterExam = (semesters) => {
  return semesters.map(semester => {
    const referenceDate = dayjs(semester.end_at)

    return [
      {
        id: ulid.ulid(),
        semester_id: semester.id,
        type: 'midterm',
        start_at: dayjs(`${referenceDate.year()}-${(referenceDate.month() + 1).toString().padStart(2, '0')}-01T00:00:00.000+07:00`).toISOString(),
        end_at: dayjs(`${referenceDate.year()}-${(referenceDate.month() + 1).toString().padStart(2, '0')}-05T23:59:59.999+07:00`).toISOString(),
        created_at: dayjs().toISOString()
      },
      {
        id: ulid.ulid(),
        semester_id: semester.id,
        type: 'final',
        start_at: dayjs(`${referenceDate.year()}-${(referenceDate.month() + 1).toString().padStart(2, '0')}-25T00:00:00.000+07:00`).toISOString(),
        end_at: dayjs(`${referenceDate.year()}-${(referenceDate.month() + 1).toString().padStart(2, '0')}-${referenceDate.endOf('month').date().toString().padStart(2, '0')}T23:59:59.999+07:00`).toISOString(),
        created_at: dayjs().toISOString()
      }
    ]
  }).flat()
}
