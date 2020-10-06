import { devideDate, mergeDate } from '../utils/fieldVerify'
export const moveFormToGqlVariable = (person) => {
  const {
    // eslint-disable-next-line camelcase
    person_id,
    // eslint-disable-next-line camelcase
    organization_id,
    role,
    // eslint-disable-next-line camelcase
    start_date,
    // eslint-disable-next-line camelcase
    end_date,
    source,
  } = person

  return {
    // put form data to graphql's field
    person_id: person_id.value.id,
    organization_id: organization_id.value.id,
    role: role.value,

    start_date_year: devideDate(start_date.value, 'year'),
    start_date_month: devideDate(start_date.value, 'month'),
    start_date_day: devideDate(start_date.value, 'day'),
    end_date_year: devideDate(end_date.value, 'year'),
    end_date_month: devideDate(end_date.value, 'month'),
    end_date_day: devideDate(end_date.value, 'day'),

    source: source.value,
  }
}

export const moveGqlToForm = (person, target) => {
  person.person_id.value.id = target.person_id
  person.organization_id.value.id = target.organization_id
  person.role.value = target.role

  person.start_date.value = mergeDate(
    target.start_date_year,
    target.start_date_month,
    target.start_date_day
  )
  person.end_date.value = mergeDate(
    target.end_date_year,
    target.end_date_month,
    target.end_date_day
  )
  person.source.value = target.source
}
