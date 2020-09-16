//const { access } = require('./Permission.js');
const { Select, Text, Relationship, DateTime, Integer, Virtual } = require('@keystonejs/fields');
const { atTracking, byTracking } = require('@keystonejs/list-plugins');

module.exports = {
  fields: {
    name: { label: "姓名", type: Text, isRequired: true },
    alternative: { label: "別名", type: Text },
    other_names: { label: "舊名", type: Text },
    identifiers: { label: "ID", type: Text },
    email: { label: "電子信箱", type: Text },
    gender: { label: "生理性別", type: Text },
    birth_date: { label: "出生日期", type: DateTime },
    death_date: { label: "死亡日期", type: DateTime },
    image: { label: "大頭照", type: Text },
    summary: { label: "一句話描寫這個人", type: Text },
    biography: { label: "詳細生平", type: Text },
    national_identity: { label: "國籍", type: Text },
    contact_details: { label: "聯絡方式", type: Relationship, many: false, ref: 'Contact_detail' },
    links: { label: "相關連結", type: Text },
    source: { label: "來源", type: Text },
    mapping: {
      type: Virtual,
      resolver: item => `${item.name} ${item.birth_date}`,
    }
  },
  plugins: [
    atTracking(),
    byTracking(),
  ],
  plural: "Peoples"
};
