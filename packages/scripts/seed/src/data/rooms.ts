import type { rooms } from '@ger2/database'
import type { InferInsertModel } from 'drizzle-orm'

export const seedNorthernABuildingRooms: Array<InferInsertModel<typeof rooms>> = [
  {
    id: '00000001Z27TSF5AJSSMMM7QM2',
    buildingId: '00000001Z2SGF25YCHAEPTHT18',
    name: 'NA-11',
    type: 'study',
    capacity: 60,
    floor: 1,
    createdAt: '2018-04-13T18:12:59.483+0700',
    updatedAt: '2018-04-13T18:12:59.483+0700'
  },
  {
    id: '00000001Z2B6AT3G5ES1C8PFNX',
    buildingId: '00000001Z2SGF25YCHAEPTHT18',
    name: 'NA-12',
    type: 'study',
    capacity: 60,
    floor: 1,
    createdAt: '2018-04-13T18:12:59.483+0700',
    updatedAt: '2018-04-13T18:12:59.483+0700'
  },
  {
    id: '00000001Z2SKRT1R3H5TBFSWVJ',
    buildingId: '00000001Z2SGF25YCHAEPTHT18',
    name: 'NA-13',
    type: 'study',
    capacity: 60,
    floor: 1,
    createdAt: '2018-04-13T18:12:59.483+0700',
    updatedAt: '2018-04-13T18:12:59.483+0700'
  },
  {
    id: '00000001Z2N87H7P4WGC3E9444',
    buildingId: '00000001Z2SGF25YCHAEPTHT18',
    name: 'NA-14',
    type: 'study',
    capacity: 60,
    floor: 1,
    createdAt: '2018-04-13T18:12:59.483+0700',
    updatedAt: '2018-04-13T18:12:59.483+0700'
  },
  {
    id: '00000001Z21P668FWQAR2ZEXJ1',
    buildingId: '00000001Z2SGF25YCHAEPTHT18',
    name: 'NA-15',
    type: 'study',
    capacity: 60,
    floor: 1,
    createdAt: '2018-04-13T18:12:59.483+0700',
    updatedAt: '2018-04-13T18:12:59.483+0700'
  },
  {
    id: '00000001Z2QKWVQZR0ETDXRBMK',
    buildingId: '00000001Z2SGF25YCHAEPTHT18',
    name: 'NA-16',
    type: 'study',
    capacity: 60,
    floor: 1,
    createdAt: '2018-04-13T18:12:59.483+0700',
    updatedAt: '2018-04-13T18:12:59.483+0700'
  }
]

export const seedSCBuildingRooms: Array<InferInsertModel<typeof rooms>> = [
  {
    id: '00000001Z2TJJXFFYSVRQ40DPA',
    buildingId: '00000001Z21GZVG63SBH3ZNWZ9',
    name: 'SC1-100',
    type: 'study',
    capacity: 60,
    floor: 1,
    createdAt: '2018-04-13T18:12:59.483+0700',
    updatedAt: '2018-04-13T18:12:59.483+0700'
  },
  {
    id: '00000001Z2HMG3MV229PVQBH11',
    buildingId: '00000001Z21GZVG63SBH3ZNWZ9',
    name: 'SC1-101',
    type: 'study',
    capacity: 60,
    floor: 1,
    createdAt: '2018-04-13T18:12:59.483+0700',
    updatedAt: '2018-04-13T18:12:59.483+0700'
  },
  {
    id: '00000001Z2W5K70BSX8M0G8P72',
    buildingId: '00000001Z21GZVG63SBH3ZNWZ9',
    name: 'SC1-102',
    type: 'study',
    capacity: 60,
    floor: 1,
    createdAt: '2018-04-13T18:12:59.483+0700',
    updatedAt: '2018-04-13T18:12:59.483+0700'
  },
  {
    id: '00000001Z22MEJMYTVX3EVAAZH',
    buildingId: '00000001Z21GZVG63SBH3ZNWZ9',
    name: 'SC1-103',
    type: 'lab',
    capacity: 60,
    floor: 1,
    createdAt: '2018-04-13T18:12:59.483+0700',
    updatedAt: '2018-04-13T18:12:59.483+0700'
  },
  {
    id: '00000001Z2AJ2EZREJG75HQ1N1',
    buildingId: '00000001Z21GZVG63SBH3ZNWZ9',
    name: 'SC1-104',
    type: 'lab',
    capacity: 60,
    floor: 1,
    createdAt: '2018-04-13T18:12:59.483+0700',
    updatedAt: '2018-04-13T18:12:59.483+0700'
  },
  {
    id: '00000001Z2J7M1PNBXGC0BNDGG',
    buildingId: '00000001Z21GZVG63SBH3ZNWZ9',
    name: 'SC1-105',
    type: 'lab',
    capacity: 60,
    floor: 1,
    createdAt: '2018-04-13T18:12:59.483+0700',
    updatedAt: '2018-04-13T18:12:59.483+0700'
  }
]

export const seedRooms = seedNorthernABuildingRooms.concat(seedSCBuildingRooms)
