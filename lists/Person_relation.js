const { Text, Relationship, CalendarDay } = require('@keystonejs/fields');
const { atTracking, byTracking } = require('@keystonejs/list-plugins');

module.exports = {
  fields: {
    person_id: { label: "姓名", type: Relationship, many: false, ref: 'Person' },
    related_person_id: { label: "關係者姓名", type: Relationship, many: false, ref: 'Person' },
    relative: { label: "關係者如何稱呼該人物", type: Text },
    start_date: { label: "關係開始時間", type: CalendarDay },
    end_date: { label: "關係結束時間", type: CalendarDay },
    source: { label: "資料來源", type: Text },
  },
  plugins: [
    atTracking(),
    byTracking(),
  ],
};
