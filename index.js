const { Keystone } = require('@keystonejs/keystone')
const { PasswordAuthStrategy } = require('@keystonejs/auth-password')
const { Text, Checkbox, Password } = require('@keystonejs/fields')
const { GraphQLApp } = require('@keystonejs/app-graphql')
const { AdminUIApp } = require('@keystonejs/app-admin-ui')
const { NuxtApp } = require('@keystonejs/app-nuxt')

const { KnexAdapter: Adapter } = require('@keystonejs/adapter-knex')
const initialiseData = require('./initial-data')

const { app, database, session } = require('./configs/config')

const PROJECT_NAME = app.applicationName

const SITE_DESCRIPTION =
  '「臺灣政商人物關係資料庫計畫」希望用「開放資料」的格式將散佈在網路上關於公眾人物的公開資料串連起來，包括他們的學歷、經歷、資產、企業關係、選舉經驗、政治獻金、學術論文、報告、親戚關係、甚至每一句公開發言。'
const SITE_TITLE = '臺灣政商人物關係資料庫計畫'
const SITE_URL = `${app.siteProtocol}://${app.domainName}`
const SITE_OG_IMAGE = `${app.siteProtocol}://${app.domainName}/og.jpg`

const adapterConfig = {
  dropDatabase: app.dropDatabase,
  knexOptions: {
    client: 'postgres',
    connection: `postgresql://${database.acc}:${database.pass}@${database.host}/${database.db}`,
  },
}

const keystone = new Keystone({
  adapter: new Adapter(adapterConfig),
  onConnect: process.env.CREATE_TABLES !== 'true' && initialiseData,
  cookieSecret: session.cookieSecret,
  cookie: {
    // If it's explicitly configured to use insecure cookies, overwrite the default setting.
    // Anything else will be fallback to the default of true in production.
    secure:
      session.secure === false ? false : process.env.NODE_ENV === 'production',
  },
})

// Access control functions
const userIsAdmin = ({ authentication: { item: user } }) =>
  Boolean(user && user.isAdmin)
const userOwnsItem = ({ authentication: { item: user } }) => {
  if (!user) {
    return false
  }

  // Instead of a boolean, you can return a GraphQL query:
  // https://www.keystonejs.com/api/access-control#graphqlwhere
  return { id: user.id }
}

const userIsAdminOrOwner = (auth) => {
  const isAdmin = access.userIsAdmin(auth)
  const isOwner = access.userOwnsItem(auth)
  return isAdmin || isOwner
}

const access = { userIsAdmin, userOwnsItem, userIsAdminOrOwner }

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
})

const authStrategy = keystone.createAuthStrategy({
  type: PasswordAuthStrategy,
  list: 'User',
})

module.exports = {
  keystone,
  configureExpress: (app) => {
    if (process.env.NODE_ENV === 'production') {
      app.set('trust proxy', true)
    }
  },
  apps: [
    new GraphQLApp(),
    new AdminUIApp({
      name: PROJECT_NAME,
      enableDefaultRoute: false,
      authStrategy,
    }),
    new NuxtApp({
      // equal to nuxt.config.js
      srcDir: 'src',
      buildDir: 'dist',
      telemetry: false,
      plugins: [{ src: '~/plugins/vue-tagsinput', mode: 'client' }],
      css: ['~styles/base.css', '~scss/global.scss'],
      // https://github.com/nuxt-community/style-resources-module
      // Do not import actual styles.
      // Use this module only to import variables, mixins, functions (et cetera) as they won't exist in the actual build.
      styleResources: {
        scss: ['~scss/breakpoint.scss', '~scss/variables.scss'],
      },
      store: ['~store'],
      serverMiddleware: ['../middle/headers.js'],
      buildModules: [
        '@nuxtjs/apollo',
        '@nuxtjs/style-resources',
        [
          '@nuxtjs/google-analytics',
          {
            id: () => {
              return document.domain.match(/^whoareyou.readr.tw/gs)
                ? 'UA-83609754-1'
                : 'UA-83609754-2'
            },
          },
        ],
      ],
      apollo: {
        clientConfigs: {
          default: {
            httpEndpoint: 'http://localhost:3000/admin/api/',
            browserHttpEndpoint: '/admin/api',
            // httpEndpoint: "https://whoareyou.readr.tw/admin/api",
            // httpEndpoint: "https://or-dev.readr.tw/admin/api",
            // 正式機
          },
        },
      },
      head: {
        // titleTemplate: '%s - Nuxt.js',
        htmlAttrs: {
          lang: 'zh-Hant',
        },
        title: '臺灣政商人物關係資料庫計畫',
        meta: [
          { charset: 'utf-8' },
          { name: 'viewport', content: 'width=device-width, initial-scale=1' },
          {
            hid: 'robots',
            name: 'robots',
            content: 'index',
          },
          {
            hid: 'description',
            name: 'description',
            content: SITE_DESCRIPTION,
          },
          {
            hid: 'og:title',
            property: 'og:title',
            content: SITE_TITLE,
          },
          {
            hid: 'og:description',
            property: 'og:description',
            content: SITE_DESCRIPTION,
          },
          {
            hid: 'og:image',
            property: 'og:image',
            content: SITE_OG_IMAGE,
          },
          {
            hid: 'og:url',
            property: 'og:url',
            content: SITE_URL,
          },
          {
            hid: 'og:type',
            property: 'og:type',
            content: 'website',
          },
          {
            hid: 'fb:app_id',
            property: 'fb:app_id',
            content: '175313259598308',
          },
          {
            hid: 'fb:pages',
            property: 'fb:pages',
            content: '1855418728011324',
          },
        ],
        link: [
          {
            rel: 'icon',
            type: 'image/png',
            sizes: '32x32',
            href: '/favicon-32x32.png',
          },
          {
            rel: 'icon',
            type: 'image/png',
            sizes: '16x16',
            href: '/favicon-16x16.png',
          },
          {
            rel: 'apple-touch-icon',
            sizes: '180x180',
            href: '/apple-touch-icon.png',
          },
          { rel: 'manifest', href: '/site.webmanifest' },
          {
            rel: 'mask-icon',
            href: '/safari-pinned-tab.svg',
            color: '#04295e',
          },
        ],
      },
    }),
  ],
}

// 第一波開放表單
const CollaborateSchema = require('./lists/Collaborate')
const OrganizationRelationSchema = require('./lists/OrganizationRelation')
const OrganizationSchema = require('./lists/Organization')
const PersonOrganizationSchema = require('./lists/PersonOrganization')
const PersonRelationSchema = require('./lists/PersonRelation')
const PersonSchema = require('./lists/Person')
const TagSchema = require('./lists/Tag')

keystone.createList('Collaborate', CollaborateSchema)
keystone.createList('Organization_relation', OrganizationRelationSchema)
keystone.createList('Organization', OrganizationSchema)
keystone.createList('Person_organization', PersonOrganizationSchema)
keystone.createList('Person_relation', PersonRelationSchema)
keystone.createList('Person', PersonSchema)
keystone.createList('Tag', TagSchema)

// 後續開放表單
// const AreaSchema = require('./lists/Area')
// const ContactDetailSchema = require('./lists/ContactDetail');
// const CountSchema = require('./lists/Count')
// const EventSchema = require('./lists/Event')
// const MembershipSchema = require('./lists/Membership')
// const MotionSchema = require('./lists/Motion')
// const PersonPublicationSchema = require('./lists/PersonPublication')
// const PositionSchema = require('./lists/Post')

// keystone.createList('Area', AreaSchema)
// keystone.createList('Contact_detail', ContactDetailSchema);
// keystone.createList('Count', CountSchema)
// keystone.createList('Event', EventSchema)
// keystone.createList('Membership', MembershipSchema)
// keystone.createList('Motion', MotionSchema)
// keystone.createList('Person_publication', PersonPublicationSchema)
// keystone.createList('Post', PositionSchema)
