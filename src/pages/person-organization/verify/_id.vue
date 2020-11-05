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
        <FieldBlock
          v-for="field in personOrganization"
          :key="field.label"
          :field="field"
          type="verify"
        />

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
import { UPDATE_PERSON_ORGANIZATION } from '~/graphQL/query/person_organization'
import {
  moveFormToGqlVariable,
  moveGqlToForm,
} from '~/graphQL/personOrganizationFormHandler'
import { getRandomId } from '~/utils'
import formMixin from '~/mixins/formMixin'

import More from '~/components/More'
import Footer from '~/components/Footer'
import OtherForms from '~/components/OtherForms'

import {
  fetchPersonOrganizationById,
  fetchPersonOrganizationsCount,
} from '~/apollo/queries/person-organization.gql'

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
    }
  },
  computed: {
    personOrganizationIdSpecific() {
      return Number(this.$route.params.id) && this.$route.params.id
    },
  },
  watch: {
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
        mutation: UPDATE_PERSON_ORGANIZATION,
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
