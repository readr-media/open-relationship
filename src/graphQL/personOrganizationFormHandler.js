import { mergeDate } from '../utils/fieldVerify'

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
