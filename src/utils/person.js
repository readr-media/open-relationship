import { GENDER_MAPPING } from '~/constants'

function buildSearchItemInfo(item) {
  const gender = GENDER_MAPPING[item.gender]
  const birthdate = formatBirthdate(
    item.birth_date_year,
    item.birth_date_month,
    item.birth_date_day
  )
  const tags = item.tags.map((tag) => tag.name).join('、')
  const combined = [gender, birthdate, item.alternative, item.other_names, tags]
  return combined.filter((info) => info).join('、')
}

function formatBirthdate(year, month, day) {
  const formated = `${year}-${month}-${day}`
  const isEmpty = formated === 'null-null-null'
  return isEmpty ? null : formated
}

export { buildSearchItemInfo }
