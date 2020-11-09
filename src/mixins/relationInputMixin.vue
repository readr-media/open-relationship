<script>
import gql from 'graphql-tag'
import { buildSearchItemInfo as buildPersonInfo } from '~/utils/person'
import { buildSearchItemInfo as buildOrganizationInfo } from '~/utils/organization'

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
              gender
              alternative
              other_names
              birth_date_year
              birth_date_month
              birth_date_day
              tags {
                name
              }
            }
          }
        `,
        variables: {
          text: `${text}`,
        },
        update(data) {
          this.suggestions[0].data = data.allPersons.map((item) => ({
            id: item.id,
            name: item.name,
            info: buildPersonInfo(item),
          }))
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
              identifiers
              alternative
              other_names
              tags {
                name
              }
            }
          }
        `,
        variables: {
          text: `${text}`,
        },
        update(data) {
          this.suggestions[0].data = data.allOrganizations.map((item) => ({
            id: item.id,
            name: item.name,
            info: buildOrganizationInfo(item),
          }))
        },
      })
    },
  },
}
</script>
