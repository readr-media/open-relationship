// const crypto = require('crypto')
// const randomString = () => crypto.randomBytes(6).hexSlice()

module.exports = async (keystone) => {
  // Count existing users
  const {
    data: {
      _allUsersMeta: { count = 0 },
    },
  } = await keystone.executeGraphQL({
    context: keystone.createContext({ skipAccessControl: true }),
    query: `query {
      _allUsersMeta {
        count
      }
    }`,
  })

  if (count === 0) {
    const password = 'mirrormedia'
    const email = 'admin@mirrormedia.mg'

    const { errors } = await keystone.executeGraphQL({
      context: keystone.createContext({ skipAccessControl: true }),
      query: `mutation initialUser($password: String, $email: String) {
            createUser(data: {name: "admin", email: $email, isAdmin: true, password: $password}) {
              id
            }
          }`,
      variables: { password, email },
    })

    if (errors) {
      console.log('failed to create initial user:')
      console.log(errors)
    } else {
      console.log(`

      User created:
        email: ${email}
        password: ${password}
      Please change these details after initial login.
      `)
    }
  }
}
