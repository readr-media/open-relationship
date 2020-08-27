//const { access } = require('./Permission.js');
const { Select, Text, Relationship, DateTime, Integer } = require('@keystonejs/fields');
const { atTracking } = require('@keystonejs/list-plugins');

module.exports = {
  //label: "成員",
  //plural: "成員",
  fields: {
    label: { label: "名稱", type: Text, isRequired: true},
    role: { label: "職稱", type: Text},
    member: { label: "成員", type: Relationship, many: false, ref: 'ppl' },
    organization: { label: "組織", type: Relationship, many: false, ref: 'Organization' },
    posts: { label: "職稱", type: Relationship, many: false, ref: 'Post' },
    on_behalf_of_id: { label: "on_behalf_of_id", type: Text},
    area: { label: "地區", type: Relationship, many: false, ref: 'Area' },
    start_date: { label: "起始日期", type: DateTime },
    end_date: { label: "結束日期", type: DateTime },
    //contact_details: { label: "contact_details", type: Relationship, many: false, ref: 'Contact_detail' },
    links: { label: "相關連結", type: Text},
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
