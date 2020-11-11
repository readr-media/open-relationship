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
        <template v-for="(field, key) in organizationRelation">
          <FieldBlock :key="field.label" :field="field" type="verify" />
          <ListSameName
            v-if="key === 'related_organization_id'"
            :key="`${key}`"
            :items="searchResults"
            class="FieldBlock"
          />
        </template>
        <FieldBlock
          v-for="field in organizationRelation"
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
import { organizationRelationFields } from '~/fields/organizationRelationFields'
import { moveGqlToForm } from '~/graphQL/organizationRelationFormHandler'
import { buildGqlVariables, getRandomId } from '~/utils'
import formMixin from '~/mixins/formMixin'

import More from '~/components/More'
import Footer from '~/components/Footer'
import OtherForms from '~/components/OtherForms'
import ListSameName from '~/components/ListSameName'
import { updateOrganizationRelation } from '~/apollo/mutations/organization-relation.gql'
import {
  fetchOrganizationRelationById,
  fetchOrganizationRelationsCount,
  searchOrganizationRelations,
} from '~/apollo/queries/organization-relation.gql'

export default {
  name: 'VerifyOrganizationRelation',
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
    organizationRelationsCount: {
      query: fetchOrganizationRelationsCount,
      update: (data) => data._allOrganizationRelationsMeta.count,
    },
  },
  mixins: [formMixin],

  data() {
    return {
      organizationRelationId: this.$route.params.id,
      hero: {
        title: '驗證組織關係資料表單',
        content: '臺灣政商人物關係資料庫計畫',
        target: '組織關係',
        type: 'verify',
        id: 4,
      },
      organizationRelation: organizationRelationFields,

      collaborate: {
        name: '',
        email: '',
        feedback: '',
      },
      searchResults: [],
    }
  },
  computed: {
    organizationRelationIdSpecific() {
      return Number(this.$route.params.id) && this.$route.params.id
    },
  },
  watch: {
    'organizationRelation.organization_id.value.name'() {
      this.searchOrganizationRelationByName()
    },
    'organizationRelation.related_organization_id.value.name'() {
      this.searchOrganizationRelationByName()
    },
    organizationRelationsCount() {
      this.fetchOrganizationRelation()
    },
  },

  methods: {
    fetchOrganizationRelation() {
      const id =
        this.organizationRelationIdSpecific ||
        getRandomId(this.organizationRelationsCount)
      this.$apollo.addSmartQuery('OrganizationRelation', {
        query: fetchOrganizationRelationById,
        variables() {
          return {
            id,
          }
        },
        update: (data) => {
          this.organizationRelationId = data.OrganizationRelation.id
          moveGqlToForm(this.organizationRelation, data.OrganizationRelation)
        },
      })
    },
    searchOrganizationRelationByName() {
      this.searchResults = []
      const organizationName = this.organizationRelation?.organization_id?.value
        ?.name
      const relatedOrganizationName = this.organizationRelation
        ?.related_organization_id?.value?.name
      if (organizationName && relatedOrganizationName) {
        this.$apollo.addSmartQuery('searchResults', {
          query: searchOrganizationRelations,
          variables: {
            organizationName,
            relatedOrganizationName,
          },
          update: (data) => {
            const items = data.allOrganizationRelations
            if (items?.length > 0) {
              return items
                .filter((item) => item.id !== this.organizationRelationId)
                .map((item) => ({
                  id: item.id,
                  name: `${organizationName}+${relatedOrganizationName}`,
                  info: item.relative,
                }))
            }
            return []
          },
        })
      }
    },
    async uploadHandler() {
      if (await !this.checkForm(this.organizationRelation)) {
        this.goToErrorField()
        return
      }
      this.uploadFormToGoogle(this.organizationRelation, 'organizationRelation')
      this.uploadForm()
    },

    async uploadForm() {
      await this.$apollo.mutate({
        mutation: updateOrganizationRelation,
        variables: {
          // put form data to graphql's field
          id: this.organizationRelationId,
          data: buildGqlVariables(this.organizationRelation),
        },
      })
      this.clearForm(this.organizationRelation)
      this.$router.push('/thanks')
    },
  },
}
</script>

<style lang="scss" scoped></style>
