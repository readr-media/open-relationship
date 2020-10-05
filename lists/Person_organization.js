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
    organization_id: {
      label: "組織名稱",
      type: Relationship,
      many: false,
      ref: "Organization",
    },
    start_date_year: { label: "開始年", type: Integer },
    start_date_month: { label: "開始月", type: Integer },
    start_date_day: { label: "開始日", type: Integer },

    end_date_year: { label: "結束年", type: Integer },
    end_date_month: { label: "結束月", type: Integer },
    end_date_day: { label: "結束日", type: Integer },
    source: { label: "資料來源", type: Text },
  },
  plugins: [atTracking(), byTracking()],
  labelResolver: (item) => `${item.person_id}+${item.organization_id}`,
};
