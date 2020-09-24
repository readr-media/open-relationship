const { Keystone } = require("@keystonejs/keystone");
const { PasswordAuthStrategy } = require("@keystonejs/auth-password");
const { Text, Checkbox, Password } = require("@keystonejs/fields");
const { GraphQLApp } = require("@keystonejs/app-graphql");
const { AdminUIApp } = require("@keystonejs/app-admin-ui");
const { NuxtApp } = require("@keystonejs/app-nuxt");

const initialiseData = require("./initial-data");

const { KnexAdapter: Adapter } = require("@keystonejs/adapter-knex");
const { app, database, session } = require("./configs/config");

const PROJECT_NAME = app.applicationName;
const adapterConfig = {
  dropDatabase: app.dropDatabase,
  knexOptions: {
    client: "postgres",
    connection: `postgresql://${database.acc}:${database.pass}@${database.host}/${database.db}`,
  },
};

const keystone = new Keystone({
  adapter: new Adapter(adapterConfig),
  onConnect: process.env.CREATE_TABLES !== "true" && initialiseData,
  cookieSecret: session.cookieSecret,
  cookie: {
    // If it's explicitly configured to use insecure cookies, overwrite the default setting.
    // Anything else will be fallback to the default of true in production.
    secure:
      session.secure === false ? false : process.env.NODE_ENV === "production",
  },
});

// Access control functions
const userIsAdmin = ({ authentication: { item: user } }) =>
  Boolean(user && user.isAdmin);
const userOwnsItem = ({ authentication: { item: user } }) => {
  if (!user) {
    return false;
  }

  // Instead of a boolean, you can return a GraphQL query:
  // https://www.keystonejs.com/api/access-control#graphqlwhere
  return { id: user.id };
};

const userIsAdminOrOwner = (auth) => {
  const isAdmin = access.userIsAdmin(auth);
  const isOwner = access.userOwnsItem(auth);
  return isAdmin ? isAdmin : isOwner;
};

const access = { userIsAdmin, userOwnsItem, userIsAdminOrOwner };

keystone.createList("User", {
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
  list: "User",
});

module.exports = {
  keystone,
  apps: [
    new GraphQLApp(),
    new AdminUIApp({
      name: PROJECT_NAME,
      enableDefaultRoute: false,
      authStrategy,
    }),
    new NuxtApp({
      //equal to nuxt.config.js
      srcDir: "src",
      buildDir: "dist",
      telemetry: false,
      plugins: [{ src: "~/plugins/vue-tagsinput", mode: "client" }],
      css: ["~styles/global.style.css"],
      store: ["~store"],
      buildModules: ["@nuxtjs/apollo"],
      apollo: {
        clientConfigs: {
          default: {
            httpEndpoint: "http://localhost:3000/admin/api/",
          },
        },
      },
    }),
  ],
};

const AreaSchema = require("./lists/Area");
const PersonSchema = require("./lists/Person");
// const ContactDetailSchema = require('./lists/Contact_detail');
const OrganizationSchema = require("./lists/Organizations");
const Person_relationSchema = require("./lists/Person_relation");
const Person_organizationSchema = require("./lists/Person_organization");
const Person_publicationSchema = require("./lists/Person_publication");
const Organization_relationSchema = require("./lists/Organization_relation");
const EventSchema = require("./lists/Events");
const PositionSchema = require("./lists/Posts");
const MembershipSchema = require("./lists/Memberships");
const CountSchema = require("./lists/Count");
const MotionSchema = require("./lists/Motions");
const CollaborateSchema = require("./lists/Collaborate");

keystone.createList("Area", AreaSchema);
keystone.createList("Person", PersonSchema);
// keystone.createList('Contact_detail', ContactDetailSchema);
keystone.createList("Organization", OrganizationSchema);
keystone.createList("Person_relation", Person_relationSchema);
keystone.createList("Person_organization", Person_organizationSchema);
keystone.createList("Person_publication", Person_publicationSchema);
keystone.createList("Organization_relation", Organization_relationSchema);
keystone.createList("Event", EventSchema);
keystone.createList("Post", PositionSchema);
keystone.createList("Membership", MembershipSchema);
keystone.createList("Count", CountSchema);
keystone.createList("Motion", MotionSchema);
keystone.createList("Collaborate", CollaborateSchema);
