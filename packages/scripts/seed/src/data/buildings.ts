import type { buildings } from '@ger2/database'
import type { InferInsertModel } from 'drizzle-orm'

export const seedBuildings: Array<InferInsertModel<typeof buildings>> = [
  {
    id: '00000001Z2SGF25YCHAEPTHT18',
    name: 'Northern A building',
    coordinates: {
      y: 16.74801024979423,
      x: 100.19337813440156
    },
    floors: 1,
    buildingCreatedAt: '2001-05-31:08:00:00.000+0700',
    createdAt: '2018-04-12T12:04:48.994+0700',
    updatedAt: '2018-04-12T12:04:48.994+0700'
  },
  {
    id: '00000001Z21GZVG63SBH3ZNWZ9',
    name: 'Faculty of Science building',
    coordinates: {
      y: 16.746196109830183,
      x: 100.18928970343941
    },
    floors: 1,
    buildingCreatedAt: '2001-05-31:08:00:00.000+0700',
    createdAt: '2018-04-12T12:04:48.994+0700',
    updatedAt: '2018-04-12T12:04:48.994+0700'
  }
]
