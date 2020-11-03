const { Text, Relationship, Integer } = require('@keystonejs/fields')
const { atTracking, byTracking } = require('@keystonejs/list-plugins')

module.exports = {
  fields: {
    organization_id: {
      label: '組織名稱',
      type: Relationship,
      many: false,
      ref: 'Person',
    },
    election_year_year: { label: '選舉年', type: Integer },
    election_year_month: { label: '選舉月', type: Integer },
    election_year_day: { label: '選舉日', type: Integer },
    // election_name: { label: "選舉名稱", type: Text },

    number: { label: '號次', type: Text },
    votes_obtained_number: { label: '得票數', type: Text },
    seats: { label: '分配席次', type: Text },
    source: { label: '資料來源', type: Text },
  },
  plugins: [atTracking(), byTracking()],
}
