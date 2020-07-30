//const { access } = require('./Permission.js');
const { Select, Text, Relationship, DateTime, Integer } = require('@keystonejs/fields');
const { atTracking } = require('@keystonejs/list-plugins');

module.exports = {
  label: "人物",
  plural: "人物",
  fields: {
    name: { label: "名", type: Text, isRequired: true},
    family_name: { label: "姓", type: Text},
    other_name: { label: "其他名稱", type: Text},
    identifiers: { label: "identifiers", type: Text},
    given_name: { label: "given_name", type: Text},
    email: { label: "email", type: Text},
    gender: { label: "性別", type: Text},
    birth_date: { label: "生日", type: DateTime },
    death_date: { label: "death_date", type: DateTime },
    image: { label: "image", type: Text},
    summary: { label: "summary", type: Text},
    biography: { label: "生平", type: Text},
    national_identity: { label: "national_identity", type: Text},
    contact_details: { label: "contact_details", type: Relationship, many: false, ref: 'Contact_detail' },
    links: { label: "相關連結", type: Text},
    memberships: { label: "memberships", type: Relationship, many: true, ref: 'Membership' },
    motions: { label: "motions", type: Relationship, many: true, ref: 'Motion' },
    speeches: { label: "speeches", type: Text},
    votes: { label: "votes", type: Text},
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
