const { Text, Relationship, Integer } = require('@keystonejs/fields')
const { atTracking, byTracking } = require('@keystonejs/list-plugins')

module.exports = {
  fields: {
    person_id: {
      label: '姓名',
      type: Relationship,
      many: false,
      ref: 'Person',
    },
    organization_id: {
      label: '組織',
      type: Relationship,
      many: false,
      ref: 'Organization',
    },
    publication: { label: '著作名稱', type: Text },
    published_date_year: { label: '發表年', type: Integer },
    published_date_month: { label: '發表月', type: Integer },
    published_date_day: { label: '發表日', type: Integer },
    category: { label: '類型', type: Text },
    attachment: { label: '附件', type: Text },
    source: { label: '資料來源', type: Text },
  },
  plugins: [atTracking(), byTracking()],
}
