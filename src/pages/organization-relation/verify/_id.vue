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
import { UPDATE_ORGANIZATION_RELATION } from '~/graphQL/query/organization_relation'
import {
  moveFormToGqlVariable,
  moveGqlToForm,
} from '~/graphQL/organizationRelationFormHandler'
import { getRandomId } from '~/utils'
import formMixin from '~/mixins/formMixin'

import More from '~/components/More'
import Footer from '~/components/Footer'
import OtherForms from '~/components/OtherForms'

import {
  fetchOrganizationRelationById,
  fetchOrganizationRelationsCount,
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
    }
  },
  computed: {
    organizationRelationIdSpecific() {
      return Number(this.$route.params.id) && this.$route.params.id
    },
  },
  watch: {
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
        mutation: UPDATE_ORGANIZATION_RELATION,
        variables: {
          // put form data to graphql's field
          id: this.organizationRelationId,
          ...moveFormToGqlVariable(this.organizationRelation),
        },
      })
      this.clearForm(this.organizationRelation)
      this.$router.push('/thanks')
    },
  },
}
</script>

<style lang="scss" scoped></style>
