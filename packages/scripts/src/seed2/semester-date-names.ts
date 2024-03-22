import { faker } from '@faker-js/faker'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat.js'
import timezone from 'dayjs/plugin/timezone.js'
import utc from 'dayjs/plugin/utc.js'
import type { NewSemesterDateNames } from '../types/index.js'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(customParseFormat)

const getDateStringBetween = (from: string, to: string): string => {
  const generatedDate = faker.date.between({ from, to })
  return dayjs.tz(generatedDate, 'Asia/Bangkok').format('YYYY-MM-DDTHH:mm:ss.SSSZZ')
}

export const semesterDateNames: Array<NewSemesterDateNames> = [
  {
    id: '00000001Z36TPMRWDARQR4PZ75',
    name: 'Online registration for first year students',
    created_at: getDateStringBetween('2019-01-01', '2019-03-01'),
    updated_at: getDateStringBetween('2019-01-01', '2019-03-01')
  },
  {
    id: '00000001Z35NJEPJJTGYVYKKGF',
    name: 'Online registration for second year students',
    created_at: getDateStringBetween('2019-01-01', '2019-03-01'),
    updated_at: getDateStringBetween('2019-01-01', '2019-03-01')
  },
  {
    id: '00000001Z37P1Y4M9EHNAJDC19',
    name: 'Online registration for third year students',
    created_at: getDateStringBetween('2019-01-01', '2019-03-01'),
    updated_at: getDateStringBetween('2019-01-01', '2019-03-01')
  },
  {
    id: '00000001Z39P4ZK1S1ATTX1KWC',
    name: 'Online registration for fourth year students',
    created_at: getDateStringBetween('2019-01-01', '2019-03-01'),
    updated_at: getDateStringBetween('2019-01-01', '2019-03-01')
  },
  {
    id: '00000001Z3Y1QMZQ8N3W0S54V7',
    name: 'Online registration for other year students',
    created_at: getDateStringBetween('2019-01-01', '2019-03-01'),
    updated_at: getDateStringBetween('2019-01-01', '2019-03-01')
  },
  {
    id: '00000001Z3AJ71H98T5STE3QX2',
    name: 'New student registration',
    created_at: getDateStringBetween('2019-01-01', '2019-03-01'),
    updated_at: getDateStringBetween('2019-01-01', '2019-03-01')
  },
  {
    id: '00000001Z34C82HGT4HWDTY418',
    name: 'New student orientation: University level',
    created_at: getDateStringBetween('2019-01-01', '2019-03-01'),
    updated_at: getDateStringBetween('2019-01-01', '2019-03-01')
  },
  {
    id: '00000001Z2FYFG7S0KHWQA8VD0',
    name: 'Dormitory registration',
    created_at: getDateStringBetween('2019-01-01', '2019-03-01'),
    updated_at: getDateStringBetween('2019-01-01', '2019-03-01')
  },
  {
    id: '00000001Z3G4RE4E286YB8YVZN',
    name: 'Registration payment',
    created_at: getDateStringBetween('2019-01-01', '2019-03-01'),
    updated_at: getDateStringBetween('2019-01-01', '2019-03-01')
  },
  {
    id: '00000001Z304GDM5QX3CXPB07A',
    name: 'Student subject reviewing',
    created_at: getDateStringBetween('2019-01-01', '2019-03-01'),
    updated_at: getDateStringBetween('2019-01-01', '2019-03-01')
  },
  {
    id: '00000001Z3ZBDWH7CB30NYQYH3',
    name: 'Midterm exam',
    created_at: getDateStringBetween('2019-01-01', '2019-03-01'),
    updated_at: getDateStringBetween('2019-01-01', '2019-03-01')
  },
  {
    id: '00000001Z3W05GZWR27085CTT9',
    name: 'Final exam',
    created_at: getDateStringBetween('2019-01-01', '2019-03-01'),
    updated_at: getDateStringBetween('2019-01-01', '2019-03-01')
  },
  {
    id: '00000001Z36BJ8FGB12VPWCKY6',
    name: 'Semester open',
    created_at: getDateStringBetween('2019-01-01', '2019-03-01'),
    updated_at: getDateStringBetween('2019-01-01', '2019-03-01')
  },
  {
    id: '00000001Z3JG6FC4HYXF5ZD732',
    name: 'Semester break',
    created_at: getDateStringBetween('2019-01-01', '2019-03-01'),
    updated_at: getDateStringBetween('2019-01-01', '2019-03-01')
  }
]
