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
          v-for="field in personRelation"
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
import { personRelationFields } from '~/fields/personRelationFields'
import { UPDATE_PERSON_RELATION } from '~/graphQL/query/person_relation'
import {
  moveFormToGqlVariable,
  moveGqlToForm,
} from '~/graphQL/personRelationFormHandler'
import { getRandomId } from '~/utils'
import formMixin from '~/mixins/formMixin'

import More from '~/components/More'
import Footer from '~/components/Footer'
import OtherForms from '~/components/OtherForms'

import {
  fetchPersonRelationById,
  fetchPersonRelationsCount,
} from '~/apollo/queries/person-relation.gql'

export default {
  name: 'VerifyPersonRelation',
  components: {
    FieldBlock,
    FormHero,
    Button,
    More,
    Footer,
    CollaborateFieldBlock,
    OtherForms,
  },
  apollo: {
    personRelationsCount: {
      query: fetchPersonRelationsCount,
      update: (data) => data._allPersonRelationsMeta.count,
    },
  },
  mixins: [formMixin],

  data() {
    return {
      personRelationId: this.$route.params.id,
      hero: {
        title: '驗證人物關係資料表單',
        content: '臺灣政商人物關係資料庫計畫',
        target: '人物關係',
        type: 'verify',
        id: 3,
      },
      personRelation: personRelationFields,

      collaborate: {
        name: '',
        email: '',
        feedback: '',
      },
    }
  },
  computed: {
    personRelationIdSpecific() {
      return Number(this.$route.params.id) && this.$route.params.id
    },
  },
  watch: {
    personRelationsCount() {
      this.fetchPersonRelation()
    },
  },
  methods: {
    fetchPersonRelation() {
      const id =
        this.personRelationIdSpecific || getRandomId(this.personRelationsCount)
      this.$apollo.addSmartQuery('PersonRelation', {
        query: fetchPersonRelationById,
        variables() {
          return {
            id,
          }
        },
        update: (data) => {
          this.personRelationId = data.PersonRelation.id
          moveGqlToForm(this.personRelation, data.PersonRelation)
        },
      })
    },

    async uploadHandler() {
      if (await !this.checkForm(this.personRelation)) {
        this.goToErrorField()
        return
      }
      this.uploadFormToGoogle(this.personRelation, 'personRelation')
      this.uploadForm()
    },

    async uploadForm() {
      await this.$apollo.mutate({
        mutation: UPDATE_PERSON_RELATION,
        variables: {
          // put form data to graphql's field
          id: this.personRelationId,
          ...moveFormToGqlVariable(this.personRelation),
        },
      })
      this.clearForm(this.personRelation)
      this.$router.push('/thanks')
    },
  },
}
</script>

<style lang="scss" scoped></style>
