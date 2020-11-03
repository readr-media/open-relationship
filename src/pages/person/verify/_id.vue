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
          v-for="field in person"
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
    <ListSameName :items="searchResults" />
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
import { personFields } from '~/fields/personFields'
import {
  moveFormToGqlVariable,
  moveGqlToForm,
} from '~/graphQL/personFormHandler'
import { getRandomId } from '~/utils'
import formMixin from '~/mixins/formMixin'

import More from '~/components/More'
import Footer from '~/components/Footer'
import ListSameName from '~/components/ListSameName'
import OtherForms from '~/components/OtherForms'

import { buildSearchItemInfo } from '~/utils/person'
import {
  fetchPersonById,
  fetchPersonCount,
  searchPersons,
  updatePerson,
} from '~/apollo/queries/person.gql'

export default {
  name: 'VerifyPerson',
  components: {
    FieldBlock,
    FormHero,
    Button,
    More,
    Footer,
    CollaborateFieldBlock,
    OtherForms,
    ListSameName,
  },
  apollo: {
    personCount: {
      query: fetchPersonCount,
      update: (data) => data._allPersonsMeta.count,
    },
  },
  mixins: [formMixin],

  data() {
    return {
      personId: this.$route.params.id,
      // eslint-disable-next-line vue/no-reserved-keys
      hero: {
        title: '驗證人物資料表單',
        content: '臺灣政商人物關係資料庫計畫',
        target: '人物',
        type: 'verify',
        id: 1,
      },
      person: personFields,

      collaborate: {
        name: '',
        email: '',
        feedback: '',
      },
      searchResults: [],
    }
  },
  computed: {
    personIdSpecific() {
      return Number(this.$route.params.id) && this.$route.params.id
    },
  },
  watch: {
    'person.name.value'(value) {
      this.searchResults = []
      if (value) {
        this.searchPersonByText(value)
      }
    },
    personCount() {
      this.fetchPerson()
    },
  },
  methods: {
    fetchPerson() {
      const id = this.personIdSpecific || getRandomId(this.personCount)
      this.$apollo.addSmartQuery('Person', {
        query: fetchPersonById,
        variables() {
          return {
            id,
          }
        },
        update: (data) => {
          this.personId = data.Person.id
          moveGqlToForm(this.person, data.Person)
        },
      })
    },
    searchPersonByText(text) {
      this.$apollo.addSmartQuery('searchResults', {
        query: searchPersons,
        variables: {
          text,
        },
        update: (data) => {
          const items = data.allPersons
          if (items?.length > 0) {
            return items
              .filter((item) => item.id !== this.personId)
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
    async uploadHandler() {
      if (await !this.checkForm(this.person)) {
        this.goToErrorField()
        return
      }
      this.uploadFormToGoogle(this.person, 'person')
      this.uploadForm()
    },

    async uploadForm() {
      await this.$apollo.mutate({
        mutation: updatePerson,
        variables: {
          // put form data to graphql's field
          id: this.personId,
          ...moveFormToGqlVariable(this.person),
        },
      })
      this.clearForm(this.person)
      this.$router.push('/thanks')
    },
  },
}
</script>

<style lang="scss" scoped></style>
