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
        <FieldBlock
          v-for="(field, key) in person"
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
            <Button
              title="送出"
              fitDiv="true"
              round="true"
              type="create"
              @click="handleClick"
            />
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

import { personFields } from '../../fields/personFields'

import formMixin from '../../mixins/formMixin'

import More from '../../components/More'
import Footer from '../../components/Footer'
import OtherForms from '../../components/OtherForms'
import ListSameName from '../../components/ListSameName'

import { buildGqlVariables } from '~/utils'
import { buildSearchItemInfo } from '~/utils/person'
import { createCollaborate } from '~/apollo/mutations/collaborate.gql'
import { createPerson } from '~/apollo/mutations/person.gql'
import { searchPersons } from '~/apollo/queries/person.gql'

export default {
  name: 'CreatePerson',
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
        title: '新增人物資料表單',
        content: '臺灣政商人物關係資料庫計畫',
        target: '人物',
        type: 'create',
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
    haveExactlySameName() {
      return this.searchResults.some(
        (item) => item.name === this.person.name.value
      )
    },
  },
  watch: {
    'person.name.value'(value) {
      this.searchResults = []
      if (value) {
        this.searchPersonByText(value)
      }
    },
  },
  mounted() {
    this.clearForm(this.person)
  },

  methods: {
    handleClick() {
      this.$ga.event({
        eventCategory: 'projects',
        eventAction: 'click',
        eventLabel: 'send form',
      })
    },
    searchPersonByText(text) {
      this.$apollo.addSmartQuery('searchResults', {
        query: searchPersons,
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
      if (await !this.checkForm(this.person)) {
        this.goToErrorField()
        return
      }
      this.uploadForm()
    },

    async uploadForm() {
      try {
        // Upload person form
        await this.$apollo.mutate({
          mutation: createPerson,
          variables: {
            data: buildGqlVariables(this.person),
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
        this.clearForm(this.person)
        this.$router.push('/thanks')
      } catch (error) {
        this.hasSubmitError = true
      }
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
