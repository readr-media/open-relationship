//const { access } = require('./Permission.js');
const { Select, Text, Relationship, DateTime, Integer } = require('@keystonejs/fields');
const { atTracking } = require('@keystonejs/list-plugins');

module.exports = {
  label: "組織/機構",
  plural: "組織/機構",
  fields: {
    name: { label: "名稱", type: Text, isRequired: true},
    other_name: { label: "其他名稱", type: Text},
    identifiers: { label: "identifiers", type: Text},
    classification: { label: "類型", type: Text},
    parent: { label: "上層組織", type: Relationship, many: false, ref: 'Organization' },
    children: { label: "附屬組織", type: Relationship, many: false, ref: 'Organization' },
    area: { label: "地區", type: Relationship, many: false, ref: 'Area' },
    abstract: { label: "概述", type: Text},
    description: { label: "描述", type: Text},
    founding_date: { label: "成立日期", type: Text},
    dissolution_date: { label: "dissolution_date", type: Text},
    image: { label: "image", type: Text},
    contact_details: { label: "聯絡人", type: Text},
    links: { label: "相關連結", type: Text},
    memberships: { label: "memberships", type: Relationship, many: true, ref: 'Memberships' },
    posts: { label: "posts", type: Relationship, many: true, ref: 'Posts' },
    motions: { label: "motions", type: Relationship, many: true, ref: 'Motions' },
    speeches: { label: "speeches", type: Text},
    vote_events: { label: "vote_events", type: Relationship, many: true, ref: 'Vote_events' },
    votes: { label: "votes", type: Relationship, many: true, ref: 'Votes' },
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
