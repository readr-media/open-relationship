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
          v-for="field in personOrganization"
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
import { personOrganizationFields } from '../../fields/personOrganizationFields'
import {
  FETCH_PERSON_ORGANIZATIONS_COUNT,
  FETCH_RANDOM_PERSON_ORGANIZATION,
  UPDATE_PERSON_ORGANIZATION,
} from '../../graphQL/query/person_organization'
import {
  moveFormToGqlVariable,
  moveGqlToForm,
} from '../../graphQL/personOrganizationFormHandler'
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
      personOrganizationId: 1,
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

  async mounted() {
    await this.fetchPersonOrganizationsCount().then((res) => {
      this.fetchRandomPersonOrganization(res)
    })
  },

  methods: {
    fetchPersonOrganizationsCount() {
      // 1 fetch person counts
      return new Promise((resolve, reject) => {
        this.$apollo.addSmartQuery('_allPersonOrganizationsMeta', {
          query: FETCH_PERSON_ORGANIZATIONS_COUNT,
          update(data) {
            // 2 get random personid from result
            const randomId = getRandomId(data._allPersonOrganizationsMeta.count)
            if (randomId === 0) resolve(1)
            // 3 fetch random person
            resolve(randomId)
            // this.fetchRandomPerson(randomId)
          },
        })
      })
    },
    fetchRandomPersonOrganization(randomId) {
      // 4 fetch random person
      this.$apollo.addSmartQuery('Person', {
        query: FETCH_RANDOM_PERSON_ORGANIZATION,
        variables() {
          return {
            id: randomId,
          }
        },
        update(data) {
          // 5 set id and move data to form fields
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
      // this.uploadFormToGoogle(this.personOrganization, 'person')
      this.uploadForm()
      this.clearForm(this.personOrganization)
      this.$router.push('/thanks')
    },

    uploadForm() {
      this.$apollo.mutate({
        mutation: UPDATE_PERSON_ORGANIZATION,
        variables: {
          // put form data to graphql's field
          id: this.personOrganizationId,
          ...moveFormToGqlVariable(this.personOrganization),
        },
      })
    },
  },
}
</script>

<style lang="scss" scoped></style>
