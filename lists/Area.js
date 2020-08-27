//const { access } = require('./Permission.js');
const { Select, Text, Relationship, DateTime, Integer } = require('@keystonejs/fields');
const { atTracking } = require('@keystonejs/list-plugins');

module.exports = {
  //label: "地區",
  //plural: "地區",
  fields: {
    name: { label: "名稱", type: Text, isRequired: true},
    identifiers: { label: "identifiers", type: Text},
    classification: { label: "classification", type: Text},
    parent: { label: "parent", type: Relationship, many: false, ref: 'Area' },
    geometry: { label: "geometry", type: Text},
    //memberships: { label: "memberships", type: Relationship, many: false, ref: 'Membership' },
    organizations: { label: "組織", type: Relationship, many: true, ref: 'Organization' },
    posts: { label: "posts", type: Text},
    children: { label: "children", type: Relationship, many: true, ref: 'Area' },
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
