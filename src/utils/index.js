import { cloneDeep } from 'lodash'
import { devideDate } from '~/utils/fieldVerify'

const getRandomId = (count) => Math.floor(Math.random() * count + 1)

function buildGqlVariables(data) {
  const variable = {}
  const cloneData = cloneDeep(data)
  const needUpdateTags =
    Array.isArray(cloneData.tags?.value) &&
    cloneData.tags.value.filter((tag) => tag.action).length > 0
  if (!needUpdateTags) {
    delete cloneData.tags
  }
  Object.keys(cloneData).forEach((key) => {
    if (cloneData[key].value == null || cloneData[key].value?.length === 0) {
      delete cloneData[key]
    } else {
      variable[key] = convertToGqlVariablesValue(key, cloneData[key])
    }
  })
  return variable
}

function convertToGqlVariablesValue(formKey, formData) {
  switch (formKey) {
    case 'birth_date_year':
    case 'death_date_year':
    case 'founding_date_year':
    case 'dissolution_date_year':
      return devideDate(formData.value, 'year')
    case 'birth_date_month':
    case 'death_date_month':
    case 'founding_date_month':
    case 'dissolution_date_month':
      return devideDate(formData.value, 'month')
    case 'birth_date_day':
    case 'death_date_day':
    case 'founding_date_day':
    case 'dissolution_date_day':
      return devideDate(formData.value, 'day')
    case 'tags':
      return handleRelationMany(formData.value)
    default:
      return formData.value
  }
}

function handleRelationMany(items) {
  const data = {}
  const createItems = items.filter((item) => item.action === 'create')
  const connectItems = items.filter((item) => item.action === 'connect')
  const disconnectItems = items.filter((item) => item.action === 'disconnect')
  if (createItems.length > 0) {
    data.create = createItems.map((item) => ({ name: item.name }))
  }
  if (connectItems.length > 0) {
    data.connect = connectItems
      .filter((item) => item.id)
      .map((item) => ({ id: item.id }))
  }
  if (disconnectItems.length > 0) {
    data.disconnect = disconnectItems
      .filter((item) => item.id)
      .map((item) => ({ id: item.id }))
  }
  return data
}

export { buildGqlVariables, getRandomId, handleRelationMany }
