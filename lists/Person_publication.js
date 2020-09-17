const { Text, Relationship } = require('@keystonejs/fields');
const { atTracking, byTracking } = require('@keystonejs/list-plugins');

module.exports = {
  fields: {
    person_id: { label: "姓名", type: Relationship, many: false, ref: 'Person' },
    organization_id: { label: "組織名稱", type: Relationship, many: false, ref: 'Organization' },
    publication: { label: "著作名稱", type: Text },
    published_date: { label: "發表時間", type: Text },
    category: { label: "類型", type: Text },
    attachment: { label: "附件", type: Text },
    source: { label: "資料來源", type: Text },
  },
  plugins: [
    atTracking(),
    byTracking(),
  ],
};
