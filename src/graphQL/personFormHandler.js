import { mergeDate } from '../utils/fieldVerify'

export const moveGqlToForm = (person, targetPerson) => {
  person.name.value = targetPerson.name
  person.alternative.value = targetPerson.alternative
  person.other_names.value = targetPerson.other_names
  person.gender.value = targetPerson.gender
  person.email.value = targetPerson.email
  person.birth_date.value = mergeDate(
    targetPerson.birth_date_year,
    targetPerson.birth_date_month,
    targetPerson.birth_date_day
  )
  person.death_date.value = mergeDate(
    targetPerson.death_date_year,
    targetPerson.death_date_month,
    targetPerson.death_date_day
  )
  person.image.value = targetPerson.image
  person.summary.value = targetPerson.summary
  person.biography.value = targetPerson.biography
  person.national_identity.value = targetPerson.national_identity
  person.contact_details.value = targetPerson.contact_details
  person.links.value = targetPerson.links
  person.source.value = targetPerson.source
  person.tags.value = targetPerson.tags
}
