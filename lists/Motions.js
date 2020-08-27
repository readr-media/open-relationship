//const { access } = require('./Permission.js');
const { Select, Text, Relationship, DateTime, Integer } = require('@keystonejs/fields');
const { atTracking } = require('@keystonejs/list-plugins');

module.exports = {
  //label: "行動",
  //plural: "行動",
  fields: {
    organization: { label: "組織", type: Text, isRequired: true},
    legislative_session: { label: "legislative_session", type: Text},
    creator: { label: "creator", type: Text},
    text: { label: "text", type: Text},
    identifier: { label: "identifier", type: Text},
    classification: { label: "classification", type: Text},
    date: { label: "日期", type: Text},
    requirement: { label: "requirement", type: Text},
    result: { label: "結果", type: Text},
    vote_events: { label: "vote_events", type: Text},
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
