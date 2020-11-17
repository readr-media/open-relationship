import { cloneDeep } from 'lodash'
import { devideDate } from '~/utils/fieldVerify'

const getRandomId = (count) => Math.floor(Math.random() * count + 1)

const PERSON_RELATION_REVERSE_MAPPING = {
  person_id: 'related_person_id',
  related_person_id: 'person_id',
}

const FIELDS_NEED_SPLIT = [
  'birth_date',
  'death_date',
  'founding_date',
  'dissolution_date',
]

function buildGqlVariables(data, isReverseRelation = false) {
  const variable = {}
  const cloneData = cloneDeep(data)
  const needUpdateTags =
    Array.isArray(cloneData.tags?.value) &&
    cloneData.tags.value.filter((tag) => tag.action).length > 0
  if (!needUpdateTags) {
    delete cloneData.tags
  }
  Object.keys(cloneData)
    .filter((key) => key !== 'reverse_relative')
    .forEach((key) => {
      if (isReverseRelation && key === 'relative') {
        variable.relative = cloneData.reverse_relative.value
      } else if (
        isReverseRelation &&
        (key === 'person_id' || key === 'related_person_id')
      ) {
        variable[
          PERSON_RELATION_REVERSE_MAPPING[key]
        ] = convertToGqlVariablesValue(key, cloneData[key])
      } else if (
        cloneData[key].value == null ||
        cloneData[key].value?.length === 0
      ) {
        delete cloneData[key]
      } else if (FIELDS_NEED_SPLIT.some((field) => field === key)) {
        variable[`${key}_year`] = devideDate(cloneData[key].value, 'year')
        variable[`${key}_month`] = devideDate(cloneData[key].value, 'month')
        variable[`${key}_day`] = devideDate(cloneData[key].value, 'day')
      } else {
        variable[key] = convertToGqlVariablesValue(key, cloneData[key])
      }
    })
  return variable
}

function convertToGqlVariablesValue(formKey, formData) {
  switch (formKey) {
    case 'person_id':
    case 'organization_id':
    case 'related_person_id':
    case 'related_organization_id':
      return handleRelation(formData.value)
    case 'tags':
      return handleRelationMany(formData.value)
    default:
      return formData.value
  }
}

function handleRelation(item) {
  if (item.id) {
    return { connect: { id: item.id } }
  }
  return { create: { name: item.name } }
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
