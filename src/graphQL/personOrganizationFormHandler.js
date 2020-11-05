/* eslint-disable camelcase */
import { devideDate, mergeDate } from '../utils/fieldVerify'
import { handleRelationMany } from '~/utils'

export const moveFormToGqlVariable = (person) => {
  const {
    person_id,
    organization_id,
    role,
    start_date,
    end_date,
    source,
    tags,
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
    tags: handleRelationMany(tags.value),
  }
}

export const moveGqlToForm = (personOrganization, targetPersonOrganization) => {
  personOrganization.person_id.value.id = targetPersonOrganization.person_id.id
  personOrganization.person_id.value.name =
    targetPersonOrganization.person_id.name

  personOrganization.organization_id.value.id =
    targetPersonOrganization.organization_id.id
  personOrganization.organization_id.value.name =
    targetPersonOrganization.organization_id.name

  personOrganization.role.value = targetPersonOrganization.role

  personOrganization.start_date.value = mergeDate(
    targetPersonOrganization.start_date_year,
    targetPersonOrganization.start_date_month,
    targetPersonOrganization.start_date_day
  )
  personOrganization.end_date.value = mergeDate(
    targetPersonOrganization.end_date_year,
    targetPersonOrganization.end_date_month,
    targetPersonOrganization.end_date_day
  )
  personOrganization.source.value = targetPersonOrganization.source
  personOrganization.tags.value = targetPersonOrganization.tags
}
