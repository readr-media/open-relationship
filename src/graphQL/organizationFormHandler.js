import { mergeDate } from '../utils/fieldVerify'

export const moveGqlToForm = (organization, target) => {
  organization.name.value = target.name
  organization.alternative.value = target.alternative
  organization.other_names.value = target.other_names
  organization.identifiers.value = target.identifiers
  organization.classification.value = target.classification

  organization.abstract.value = target.abstract
  organization.description.value = target.description
  organization.founding_date.value = mergeDate(
    target.founding_date_year,
    target.founding_date_month,
    target.founding_date_day
  )
  organization.dissolution_date.value = mergeDate(
    target.dissolution_date_year,
    target.dissolution_date_month,
    target.dissolution_date_day
  )
  organization.image.value = target.image
  organization.contact_details.value = target.contact_details
  organization.links.value = target.links
  organization.address.value = target.address
  organization.source.value = target.source
  organization.tags.value = target.tags
}
