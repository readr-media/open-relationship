const { Text, Relationship, Integer } = require("@keystonejs/fields");
const { atTracking, byTracking } = require("@keystonejs/list-plugins");

module.exports = {
  fields: {
    person_id: {
      label: "姓名",
      type: Relationship,
      many: false,
      ref: "Person",
    },
    election_year_year: { label: "選舉年", type: Integer },
    election_year_month: { label: "選舉月", type: Integer },
    election_year_day: { label: "選舉日", type: Integer },
    election_name: { label: "選舉名稱", type: Text },
    party: { label: "推薦政黨", type: Text },

    legislatoratlarge_number: { label: "不分區立委排序", type: Text },
    number: { label: "號次", type: Text },
    electoral_district: { label: "選區", type: Text },
    votes_obtained_number: { label: "得票數", type: Text },
    votes_obtained_percentage: { label: "得票率", type: Text },
    elected: { label: "是否當選", type: Text },
    incumbent: { label: "是否現任", type: Text },
    source: { label: "資料來源", type: Text },
  },
  plugins: [atTracking(), byTracking()],
};
