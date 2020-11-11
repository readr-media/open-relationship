<template>
  <div id="Page-Person-verify" class="Form-Page">
    <FormHero
      :id="hero.id"
      :title="hero.title"
      :content="hero.content"
      :target="hero.target"
      type="verify"
    />
    <div class="fieldContainer">
      <div class="fieldContainer-notation">
        <span class="verify-star">＊</span>為必填欄位
      </div>
      <form action @submit.prevent="uploadHandler">
        <template v-for="(field, key) in personOrganization">
          <FieldBlock :key="field.label" :field="field" type="verify" />
          <ListSameName
            v-if="key === 'organization_id'"
            :key="`${key}`"
            :items="searchResults"
            class="FieldBlock"
          />
        </template>

        <CollaborateFieldBlock :collaborate="collaborate" />

        <div class="btnContainer">
          <Button title="送出" fitDiv="true" round="true" type="verify" />
        </div>
      </form>
    </div>
    <OtherForms operationType="verify" />
    <More />
    <Footer />
  </div>
</template>

<script>
import FormHero from '~/components/FormHero'
import FieldBlock from '~/components/FieldBlock'
import CollaborateFieldBlock from '~/components/CollaborateFieldBlock'

import Button from '~/components/Button'
import { personOrganizationFields } from '~/fields/personOrganizationFields'
import {
  moveFormToGqlVariable,
  moveGqlToForm,
} from '~/graphQL/personOrganizationFormHandler'
import { getRandomId } from '~/utils'
import formMixin from '~/mixins/formMixin'

import More from '~/components/More'
import Footer from '~/components/Footer'
import OtherForms from '~/components/OtherForms'
import ListSameName from '~/components/ListSameName'
import {
  fetchPersonOrganizationById,
  fetchPersonOrganizationsCount,
  searchPersonOrganizations,
} from '~/apollo/queries/person-organization.gql'
import { updatePersonOrganization } from '~/apollo/mutations/person-organization.gql'

export default {
  name: 'VerifyPersonOrganization',
  components: {
    FieldBlock,
    FormHero,
    CollaborateFieldBlock,
    Button,
    More,
    Footer,
    OtherForms,
    ListSameName,
  },
  apollo: {
    personOrganizationsCount: {
      query: fetchPersonOrganizationsCount,
      update: (data) => data._allPersonOrganizationsMeta.count,
    },
  },
  mixins: [formMixin],

  data() {
    return {
      personOrganizationId: this.$route.params.id,
      hero: {
        title: '驗證人物組織關係資料表單',
        content: '臺灣政商人物關係資料庫計畫',
        target: '人物組織關係',
        type: 'verify',
        id: 5,
      },
      personOrganization: personOrganizationFields,

      collaborate: {
        name: '',
        email: '',
        feedback: '',
      },
      searchResults: [],
    }
  },
  computed: {
    personOrganizationIdSpecific() {
      return Number(this.$route.params.id) && this.$route.params.id
    },
  },
  watch: {
    'personOrganization.person_id.value.name'() {
      this.searchPersonOrganizationByName()
    },
    'personOrganization.organization_id.value.name'() {
      this.searchPersonOrganizationByName()
    },
    personOrganizationsCount() {
      this.fetchPersonOrganization()
    },
  },
  methods: {
    fetchPersonOrganization() {
      const id =
        this.personOrganizationIdSpecific ||
        getRandomId(this.personOrganizationsCount)
      this.$apollo.addSmartQuery('PersonOrganization', {
        query: fetchPersonOrganizationById,
        variables() {
          return {
            id,
          }
        },
        update: (data) => {
          this.personOrganizationId = data.PersonOrganization.id
          moveGqlToForm(this.personOrganization, data.PersonOrganization)
        },
      })
    },
    searchPersonOrganizationByName() {
      this.searchResults = []
      const personName = this.personOrganization?.person_id?.value?.name
      const organizationName = this.personOrganization?.organization_id?.value
        ?.name
      if (personName && organizationName) {
        this.$apollo.addSmartQuery('searchResults', {
          query: searchPersonOrganizations,
          variables: {
            personName,
            organizationName,
          },
          update: (data) => {
            const items = data.allPersonOrganizations
            if (items?.length > 0) {
              return items
                .filter((item) => item.id !== this.personOrganizationId)
                .map((item) => ({
                  id: item.id,
                  name: `${personName}+${organizationName}`,
                  info: item.role,
                }))
            }
            return []
          },
        })
      }
    },
    async uploadHandler() {
      if (await !this.checkForm(this.personOrganization)) {
        this.goToErrorField()
        return
      }
      this.uploadFormToGoogle(this.personOrganization, 'personOrganization')
      this.uploadForm()
    },

    async uploadForm() {
      await this.$apollo.mutate({
        mutation: updatePersonOrganization,
        variables: {
          // put form data to graphql's field
          id: this.personOrganizationId,
          ...moveFormToGqlVariable(this.personOrganization),
        },
      })
      this.clearForm(this.personOrganization)
      this.$router.push('/thanks')
    },
  },
}
</script>

<style lang="scss" scoped></style>
