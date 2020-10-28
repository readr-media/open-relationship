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
import FormHero from '../../components/FormHero'
import FieldBlock from '../../components/FieldBlock'
import CollaborateFieldBlock from '../../components/CollaborateFieldBlock'
import Button from '../../components/Button'
import { personRelationFields } from '../../fields/personRelationFields'
import {
  FETCH_PERSON_RELATIONS_COUNT,
  FETCH_RANDOM_PERSON_RELATION,
  UPDATE_PERSON_RELATION,
} from '../../graphQL/query/person_relation'
import {
  moveFormToGqlVariable,
  moveGqlToForm,
} from '../../graphQL/personRelationFormHandler'
import { getRandomId } from '../../utils'
import formMixin from '../../mixins/formMixin'

import More from '../../components/More'
import Footer from '../../components/Footer'
import OtherForms from '../../components/OtherForms'

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
  mixins: [formMixin],

  data() {
    return {
      personRelationId: 1,
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

  async mounted() {
    await this.fetchPersonRelationsCount().then((res) => {
      this.fetchRandomPersonRelation(res)
    })
  },

  methods: {
    fetchPersonRelationsCount() {
      // 1 fetch person counts
      return new Promise((resolve, reject) => {
        this.$apollo.addSmartQuery('_allPersonRelationsMeta', {
          query: FETCH_PERSON_RELATIONS_COUNT,
          update(data) {
            // 2 get random personid from result
            const randomId = getRandomId(data._allPersonRelationsMeta.count)
            if (randomId === 0) resolve(1)
            // 3 fetch random person
            resolve(randomId)
            // this.fetchRandomPerson(randomId)
          },
        })
      })
    },
    fetchRandomPersonRelation(randomId) {
      // 4 fetch random person
      this.$apollo.addSmartQuery('PersonRelation', {
        query: FETCH_RANDOM_PERSON_RELATION,
        variables() {
          return {
            id: randomId,
          }
        },
        update(data) {
          // 5 set id and move data to form fields
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
      this.clearForm(this.personRelation)
      this.$router.push('/thanks')
    },

    uploadForm() {
      this.$apollo.mutate({
        mutation: UPDATE_PERSON_RELATION,
        variables: {
          // put form data to graphql's field
          id: this.personRelationId,
          ...moveFormToGqlVariable(this.personRelation),
        },
      })
    },
  },
}
</script>

<style lang="scss" scoped></style>
