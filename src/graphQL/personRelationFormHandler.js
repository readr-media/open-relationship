import { devideDate, mergeDate } from '../utils/fieldVerify'
export const moveFormToGqlVariable = (person) => {
  const {
    // eslint-disable-next-line camelcase
    person_id,
    // eslint-disable-next-line camelcase
    related_person_id,
    relative,
    // eslint-disable-next-line camelcase
    start_date,
    // eslint-disable-next-line camelcase
    end_date,
    source,
  } = person

  return {
    // put form data to graphql's field
    person_id: person_id.value.id,
    related_person_id: related_person_id.value.id,
    relative: relative.value,

    start_date_year: devideDate(start_date.value, 'year'),
    start_date_month: devideDate(start_date.value, 'month'),
    start_date_day: devideDate(start_date.value, 'day'),
    end_date_year: devideDate(end_date.value, 'year'),
    end_date_month: devideDate(end_date.value, 'month'),
    end_date_day: devideDate(end_date.value, 'day'),

    source: source.value,
  }
}

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
}
