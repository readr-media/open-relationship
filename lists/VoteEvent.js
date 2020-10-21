// const { access } = require('./Permission.js');
const { Text } = require('@keystonejs/fields')
const { atTracking } = require('@keystonejs/list-plugins')

module.exports = {
  label: '選舉',
  plural: '選舉',
  fields: {
    organization: { label: '組織', type: Text, isRequired: true },
    legislative_session: { label: 'legislative_session', type: Text },
    identifier: { label: 'identifier', type: Text },
    motion: { label: 'motion', type: Text },
    classification: { label: '類別', type: Text },
    start_date: { label: '開始日期', type: Text },
    end_date: { label: '結束日期', type: Text },
    result: { label: '結果', type: Text },
    group_results: { label: 'group_results', type: Text },
    counts: { label: 'counts', type: Text },
    votes: { label: 'votes', type: Text },
    // identifiers: { label: "identifiers", type: Relationship, many: false, ref: 'User',  isRequired: true},
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
      createdAtField: 'createAt',
      updatedAtField: 'updateAt',
      format: 'YYYY/MM/DD h:mm A',
    }),
  ],
}
