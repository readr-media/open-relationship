import { mergeDate } from '../utils/fieldVerify'

export const moveGqlToForm = (person, targetPerson) => {
  person.person_id.value.id = targetPerson.person_id.id
  person.person_id.value.name = targetPerson.person_id.name

  person.related_person_id.value.id = targetPerson.related_person_id.id
  person.related_person_id.value.name = targetPerson.related_person_id.name

  person.relative.value = targetPerson.relative

  person.start_date.value = mergeDate(
    targetPerson.start_date_year,
    targetPerson.start_date_month,
    targetPerson.start_date_day
  )
  person.end_date.value = mergeDate(
    targetPerson.end_date_year,
    targetPerson.end_date_month,
    targetPerson.end_date_day
  )
  person.source.value = targetPerson.source
  person.tags.value = targetPerson.tags
}
