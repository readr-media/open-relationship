//const { access } = require('./Permission.js');
const { Select, Text, Relationship, DateTime, Integer } = require('@keystonejs/fields');
const { atTracking } = require('@keystonejs/list-plugins');

module.exports = {
  //label: "人物",
  //plural: "人物",
  fields: {
    name: { label: "姓名", type: Text, isRequired: true},
    alternative_name: { label: "其他名字", type: Text},
    former_name: { label: "其他名稱", type: Text},
    identifiers: { label: "identifiers", type: Text},
    email: { label: "email", type: Text},
    gender: { label: "性別", type: Text},
    birth_date: { label: "生日", type: DateTime },
    death_date: { label: "death_date", type: DateTime },
    image: { label: "照片網址", type: Text},
    summary: { label: "生平綱要", type: Text},
    biography: { label: "生平", type: Text},
    national_identity: { label: "national_identity", type: Text},
    //contact_details: { label: "contact_details", type: Relationship, many: false, ref: 'Contact_detail' },
    links: { label: "相關連結", type: Text},
    //memberships: { label: "memberships", type: Relationship, many: true, ref: 'Membership' },
    //motions: { label: "行動", type: Relationship, many: true, ref: 'Motion' },
    //speeches: { label: "speeches", type: Text},
    //votes: { label: "選舉", type: Relationship, many: true, ref: 'Vote' },
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
