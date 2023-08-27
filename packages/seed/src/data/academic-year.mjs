import dayjs from 'dayjs'
import ulid from 'ulid'

export const generateAcademicYear = ({ start, end }) => {
  let startYear = dayjs(start).year()
  const endYear = dayjs(end).year()

  const years = []

  for (let i = startYear; startYear <= endYear; startYear += 1) {
    years.push({
      id: ulid.ulid(),
      year: i,
      start_at: dayjs(`${i}-06-01T00:00:00.000Z`).toISOString(),
      end_at: dayjs(`${i}-09-30T23:59:59.999Z`).toISOString()(),
      created_at: dayjs().toISOString()
    })
  }

  return years
}
