import type { academicYears } from '@ger2/database'
import type { InferInsertModel } from 'drizzle-orm'

export const seedAcademicYears: Array<InferInsertModel<typeof academicYears>> = [
  {
    id: '00000001Z2QVZ4KJSWM09GWCQB',
    year: 2017,
    createdAt: '2018-01-12T12:18:15.448+0700',
    updatedAt: '2018-01-12T12:18:15.448+0700'
  },
  {
    id: '00000001Z2Z3XNC2V3EA4XDSPZ',
    year: 2018,
    createdAt: '2018-01-12T12:18:15.448+0700',
    updatedAt: '2018-01-12T12:18:15.448+0700'
  },
  {
    id: '00000001Z2H5MN7ZTJG8ZTPNXE',
    year: 2019,
    createdAt: '2018-01-12T12:18:15.448+0700',
    updatedAt: '2018-01-12T12:18:15.448+0700'
  },
  {
    id: '00000001Z283KVKEVGB2W5D1HA',
    year: 2020,
    createdAt: '2018-01-12T12:18:23.448+0700',
    updatedAt: '2018-01-12T12:18:23.448+0700'
  },
  {
    id: '00000001Z2XV4R8PWZM1DX816K',
    year: 2021,
    createdAt: '2018-01-12T12:19:11.448+0700',
    updatedAt: '2018-01-12T12:19:11.448+0700'
  },
  {
    id: '00000001Z2HTBH3GFQJRJR50JV',
    year: 2022,
    createdAt: '2018-01-13T12:19:11.448+0700',
    updatedAt: '2018-01-13T12:19:11.448+0700'
  },
  {
    id: '00000001Z2CEC8AHEXZAPHAHV3',
    year: 2023,
    createdAt: '2018-01-13T13:19:11.448+0700',
    updatedAt: '2018-01-13T13:19:11.448+0700'
  },
  {
    id: '00000001Z2WGXPBY8G8MXZGQ9A',
    year: 2024,
    createdAt: '2018-01-13T13:19:11.448+0700',
    updatedAt: '2018-01-13T13:19:11.448+0700'
  }
]
