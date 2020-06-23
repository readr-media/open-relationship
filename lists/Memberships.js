//const { access } = require('./Permission.js');
const { Select, Text, Relationship, DateTime, Integer } = require('@keystonejs/fields');
const { atTracking } = require('@keystonejs/list-plugins');

module.exports = {
  label: "組織/機構",
  plural: "組織/機構",
  fields: {
    label: { label: "名稱", type: Text, isRequired: true},
    role: { label: "職稱", type: Text},
    member: { label: "member", type: Relationship, many: false, ref: 'Ppl' },
    organization: { label: "組織", type: Relationship, many: false, ref: 'Organization' },
    posts: { label: "posts", type: Relationship, many: false, ref: 'Post' },
    on_behalf_of_id: { label: "on_behalf_of_id", type: Text},
    area: { label: "地區", type: Relationship, many: false, ref: 'Area' },
    start_date: { label: "start_date", type: DateTime },
    end_date: { label: "end_date", type: DateTime },
    contact_details: { label: "contact_details", type: Relationship, many: false, ref: 'Contact_detail' },
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
