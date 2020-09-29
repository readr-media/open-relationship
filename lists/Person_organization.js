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
    role: { label: "職位名稱", type: Text },
    // start_date: { label: "起始時間", type: CalendarDay },
    // end_date: { label: "結束時間", type: CalendarDay },
    start_date_year: { label: "關係開始年", type: Integer },
    start_date_month: { label: "關係開始月", type: Integer },
    start_date_day: { label: "關係開始日", type: Integer },

    end_date_year: { label: "關係結束年", type: Integer },
    end_date_month: { label: "關係結束月", type: Integer },
    end_date_day: { label: "關係結束日", type: Integer },
    source: { label: "資料來源", type: Text },
  },
  plugins: [atTracking(), byTracking()],
  labelResolver: (item) => `${item.person_id}+${item.organization_id}`,
};
