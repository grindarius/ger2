import dayjs from 'dayjs'
import ulid from 'ulid'

export const generateSemester = (academicYears) => {
  return academicYears.map(year => {
    const start = dayjs(year.start_at)

    return [
      {
        id: ulid.ulid(),
        academic_year_id: year.id,
        start_at: dayjs(`${start.get('year')}-03-01T00:00:00.000+07:00`).toISOString(),
        end_at: dayjs(`${start.get('year')}-04-30T23:59:59.999+07:00`).toISOString(),
        created_at: dayjs().toISOString()
      },
      {
        id: ulid.ulid(),
        academic_year_id: year.id,
        start_at: dayjs(`${start.get('year')}-06-01T00:00:00.000+07:00`).toISOString(),
        end_at: dayjs(`${start.get('year')}-07-31T23:59:59.999+07:00`).toISOString(),
        created_at: dayjs().toISOString()
      },
      {
        id: ulid.ulid(),
        academic_year_id: year.id,
        start_at: dayjs(`${start.get('year')}-09-01T00:00:00.000+07:00`).toISOString(),
        end_at: dayjs(`${start.get('year')}-10-31T23:59:59.999+07:00`).toISOString(),
        created_at: dayjs().toISOString()
      }
    ]
  }).flat()
}
