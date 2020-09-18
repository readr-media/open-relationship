const { Text, Relationship, CalendarDay } = require('@keystonejs/fields');
const { atTracking, byTracking } = require('@keystonejs/list-plugins');

module.exports = {
  fields: {
    organization_id: { label: "組織名稱", type: Relationship, many: false, ref: 'Organization' },
    related_organization_id: { label: "關係組織名稱", type: Relationship, many: false, ref: 'Organization' },
    relative: { label: "隸屬", type: Text },
    start_date: { label: "關係開始時間", type: CalendarDay },
    end_date: { label: "關係結束時間", type: CalendarDay },
    source: { label: "資料來源", type: Text },
  },
  plugins: [
    atTracking(),
    byTracking(),
  ],
};
