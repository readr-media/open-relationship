<script>
import gql from 'graphql-tag'

export default {
  methods: {
    // fetch list from CMS
    searchPersons(text) {
      return this.$apollo.addSmartQuery(`allPersons`, {
        query: gql`
          query allPersons($text: String!) {
            allPersons(search: $text) {
              id
              name
            }
          }
        `,
        variables: {
          text: `${text}`,
        },
        update(data) {
          this.suggestions[0].data = data.allPersons
        },
      })
    },

    searchOrganizations(text) {
      return this.$apollo.addSmartQuery(`allOrganizations`, {
        query: gql`
          query allOrganizations($text: String!) {
            allOrganizations(search: $text) {
              id
              name
            }
          }
        `,
        variables: {
          text: `${text}`,
        },
        update(data) {
          this.suggestions[0].data = data.allOrganizations
        },
      })
    },
  },
}
</script>
