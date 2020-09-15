const { Keystone } = require('@keystonejs/keystone');
const { PasswordAuthStrategy } = require('@keystonejs/auth-password');
const { Text, Checkbox, Password } = require('@keystonejs/fields');
const { GraphQLApp } = require('@keystonejs/app-graphql');
const { AdminUIApp } = require('@keystonejs/app-admin-ui');
const initialiseData = require('./initial-data');

const { KnexAdapter: Adapter } = require('@keystonejs/adapter-knex');
const { app, database } = require('./configs/config')

const PROJECT_NAME = app.applicationName;
const adapterConfig = {
  dropDatabase: app.dropDatabase,
  knexOptions: {
    client: 'postgres',
    connection: `postgresql://${database.acc}:${database.pass}@${database.host}/${database.db}`,
  }
};

const keystone = new Keystone({
  adapter: new Adapter(adapterConfig),
  onConnect: process.env.CREATE_TABLES !== 'true' && initialiseData,
});

// Access control functions
const userIsAdmin = ({ authentication: { item: user } }) => Boolean(user && user.isAdmin);
const userOwnsItem = ({ authentication: { item: user } }) => {
  if (!user) {
    return false;
  }

  // Instead of a boolean, you can return a GraphQL query:
  // https://www.keystonejs.com/api/access-control#graphqlwhere
  return { id: user.id };
};

const userIsAdminOrOwner = auth => {
  const isAdmin = access.userIsAdmin(auth);
  const isOwner = access.userOwnsItem(auth);
  return isAdmin ? isAdmin : isOwner;
};

const access = { userIsAdmin, userOwnsItem, userIsAdminOrOwner };

keystone.createList('User', {
  fields: {
    name: { type: Text },
    email: {
      type: Text,
      isUnique: true,
    },
    isAdmin: {
      type: Checkbox,
      // Field-level access controls
      // Here, we set more restrictive field access so a non-admin cannot make themselves admin.
      access: {
        update: access.userIsAdmin,
      },
    },
    password: {
      type: Password,
    },
  },
  // List-level access controls
  access: {
    read: access.userIsAdminOrOwner,
    update: access.userIsAdminOrOwner,
    create: access.userIsAdmin,
    delete: access.userIsAdmin,
    auth: true,
  },
});

const authStrategy = keystone.createAuthStrategy({
  type: PasswordAuthStrategy,
  list: 'User',
});

module.exports = {
  keystone,
  apps: [
    new GraphQLApp(),
    new AdminUIApp({
      name: PROJECT_NAME,
      enableDefaultRoute: true,
      authStrategy,
    }),
  ],
};

const AreaSchema = require('./lists/Area.js');
const PeopleSchema = require('./lists/People.js');
const OrganizationSchema = require('./lists/Organizations.js');
const People_relationSchema = require('./lists/People_relation.js');
const People_organizationSchema = require('./lists/People_relation.js');
const Organization_relationSchema = require('./lists/Organization_relation.js');
const EventSchema = require('./lists/Events.js');
const PositionSchema = require('./lists/Posts.js');
const MembershipSchema = require('./lists/Memberships.js');
const CountSchema = require('./lists/Count.js');
const MotionSchema = require('./lists/Motions.js');
keystone.createList('Area', AreaSchema);
keystone.createList('ppl', PeopleSchema);
keystone.createList('Organization', OrganizationSchema);
keystone.createList('People_relation', People_relationSchema);
keystone.createList('People_organization', People_organizationSchema);
keystone.createList('Organization_relation', Organization_relationSchema);
keystone.createList('Event', EventSchema);
keystone.createList('Post', PositionSchema);
keystone.createList('Membership', MembershipSchema);
keystone.createList('Count', CountSchema);
keystone.createList('Motion', MotionSchema);
