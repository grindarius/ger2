import type { NewMajorSubjectGroups } from '../types/index.js'

// 1. Required subjects, min credit: 24
// 1.1 First half group, min credit: 16
// 1.2 Second group (not related to programming), min credit: 8

export const majorSubjectGroups: Array<NewMajorSubjectGroups> = [
  {
    id: '00000001YXWS7G8A8NC02W5Q5K',
    major_id: '00000001Z1H5VZ4GWWZQQR1915',
    parent_id: null,
    group_index: 1,
    name: 'Required subjects',
    minimum_credit: 24,
    created_at: '2013-01-01T04:38:48.948+0700',
    updated_at: '2013-01-01T04:38:48.948+0700'
  },
  {
    id: '00000001YXDJCQJBV4KY42ZDWF',
    major_id: '00000001Z1H5VZ4GWWZQQR1915',
    parent_id: '00000001YXWS7G8A8NC02W5Q5K',
    group_index: 1,
    name: 'Programming related subjects',
    minimum_credit: 16,
    created_at: '2013-01-01T04:38:48.948+0700',
    updated_at: '2013-01-01T04:38:48.948+0700'
  },
  {
    id: '00000001YX4MXSHZJGD1TDWR6Q',
    major_id: '00000001Z1H5VZ4GWWZQQR1915',
    parent_id: '00000001YXWS7G8A8NC02W5Q5K',
    group_index: 2,
    name: 'Subjects needed to graduate',
    minimum_credit: 8,
    created_at: '2013-01-01T04:38:48.948+0700',
    updated_at: '2013-01-01T04:38:48.948+0700'
  }
]
