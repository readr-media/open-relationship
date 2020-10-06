/* eslint-disable camelcase */
import { devideDate, mergeDate } from '../utils/fieldVerify'
export const moveFormToGqlVariable = (organization) => {
  const {
    // eslint-disable-next-line camelcase
    organization_id,
    related_organization_id,
    relative,
    start_date,
    end_date,

    source,
  } = organization

  return {
    // put form data to graphql's field
    organization_id: organization_id.value.id,
    related_organization_id: related_organization_id.value.id,
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

export const moveGqlToForm = (organization, target) => {
  organization.organization_id.value.id = target.organization_id
  organization.related_organization_id.value.id = target.related_organization_id
  organization.relative.value = target.relative

  organization.start_date.value = mergeDate(
    target.start_date_year,
    target.start_date_month,
    target.start_date_day
  )
  organization.end_date.value = mergeDate(
    target.end_date_year,
    target.end_date_month,
    target.end_date_day
  )
  organization.source.value = target.source
}
