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
        <div class="btnContainer">
          <Button title="送出" fitDiv="true" round="true" type="verify" />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import FormHero from '../../components/FormHero'
import FieldBlock from '../../components/FieldBlock'
import Button from '../../components/Button'
import { organizationRelationFields } from '../../fields/organizationRelationFields'
import {
  FETCH_ORGANIZATION_RELATIONS_COUNT,
  FETCH_RANDOM_ORGANIZATION_RELATION,
  UPDATE_ORGANIZATION_RELATION,
} from '../../graphQL/query/organization_relation'
import {
  moveFormToGqlVariable,
  moveGqlToForm,
} from '../../graphQL/organizationRelationFormHandler'
import { getRandomId } from '../../graphQL/getRandomId'

import formMixin from '../../mixins/formMixin'

export default {
  components: {
    FieldBlock,
    FormHero,
    Button,
  },
  mixins: [formMixin],

  data() {
    return {
      organizationRelationId: 1,
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

  async mounted() {
    await this.fetchOrganizationCount()
  },

  methods: {
    fetchOrganizationCount() {
      // 1 fetch person counts
      this.$apollo.addSmartQuery('_allOrganizationRelationsMeta', {
        query: FETCH_ORGANIZATION_RELATIONS_COUNT,
        update(data) {
          // 2 get random personid from result
          const randomId = getRandomId(data._allOrganizationRelationsMeta.count)
          if (randomId === 0) return
          // 3 fetch random organization
          this.fetchRandomOrganizationRelation(randomId)
        },
      })
    },
    fetchRandomOrganizationRelation(randomId) {
      // 4 fetch random organization
      this.$apollo.addSmartQuery('OrganizationRelation', {
        query: FETCH_RANDOM_ORGANIZATION_RELATION,
        variables() {
          return {
            id: randomId,
          }
        },
        update(data) {
          // 5 set id and move data to form fields
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
      // this.uploadFormToGoogle(this.organizationRelation, 'person')
      this.uploadForm()
      this.clearForm(this.organizationRelation)
      this.$router.push('/thanks')
    },

    uploadForm() {
      this.$apollo.mutate({
        mutation: UPDATE_ORGANIZATION_RELATION,
        variables: {
          // put form data to graphql's field
          id: this.organizationRelationId,
          ...moveFormToGqlVariable(this.organizationRelation),
        },
      })
    },
  },
}
</script>

<style lang="scss" scoped></style>
