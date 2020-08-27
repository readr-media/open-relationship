//const { access } = require('./Permission.js');
const { Select, Text, Relationship, DateTime, Integer } = require('@keystonejs/fields');
const { atTracking } = require('@keystonejs/list-plugins');

module.exports = {
  //label: "組織（企業）依附關係",
  //plural: "組織（企業）依附關係",
  fields: {
    people1: { label: "組織", type: Relationship, many: false, ref: 'Organization' },
    people2: { label: "組織", type: Relationship, many: false, ref: 'Organization' },
    relationship: { label: "關係", type: Text},
    start_date: { label: "開始日期", type: Text},
    end_date: { label: "結束日期", type: Text},
    //identifiers: { label: "identifiers", type: Relationship, many: false, ref: 'User',  isRequired: true},
  },
  /*
  access: {
    read: access.everyone,
    update: access.userIsExecutor,
    create: access.userIsExecutor,
    delete: access.userIsAdmin,
    auth: true,
  },
  */
  plugins: [
	atTracking({
	  createdAtField: "createAt",
	  updatedAtField: "updateAt",
	  format: "YYYY/MM/DD h:mm A",
	}),
  ],
};
