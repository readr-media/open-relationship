const { Text, Relationship, CalendarDay } = require('@keystonejs/fields');
const { atTracking, byTracking } = require('@keystonejs/list-plugins');

module.exports = {
  fields: {
    person_id: { label: "姓名", type: Relationship, many: false, ref: 'Person' },
    organization_id: { label: "組織名稱", type: Relationship, many: false, ref: 'Organization' },
    role: { label: "職位名稱", type: Text },
    start_date: { label: "起始時間", type: CalendarDay },
    end_date: { label: "結束時間", type: CalendarDay },
    source: { label: "資料來源", type: Text },
  },
  plugins: [
    atTracking(),
    byTracking(),
  ],
  labelResolver: item => `${item.person_id}+${item.organization_id}`,
};
