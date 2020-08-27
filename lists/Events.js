//const { access } = require('./Permission.js');
const { Select, Text, Relationship, DateTime, Integer } = require('@keystonejs/fields');
const { atTracking } = require('@keystonejs/list-plugins');

module.exports = {
  //label: "事件",
  //plural: "事件",
  fields: {
    name: { label: "名稱", type: Text, isRequired: true},
    description: { label: "敘述", type: Text},
    start_date: { label: "start_date", type: Text},
    end_date: { label: "結束日期", type: Text},
    location: { label: "位置", type: Text},
    status: { label: "狀態", type: Text},
    identifier: { label: "identifier", type: Text},
    motion: { label: "motion", type: Text},
    classification: { label: "classification", type: Text},
    organization: { label: "組織", type: Text},
    attendees: { label: "參與者", type: Text},
    parent: { label: "主要活動", type: Text},
    children: { label: "附屬活動", type: Text},
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
