const { Keystone } = require('@keystonejs/keystone');
const { PasswordAuthStrategy } = require('@keystonejs/auth-password');
//const { Select, Text, Checkbox, Password, Relationship, Integer, DateTime, Float } = require('@keystonejs/fields');
const { GraphQLApp } = require('@keystonejs/app-graphql');
const { AdminUIApp } = require('@keystonejs/app-admin-ui');
const { atTracking } = require('@keystonejs/list-plugins');
const initialiseData = require('./initial-data');
const { MongooseAdapter: Adapter } = require('@keystonejs/adapter-mongoose');
//const { access } = require('./lists/Permission.js');
const PROJECT_NAME = "open relationship";
const keystone = new Keystone({
  name: PROJECT_NAME,
  adapter: new Adapter(),
  onConnect: initialiseData,
});
/*
const userIsAdminOrOwner = auth => {
  const isAdmin = access.userIsAdmin(auth);
  const isOwner = access.userOwnsItem(auth);
  return isAdmin ? isAdmin : isOwner;
};
*/
module.exports = {
  keystone,
  apps: [
    new GraphQLApp(),
    new AdminUIApp({
      enableDefaultRoute: true,
      authStrategy,
    }),
  ],
};
//models
const Area = require('./lists/Area.js');
const Membership = require('./lists/Membership.js');
const Posts = require('./lists/Posts.js');
const People = require('./lists/People.js');
const Count = require('./lists/Count.js');
const Events = require('./lists/Events.js');
const Vote = require('./lists/Vote.js');
const Vote_event = require('./lists/Vote_event.js');
const Contact_detail = require('./lists/Contact_detail.js');
const Motions = require('./lists/Motions.js');
const Organizations = require('./lists/Organizations.js');
keystone.createList('Area', Area);
keystone.createList('Membership', Membership);
keystone.createList('Posts', Posts);
keystone.createList('People', People);
keystone.createList('Count', Count);
keystone.createList('Events', Events);
keystone.createList('Vote', Vote);
keystone.createList('Vote_event', Vote_event);
keystone.createList('Contact_detail', Count_detail);
keystone.createList('Motions', Motions);
keystone.createList('Oragnizations', People);
