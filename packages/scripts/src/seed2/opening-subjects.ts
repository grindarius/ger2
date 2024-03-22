import type { NewOpeningSubjects } from '../types/index.js'

const gradingCriteria: Array<{ key: string; score: number }> = [
  {
    key: 'A',
    score: 80
  },
  {
    key: 'B+',
    score: 75
  },
  {
    key: 'B',
    score: 70
  },
  {
    key: 'C+',
    score: 65
  },
  {
    key: 'C',
    score: 60
  },
  {
    key: 'D+',
    score: 55
  },
  {
    key: 'D',
    score: 50
  },
  {
    key: 'F',
    score: 0
  }
]

export const openingSubjects: Array<NewOpeningSubjects> = [
  {
    id: '00000001YX1JTZQP2X95XRSGAK',
    subject_id: '00000001YX0GJMEY5Z77SWRTPZ',
    semester_id: '00000001Z2BKK7RRN3ZKGD1ERN',
    subject_capacity: 5,
    grading_criteria: JSON.stringify(gradingCriteria),
    created_at: '2019-06-24T00:00:00.000+0700',
    updated_at: '2019-06-24T00:00:00.000+0700'
  }
]
