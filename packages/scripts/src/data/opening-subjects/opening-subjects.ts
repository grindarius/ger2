import { faker } from '@faker-js/faker'
import { ulid } from 'ulid'
import {
  NewMajorSubjectGroups,
  NewMajorSubjects,
  NewOpeningSubjects,
  NewSemesterTerms,
  NewStudents
} from '../../types/index.js'

const studyableSubjects = (
  majorSubjects: Array<NewMajorSubjects>,
  majorSubjectGroups: Array<NewMajorSubjectGroups>,
  majorId: string
): Array<string> => {
  const allMajorSubjectGroupsMatchingMajorId = majorSubjectGroups.filter(
    m => m.major_id === majorId
  )

  const filteredMajorSubjectsMatchingMajorSubjectGroupId: Array<NewMajorSubjects> = []
  for (const majorSubjectGroup of allMajorSubjectGroupsMatchingMajorId) {
    for (const majorSubject of majorSubjects) {
      if (majorSubjectGroup.id === majorSubject.major_subject_group_id) {
        filteredMajorSubjectsMatchingMajorSubjectGroupId.push(majorSubject)
      }
    }
  }

  return filteredMajorSubjectsMatchingMajorSubjectGroupId.map(f => f.subject_id)
}

export const generateOpeningSubjects = (
  students: Array<NewStudents>,
  majorSubjectGroups: Array<NewMajorSubjectGroups>,
  majorSubjects: Array<NewMajorSubjects>,
  semesterTerms: Array<NewSemesterTerms>
): Array<NewOpeningSubjects> => {
  const openingSubjects: Array<NewOpeningSubjects> = []

  // to create opening subjects in each major id
  // You will need
  // - list of major_id (to find semester_term_id)
  // - list of studyable subject ids from the major that a student studies

  const studentsMajorIdList = new Set(students.map(s => s.major_id))

  for (const term of semesterTerms) {
    for (const majorId of studentsMajorIdList) {
      const subjects = studyableSubjects(majorSubjects, majorSubjectGroups, majorId)
      openingSubjects.push({
        id: ulid(),
        semester_term_id: term.id,
        subject_id: faker.helpers.arrayElement(subjects),
        subject_capacity: 1000,
        grading_criteria: '{"A":80,"B+":75,"B":70,"C+":65,"C":60,"D+":55,"D":50,"F":40}'
      })
    }
  }

  return openingSubjects
}
