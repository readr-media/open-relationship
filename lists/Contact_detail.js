//const { access } = require('./Permission.js');
const { Select, Text, Relationship, DateTime, Integer } = require('@keystonejs/fields');
const { atTracking } = require('@keystonejs/list-plugins');

module.exports = {
  fields: {
    label: { label: "名稱", type: Text, isRequired: true },
    type: { label: "型態", type: Text },
    value: { label: "值", type: Text },
    note: { label: "註記", type: Text },
    valid_from: { label: "有效起始時間", type: DateTime },
    valid_until: { label: "有效截止時間", type: DateTime },
  },
  plugins: [
    atTracking({
      createdAtField: "createAt",
      updatedAtField: "updateAt",
      format: "YYYY/MM/DD h:mm A",
    }),
  ],
};
