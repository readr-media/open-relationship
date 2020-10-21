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
    related_person_id: {
      label: '關係者姓名',
      type: Relationship,
      many: false,
      ref: 'Person',
    },
    // person_id: { label: "姓名", type: Text },
    // related_person_id: { label: "關係者姓名", type: Text },

    relative: { label: '關係者如何稱呼該人物', type: Text },

    start_date_year: { label: '關係開始年', type: Integer },
    start_date_month: { label: '關係開始月', type: Integer },
    start_date_day: { label: '關係開始日', type: Integer },

    end_date_year: { label: '關係結束年', type: Integer },
    end_date_month: { label: '關係結束月', type: Integer },
    end_date_day: { label: '關係結束日', type: Integer },
    source: { label: '資料來源', type: Text },
  },
  plugins: [atTracking(), byTracking()],
}
