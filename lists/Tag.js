const { Text } = require('@keystonejs/fields')
const { atTracking } = require('@keystonejs/list-plugins')

module.exports = {
  fields: {
    name: {
      type: Text,
      label: '名稱',
      isRequired: true,
      isUnique: true,
    },
  },
  plugins: [atTracking()],
  plural: 'Tags',
}
