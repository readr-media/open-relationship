//const { access } = require('./Permission.js');
const { Select, Text, Relationship, DateTime, Integer } = require('@keystonejs/fields');
const { atTracking } = require('@keystonejs/list-plugins');

module.exports = {
  label: "選舉",
  plural: "選舉",
  fields: {
    vote_event: { label: "選舉活動", type: Text, isRequired: true},
    voter: { label: "voter", type: Text},
    option: { label: "選項", type: Text},
    group: { label: "群組", type: Text},
    role: { label: "role", type: Text},
    weight: { label: "weight", type: Text},
    pair: { label: "搭檔", type: Relationship, many: false, ref: 'ppl' },
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
