import {
  academicYears,
  buildings,
  degrees,
  faculties,
  majors,
  programs,
  rooms
} from '@ger2/database'
import { seedAcademicYears } from './data/academic-years.js'
import { seedBuildings } from './data/buildings.js'
import { seedDegrees } from './data/degrees.js'
import { seedFaculties } from './data/faculties.js'
import { seedMajors } from './data/majors.js'
import { seedPrograms } from './data/programs.js'
import { seedRooms } from './data/rooms.js'
import { db } from './database.js'

await db.insert(academicYears).values(seedAcademicYears)
await db.insert(faculties).values(seedFaculties)
await db.insert(programs).values(seedPrograms)
await db.insert(degrees).values(seedDegrees)
await db.insert(majors).values(seedMajors)

await db.insert(buildings).values(seedBuildings)
await db.insert(rooms).values(seedRooms)
