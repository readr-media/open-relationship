import { devideDate, mergeDate } from '../utils/fieldVerify'
import { handleRelationMany } from '~/utils'

export const moveFormToGqlVariable = (organization) => {
  const {
    name,
    alternative,
    // eslint-disable-next-line camelcase
    other_names,
    // eslint-disable-next-line no-unused-vars
    identifiers,
    classification,

    abstract,
    description,
    // eslint-disable-next-line camelcase
    founding_date,
    // eslint-disable-next-line camelcase
    dissolution_date,
    image,
    // eslint-disable-next-line camelcase
    contact_details,
    links,
    address,
    source,
    tags,
  } = organization

  return {
    // put form data to graphql's field
    name: name.value,
    alternative: alternative.value,
    other_names: other_names.value,
    identifiers: other_names.identifiers,
    classification: classification.value,

    abstract: abstract.value,
    description: description.value,
    founding_date_year: devideDate(founding_date.value, 'year'),
    founding_date_month: devideDate(founding_date.value, 'month'),
    founding_date_day: devideDate(founding_date.value, 'day'),
    dissolution_date_year: devideDate(dissolution_date.value, 'year'),
    dissolution_date_month: devideDate(dissolution_date.value, 'month'),
    dissolution_date_day: devideDate(dissolution_date.value, 'day'),
    image: image.value,
    contact_details: contact_details.value,
    links: links.value,
    address: address.value,
    source: source.value,
    tags: handleRelationMany(tags.value),
  }
}

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
