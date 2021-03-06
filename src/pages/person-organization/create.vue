<template>
  <div id="Page-Person" class="Form-Page">
    <FormHero
      :id="hero.id"
      :title="hero.title"
      :content="hero.content"
      :target="hero.target"
      type="create"
    />

    <div class="fieldContainer">
      <div class="fieldContainer-notation">
        <span class="create-star">＊</span>為必填欄位
      </div>
      <form action @submit.prevent="uploadHandler">
        <template v-for="(field, key) in personOrganization">
          <FieldBlock
            v-show="!haveExactlySameName || field.showWhenHasSameNameItem"
            :key="field.label"
            :field="field"
            type="create"
          />
          <ListSameName
            v-if="key === 'organization_id'"
            :key="`${key}`"
            :items="searchResults"
            class="FieldBlock"
          />
        </template>
        <template v-if="!haveExactlySameName">
          <CollaborateFieldBlock :collaborate="collaborate" />

          <div class="btnContainer">
            <Button title="送出" fitDiv="true" round="true" type="create" />
            <p v-if="hasSubmitError" class="g-submit-error">
              糟糕！遇到了問題，請稍後再試或聯繫我們
            </p>
          </div>
        </template>
      </form>
    </div>
    <OtherForms operationType="create" />
    <More />
    <Footer />
  </div>
</template>

<script>
import FormHero from '../../components/FormHero'
import FieldBlock from '../../components/FieldBlock'
import CollaborateFieldBlock from '../../components/CollaborateFieldBlock'
import Button from '../../components/Button'

import { personOrganizationFields } from '../../fields/personOrganizationFields'

import formMixin from '../../mixins/formMixin'

import More from '../../components/More'
import Footer from '../../components/Footer'
import OtherForms from '../../components/OtherForms'
import ListSameName from '~/components/ListSameName'
import { buildGqlVariables } from '~/utils'
import { createCollaborate } from '~/apollo/mutations/collaborate.gql'
import { createOrganization } from '~/apollo/mutations/organization.gql'
import { createPerson } from '~/apollo/mutations/person.gql'
import { createPersonOrganization } from '~/apollo/mutations/person-organization.gql'
import { searchPersonOrganizations } from '~/apollo/queries/person-organization.gql'

export default {
  name: 'CreatePersonOrganization',
  components: {
    FormHero,
    FieldBlock,
    CollaborateFieldBlock,
    Button,
    More,
    Footer,
    OtherForms,
    ListSameName,
  },
  mixins: [formMixin],
  data() {
    return {
      hasSubmitError: false,
      hero: {
        title: '新增人物組織關係資料表單',
        content: '臺灣政商人物關係資料庫計畫',
        target: '人物組織關係',
        type: 'create',
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
    haveExactlySameName() {
      return this.searchResults.length > 0
    },
    needCreateCollaborate() {
      return (
        this.collaborate.name ||
        this.collaborate.email ||
        this.collaborate.feedback
      )
    },
    needCreateOrganization() {
      return !this.personOrganization.organization_id.value.id
    },
    needCreatePerson() {
      return !this.personOrganization.person_id.value.id
    },
  },
  watch: {
    'personOrganization.person_id.value.name'() {
      this.searchPersonOrganizationByName()
    },
    'personOrganization.organization_id.value.name'() {
      this.searchPersonOrganizationByName()
    },
  },
  mounted() {
    this.clearForm(this.personOrganization)
  },
  methods: {
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
              return items.map((item) => ({
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
      this.uploadForm()
    },

    async uploadForm() {
      try {
        if (this.needCreatePerson) {
          const resultCreatePerson = await this.$apollo.mutate({
            mutation: createPerson,
            variables: {
              data: {
                name: this.personOrganization.person_id.value.name,
                source: this.personOrganization.source.value,
              },
            },
          })
          this.personOrganization.person_id.value.id =
            resultCreatePerson.data.createPerson.id
        }
        if (this.needCreateOrganization) {
          const resultCreateOrganization = await this.$apollo.mutate({
            mutation: createOrganization,
            variables: {
              data: {
                name: this.personOrganization.organization_id.value.name,
                source: this.personOrganization.source.value,
              },
            },
          })
          this.personOrganization.organization_id.value.id =
            resultCreateOrganization.data.createOrganization.id
        }
        // Upload person form
        await this.$apollo.mutate({
          mutation: createPersonOrganization,
          variables: {
            data: buildGqlVariables(this.personOrganization),
          },
        })
        // Update collaborate form
        if (this.needCreateCollaborate) {
          await this.$apollo.mutate({
            mutation: createCollaborate,
            variables: {
              name: this.collaborate.name,
              email: this.collaborate.email,
              feedback: this.collaborate.feedback,
            },
          })
        }
        this.clearForm(this.personOrganization)
        this.$router.push('/thanks')
      } catch (error) {
        this.hasSubmitError = true
      }
    },
  },
}
</script>

<style lang="scss" scoped>
#Page-Person {
  width: 100%;

  // background: gold;
}
</style>
