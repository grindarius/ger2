import dayjs from 'dayjs'
import ulid from 'ulid'

export const generateSemester = (academicYears) => {
  academicYears.map(year => {
    return Array.from({ length: 3 }, (_, i) => {
      return {
        id: ulid.ulid(),
        academic_year_id: year.id,
        start_at: dayjs(year.start_at).add(i, 'month').toISOString(),
        end_at: dayjs(year.start_at).add(i, 'month').endOf('month').toISOString(),
        created_at: dayjs().toISOString()
      }
    })
  }).flat()
}
