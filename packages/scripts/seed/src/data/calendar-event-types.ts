import type { calendarEventTypes } from '@ger2/database'
import type { InferInsertModel } from 'drizzle-orm'

export const seedCalendarEventTypes: Array<InferInsertModel<typeof calendarEventTypes>> = [
  {
    id: '00000001YNB8J4P3VVG8F701A1',
    slug: '1st-year-online-enroll',
    name: 'First year online enrollment.',
    createdAt: '2005-04-03T15:18:12.004+0700',
    updatedAt: '2005-04-03T15:18:12.004+0700'
  },
  {
    id: '00000001YNR9MKXAF84QTNKFV1',
    slug: '2nd-year-online-enroll',
    name: 'Second year online enrollment.',
    createdAt: '2005-04-03T15:18:12.004+0700',
    updatedAt: '2005-04-03T15:18:12.004+0700'
  },
  {
    id: '00000001YNKKHPXN858Z1FV5KK',
    slug: '3rd-year-online-enroll',
    name: 'Third year online enrollment.',
    createdAt: '2005-04-03T15:18:12.004+0700',
    updatedAt: '2005-04-03T15:18:12.004+0700'
  },
  {
    id: '00000001YN8475SVFQDPW46QWP',
    slug: '4th-year-online-enroll',
    name: 'Fourth year online enrollment.',
    createdAt: '2005-04-03T15:18:12.004+0700',
    updatedAt: '2005-04-03T15:18:12.004+0700'
  },
  {
    id: '00000001YNNKDVR90YDTRD3AF0',
    slug: 'other-years-online-enroll',
    name: 'Other years online enrollment.',
    createdAt: '2005-04-03T15:18:12.004+0700',
    updatedAt: '2005-04-03T15:18:12.004+0700'
  },
  {
    id: '00000001YNN30K48F64JC0C5C6',
    slug: '',
    name: '',
    createdAt: '',
    updatedAt: ''
  },
  {
    id: '00000001YNW4E5H76ARF47WPM6',
    slug: '',
    name: '',
    createdAt: '',
    updatedAt: ''
  }
]
