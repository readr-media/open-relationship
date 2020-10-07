<template>
  <div id="Page-Person-verify" class="Form-Page">
    <Navbar />
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
    <More />
    <Footer />
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

import Navbar from '../../components/Navbar'
import More from '../../components/More'
import Footer from '../../components/Footer'

export default {
  components: {
    FieldBlock,
    FormHero,
    Button,
    Navbar,
    More,
    Footer,
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
    await this.fetchOrganizationCount().then((res) => {
      this.fetchRandomOrganizationRelation(res)
    })
  },

  methods: {
    fetchOrganizationCount() {
      // 1 fetch person counts
      return new Promise((resolve, reject) => {
        this.$apollo.addSmartQuery('_allOrganizationRelationsMeta', {
          query: FETCH_ORGANIZATION_RELATIONS_COUNT,
          update(data) {
            // 2 get random personid from result
            const randomId = getRandomId(
              data._allOrganizationRelationsMeta.count
            )
            if (randomId === 0) resolve(1)
            // 3 fetch random person
            resolve(randomId)
            // this.fetchRandomPerson(randomId)
          },
        })
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
