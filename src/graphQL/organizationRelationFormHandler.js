import { mergeDate } from '../utils/fieldVerify'

export const moveGqlToForm = (organizationRelation, target) => {
  organizationRelation.organization_id.value.id = target.organization_id.id
  organizationRelation.organization_id.value.name = target.organization_id.name

  organizationRelation.related_organization_id.value.id =
    target.related_organization_id.id

  organizationRelation.related_organization_id.value.name =
    target.related_organization_id.name

  organizationRelation.relative.value = target.relative

  organizationRelation.start_date.value = mergeDate(
    target.start_date_year,
    target.start_date_month,
    target.start_date_day
  )
  organizationRelation.end_date.value = mergeDate(
    target.end_date_year,
    target.end_date_month,
    target.end_date_day
  )
  organizationRelation.source.value = target.source
  organizationRelation.tags.value = target.tags
}
