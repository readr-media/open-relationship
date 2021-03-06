<template>
  <div id="Page-Organization-verify" class="Form-Page">
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
          v-for="(field, key) in organization"
          :key="field.label"
          :field="field"
          type="verify"
        >
          <ListSameName v-if="key === 'name'" :items="searchResults" />
        </FieldBlock>

        <CollaborateFieldBlock :collaborate="collaborate" />

        <div class="btnContainer">
          <Button title="送出" fitDiv="true" round="true" type="verify" />
          <p v-if="hasSubmitError" class="g-submit-error">
            糟糕！遇到了問題，請稍後再試或聯繫我們
          </p>
        </div>
      </form>
    </div>
    <OtherForms operationType="verify" />
    <More />
    <Footer />
  </div>
</template>

<script>
import { uniqBy } from 'lodash'
import FormHero from '~/components/FormHero'
import FieldBlock from '~/components/FieldBlock'
import CollaborateFieldBlock from '~/components/CollaborateFieldBlock'

import { organizationFields } from '~/fields/organizationFields'
import Button from '~/components/Button'

import { buildGqlVariables, getRandomId } from '~/utils'
import { moveGqlToForm } from '~/graphQL/organizationFormHandler'
import formMixin from '~/mixins/formMixin'

import More from '~/components/More'
import Footer from '~/components/Footer'
import ListSameName from '~/components/ListSameName'
import OtherForms from '~/components/OtherForms'

import { buildSearchItemInfo } from '~/utils/organization'
import {
  fetchOrganizationById,
  fetchOrganizationCount,
  searchOrganizations,
} from '~/apollo/queries/organization.gql'
import { updateOrganization } from '~/apollo/mutations/organization.gql'

export default {
  name: 'VerifyOrganization',
  components: {
    FieldBlock,
    FormHero,
    CollaborateFieldBlock,
    Button,
    More,
    Footer,
    ListSameName,
    OtherForms,
  },
  apollo: {
    organizationCount: {
      query: fetchOrganizationCount,
      update: (data) => data._allOrganizationsMeta.count ?? 0,
    },
  },
  mixins: [formMixin],
  data() {
    return {
      hasSubmitError: false,
      organizationId: this.$route.params.id,
      hero: {
        title: '驗證組織資料表單',
        content: '臺灣政商人物關係資料庫計畫',
        target: '組織',
        type: 'verify',
        id: 2,
      },
      organization: organizationFields,
      collaborate: {
        name: '',
        email: '',
        feedback: '',
      },
      searchResults: [],
    }
  },
  computed: {
    needUploadToGoogleSheet() {
      return Object.values(this.organization).some(
        (field) => 'correctVerify' in field && field.correctVerify !== null
      )
    },
    organizationIdSpecific() {
      return Number(this.$route.params.id) && this.$route.params.id
    },
  },
  watch: {
    'organization.name.value'(value) {
      this.searchResults = []
      if (value) {
        this.searchOrganizationByText(value)
      }
    },
    organizationCount() {
      this.fetchOrganization()
    },
  },

  methods: {
    fetchOrganization() {
      const id =
        this.organizationIdSpecific || getRandomId(this.organizationCount)
      this.$apollo.addSmartQuery('Organization', {
        query: fetchOrganizationById,
        variables() {
          return {
            id,
          }
        },
        update: (data) => {
          this.organizationId = data.Organization.id
          moveGqlToForm(this.organization, data.Organization)
        },
      })
    },
    searchOrganizationByText(text) {
      this.$apollo.addSmartQuery('searchResults', {
        query: searchOrganizations,
        variables: {
          text,
        },
        update: (data) => {
          const uniqItems = uniqBy([...data.name, ...data.alternative], 'id')
          if (uniqItems?.length > 0) {
            return uniqItems
              .filter((item) => item.id !== this.organizationId)
              .map((item) => ({
                id: item.id,
                name: item.name,
                info: buildSearchItemInfo(item),
              }))
          }
          return []
        },
      })
    },

    uploadHandler() {
      if (!this.checkForm(this.organization)) {
        this.goToErrorField()
        return
      }
      this.uploadForm()
    },

    async uploadForm() {
      try {
        // Post update data to keystone
        await this.$apollo.mutate({
          mutation: updateOrganization,
          variables: {
            // put form data to graphql's field
            id: this.organizationId,
            data: buildGqlVariables(this.organization),
          },
        })
        if (this.needUploadToGoogleSheet) {
          this.uploadFormToGoogle(this.organization, 'organization')
        }
        this.clearForm(this.organization)
        this.$router.push('/thanks')
      } catch (error) {
        this.hasSubmitError = true
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
