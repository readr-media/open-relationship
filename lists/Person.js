const { Text, Select, Integer, Relationship } = require('@keystonejs/fields')
const { atTracking, byTracking } = require('@keystonejs/list-plugins')

const genderOptions = [
  { value: 'F', label: '女' },
  { value: 'M', label: '男' },
  { value: 'NA', label: ' ' },
]

module.exports = {
  fields: {
    name: { label: '姓名', type: Text, isRequired: true },
    alternative: { label: '別名', type: Text },
    // other_names: { label: '舊名', type: Text },
    email: { label: '電子信箱', type: Text },
    gender: {
      label: '生理性別',
      type: Select,
      options: genderOptions,
      default: 'NA',
      dataType: 'string',
    },
    birth_date_year: { label: '出生年', type: Integer },
    birth_date_month: { label: '出生月', type: Integer },
    birth_date_day: { label: '出生日', type: Integer },

    death_date_year: { label: '死亡年', type: Integer },
    death_date_month: { label: '死亡月', type: Integer },
    death_date_day: { label: '死亡日', type: Integer },

    image: { label: '大頭照', type: Text },
    summary: { label: '一句話描寫這個人', type: Text },
    biography: { label: '詳細生平', type: Text, isMultiline: true },
    national_identity: { label: '國籍', type: Text },
    contact_details: { label: '聯絡方式', type: Text, isMultiline: true },
    links: { label: '網站', type: Text },
    tags: {
      label: 'Tag',
      type: Relationship,
      ref: 'Tag',
      many: true,
    },
    source: { label: '資料來源', type: Text },
  },
  plugins: [atTracking(), byTracking()],
  labelResolver: (item) => `${item.name}+${item.birth_date}`,
  plural: 'Persons',
}
