<template>
  <div id="Page-Organization" class="Form-Page">
    <FormHero
      :id="hero.id"
      :title="hero.title"
      :content="hero.content"
      :target="hero.target"
      type="create"
    />
    <div class="fieldContainer">
      <span class="create-star">＊</span>為必填欄位
      <form action @submit.prevent="uploadHandler">
        <FieldBlock
          v-for="(field, key) in organization"
          v-show="!haveExactlySameName || field.showWhenHasSameNameItem"
          :key="field.label"
          :field="field"
          type="create"
        >
          <ListSameName v-if="key === 'name'" :items="searchResults" />
        </FieldBlock>

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
import { uniqBy } from 'lodash'
import FormHero from '../../components/FormHero'
import FieldBlock from '../../components/FieldBlock'
import CollaborateFieldBlock from '../../components/CollaborateFieldBlock'
import Button from '../../components/Button'
import { organizationFields } from '../../fields/organizationFields'

import formMixin from '../../mixins/formMixin'

import More from '../../components/More'
import Footer from '../../components/Footer'
import OtherForms from '../../components/OtherForms'
import ListSameName from '../../components/ListSameName'

import { buildGqlVariables } from '~/utils'
import { buildSearchItemInfo } from '~/utils/organization'
import { createCollaborate } from '~/apollo/mutations/collaborate.gql'
import { createOrganization } from '~/apollo/mutations/organization.gql'
import { searchOrganizations } from '~/apollo/queries/organization.gql'

export default {
  name: 'CreateOrganization',
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
        title: '新增組織資料表單',
        content: '臺灣政商人物關係資料庫計畫',
        target: '組織',
        type: 'create',
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
    haveExactlySameName() {
      return this.searchResults.some(
        (item) => item.name === this.organization.name.value
      )
    },
  },
  watch: {
    'organization.name.value'(value) {
      this.searchResults = []
      if (value) {
        this.searchOrganizationByText(value)
      }
    },
  },
  mounted() {
    this.clearForm(this.organization)
  },
  methods: {
    searchOrganizationByText(text) {
      this.$apollo.addSmartQuery('searchResults', {
        query: searchOrganizations,
        variables: {
          text,
        },
        update: (data) => {
          const uniqItems = uniqBy([...data.name, ...data.alternative], 'id')
          if (uniqItems?.length > 0) {
            return uniqItems.map((item) => ({
              id: item.id,
              name: item.name,
              info: buildSearchItemInfo(item),
            }))
          }
          return []
        },
      })
    },

    async uploadHandler() {
      if (await !this.checkForm(this.organization)) {
        this.goToErrorField()
        return
      }
      this.uploadForm()
    },

    async uploadForm() {
      try {
        // Upload person form
        await this.$apollo.mutate({
          mutation: createOrganization,
          variables: {
            data: buildGqlVariables(this.organization),
          },
        })
        // Update collaborate form
        await this.$apollo.mutate({
          mutation: createCollaborate,
          variables: {
            name: this.collaborate.name,
            email: this.collaborate.email,
            feedback: this.collaborate.feedback,
          },
        })
        this.clearForm(this.organization)
        this.$router.push('/thanks')
      } catch (error) {
        this.hasSubmitError = true
      }
    },
  },
}
</script>

<style lang="scss" scoped>
#Page-Organization {
  .create-star {
    color: #ed8c4a;
    margin: 0;
  }
}
</style>
