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
        <template v-for="(field, key) in organizationRelation">
          <FieldBlock
            v-show="!haveExactlySameName || field.showWhenHasSameNameItem"
            :key="field.label"
            :field="field"
            type="create"
          />
          <ListSameName
            v-if="key === 'related_organization_id'"
            :key="`${key}`"
            :items="searchResults"
            class="FieldBlock"
          />
        </template>
        <template v-if="!haveExactlySameName">
          <CollaborateFieldBlock :collaborate="collaborate" />

          <div class="btnContainer">
            <Button title="送出" fitDiv="true" round="true" type="create" />
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

import { organizationRelationFields } from '../../fields/organizationRelationFields'

import { ADD_ORGANIZATION_RELATION } from '../../graphQL/query/organization_relation'
import { ADD_COLLABORATE } from '../../graphQL/query/collaborate'
import { moveFormToGqlVariable } from '../../graphQL/organizationRelationFormHandler'
import formMixin from '../../mixins/formMixin'

import More from '../../components/More'
import Footer from '../../components/Footer'
import OtherForms from '../../components/OtherForms'
import ListSameName from '~/components/ListSameName'
import { createOrganizations } from '~/apollo/mutations/organization.gql'
import { searchOrganizationRelations } from '~/apollo/queries/organization-relation.gql'

export default {
  name: 'CreateOrganizationRelation',
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
      hero: {
        title: '新增組織關係資料表單',
        content: '臺灣政商人物關係資料庫計畫',
        target: '組織關係',
        type: 'create',
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
      return !(
        this.organizationRelation.organization_id.value.id &&
        this.organizationRelation.related_organization_id.value.id
      )
    },
  },
  watch: {
    'organizationRelation.organization_id.value.name'() {
      this.searchOrganizationRelationByName()
    },
    'organizationRelation.related_organization_id.value.name'() {
      this.searchOrganizationRelationByName()
    },
  },
  mounted() {
    this.clearForm(this.organizationRelation)
  },
  methods: {
    buildCreateOrganizationVariables() {
      const variables = []
      if (!this.organizationRelation.organization_id.value.id) {
        variables.push(
          this.buildOrganizationVariable(
            this.organizationRelation.organization_id.value.name,
            this.organizationRelation.source.value
          )
        )
      }
      if (!this.organizationRelation.related_organization_id.value.id) {
        variables.push(
          this.buildOrganizationVariable(
            this.organizationRelation.related_organization_id.value.name,
            this.organizationRelation.source.value
          )
        )
      }
      return { data: variables }
    },
    buildOrganizationVariable(name, source) {
      return {
        data: {
          name,
          source,
        },
      }
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
              return items.map((item) => ({
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
      // if there's any form format error,scroll to it.
      if (await !this.checkForm(this.organizationRelation)) {
        this.goToErrorField()
        return
      }
      this.uploadForm()
    },

    async uploadForm() {
      if (this.needCreateOrganization) {
        const resultCreateOrganizations = await this.$apollo.mutate({
          mutation: createOrganizations,
          variables: this.buildCreateOrganizationVariables(),
        })
        resultCreateOrganizations.data.createOrganizations.forEach(
          (organization) => {
            if (
              this.organizationRelation.organization_id.value.name ===
              organization.name
            ) {
              this.organizationRelation.organization_id.value.id =
                organization.id
            } else if (
              this.organizationRelation.related_organization_id.value.name ===
              organization.name
            ) {
              this.organizationRelation.related_organization_id.value.id =
                organization.id
            }
          }
        )
      }

      // Upload person form
      await this.$apollo.mutate({
        mutation: ADD_ORGANIZATION_RELATION,
        variables: moveFormToGqlVariable(this.organizationRelation),
      })
      // Update collaborate form
      if (this.needCreateCollaborate) {
        await this.$apollo.mutate({
          mutation: ADD_COLLABORATE,
          variables: {
            name: this.collaborate.name,
            email: this.collaborate.email,
            feedback: this.collaborate.feedback,
          },
        })
      }
      this.clearForm(this.organizationRelation)
      this.$router.push('/thanks')
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
