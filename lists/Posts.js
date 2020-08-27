//const { access } = require('./Permission.js');
const { Select, Text, Relationship, DateTime, Integer } = require('@keystonejs/fields');
const { atTracking } = require('@keystonejs/list-plugins');

module.exports = {
  //label: "職稱",
  //plural: "職稱",
  fields: {
    label: { label: "名稱", type: Text, isRequired: true},
    other_label: { label: "其他名稱", type: Text},
    role: { label: "role", type: Text},
    organization: { label: "組織", type: Relationship, many: false, ref: 'Organization' },
    area: { label: "地區", type: Relationship, many: false, ref: 'Area' },
    start_date: { label: "起始日期", type: DateTime },
    end_date: { label: "結束日期", type: DateTime },
    //contact_details: { label: "聯絡人", type: Relationship, many: false, ref: 'Contact_detail' },
    links: { label: "相關連結", type: Text},
    //memberships: { label: "memberships", type: Relationship, many: false, ref: 'Membership' },
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
