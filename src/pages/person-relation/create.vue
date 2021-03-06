<template>
  <div id="Page-Person-Relation" class="Form-Page">
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
        <template v-for="(field, key) in personRelation">
          <FieldBlock
            v-show="!haveExactlySameName || field.showWhenHasSameNameItem"
            :key="field.label"
            :field="field"
            :personRelation="personRelation"
            type="create"
          />
          <ListSameName
            v-if="key === 'related_person_id'"
            :key="`${key}`"
            :items="searchResults"
            class="FieldBlock"
          />
        </template>
        <template v-if="!haveExactlySameName">
          <CollaborateFieldBlock :collaborate="collaborate" />

          <div class="btnContainer">
            <Button title="送出" fitDiv="true" round="true" type="create" />
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
import FormHero from '../../components/FormHero'
import FieldBlock from '../../components/FieldBlock'
import CollaborateFieldBlock from '../../components/CollaborateFieldBlock'
import Button from '../../components/Button'

import { personRelationFields } from '../../fields/personRelationFields'

import formMixin from '../../mixins/formMixin'

import More from '../../components/More'
import Footer from '../../components/Footer'
import OtherForms from '../../components/OtherForms'
import ListSameName from '~/components/ListSameName'
import { buildGqlVariables } from '~/utils'
import { createCollaborate } from '~/apollo/mutations/collaborate.gql'
import { createPersonRelation } from '~/apollo/mutations/person-relation.gql'
import { createPersons } from '~/apollo/mutations/person.gql'
import { searchPersonRelations } from '~/apollo/queries/person-relation.gql'

export default {
  name: 'CreatePersonRelation',
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
        title: '新增人物關係資料表單',
        content: '臺灣政商人物關係資料庫計畫',
        target: '人物關係',
        type: 'create',
        id: 3,
      },
      personRelation: personRelationFields,
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
    needCreatePerson() {
      return !(
        this.personRelation.person_id.value.id &&
        this.personRelation.related_person_id.value.id
      )
    },
  },
  watch: {
    'personRelation.person_id.value.name'() {
      this.searchPersonRelationByName()
    },
    'personRelation.related_person_id.value.name'() {
      this.searchPersonRelationByName()
    },
  },
  mounted() {
    this.clearForm(this.personRelation)
  },
  methods: {
    buildCreatePersonsVariables() {
      const variables = []
      if (!this.personRelation.person_id.value.id) {
        variables.push(
          this.buildPersonVariable(
            this.personRelation.person_id.value.name,
            this.personRelation.source.value
          )
        )
      }
      if (!this.personRelation.related_person_id.value.id) {
        variables.push(
          this.buildPersonVariable(
            this.personRelation.related_person_id.value.name,
            this.personRelation.source.value
          )
        )
      }
      return { data: variables }
    },
    buildPersonVariable(name, source) {
      return {
        data: {
          name,
          source,
        },
      }
    },
    searchPersonRelationByName() {
      this.searchResults = []
      const personName = this.personRelation?.person_id?.value?.name
      const relatedPersonName = this.personRelation?.related_person_id?.value
        ?.name
      if (personName && relatedPersonName) {
        this.$apollo.addSmartQuery('searchResults', {
          query: searchPersonRelations,
          variables: {
            personName,
            relatedPersonName,
          },
          update: (data) => {
            const items = data.allPersonRelations
            if (items?.length > 0) {
              return items.map((item) => ({
                id: item.id,
                name: `${personName}+${relatedPersonName}`,
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
      if (await !this.checkForm(this.personRelation)) {
        this.goToErrorField()
        return
      }
      this.uploadForm()
    },

    async uploadForm() {
      try {
        if (this.needCreatePerson) {
          const resultCreatePersons = await this.$apollo.mutate({
            mutation: createPersons,
            variables: this.buildCreatePersonsVariables(),
          })
          resultCreatePersons.data.createPersons.forEach((person) => {
            if (this.personRelation.person_id.value.name === person.name) {
              this.personRelation.person_id.value.id = person.id
            } else if (
              this.personRelation.related_person_id.value.name === person.name
            ) {
              this.personRelation.related_person_id.value.id = person.id
            }
          })
        }
        // Upload person form
        await Promise.all([
          this.$apollo.mutate({
            mutation: createPersonRelation,
            variables: {
              data: buildGqlVariables(this.personRelation),
            },
          }),
          this.$apollo.mutate({
            mutation: createPersonRelation,
            variables: {
              data: buildGqlVariables(this.personRelation, true),
            },
          }),
        ])
        // Update collaborate form
        if (this.needCreateCollaborate) {
          await this.$apollo.mutate({
            mutation: createCollaborate,
            variables: {
              name: this.collaborate.name,
              email: this.collaborate.email,
              feedback: this.collaborate.feedback,
            },
          })
        }
        this.clearForm(this.personRelation)
        this.$router.push('/thanks')
      } catch (error) {
        this.hasSubmitError = true
      }
    },
  },
}
</script>

<style lang="scss" scoped>
#Page-Person-Relation {
  width: 100%;

  // background: gold;
}
</style>
