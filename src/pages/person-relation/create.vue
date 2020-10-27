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
        <FieldBlock
          v-for="field in personRelation"
          :key="field.label"
          :field="field"
          type="create"
        />

        <CollaborateFieldBlock :collaborate="collaborate" />

        <div class="btnContainer">
          <Button title="送出" fitDiv="true" round="true" type="create" />
        </div>
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

import { ADD_PERSON_RELATION } from '../../graphQL/query/person_relation'
import { ADD_COLLABORATE } from '../../graphQL/query/collaborate'
import { moveFormToGqlVariable } from '../../graphQL/personRelationFormHandler'
import formMixin from '../../mixins/formMixin'

import More from '../../components/More'
import Footer from '../../components/Footer'
import OtherForms from '../../components/OtherForms'
import { createPersons } from '~/apollo/queries/persons.gql'

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
  },
  mixins: [formMixin],
  data() {
    return {
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
    }
  },
  computed: {
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
    async uploadHandler() {
      // if there's any form format error,scroll to it.
      if (await !this.checkForm(this.personRelation)) {
        this.goToErrorField()
        return
      }
      this.uploadForm()
    },

    async uploadForm() {
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
      await this.$apollo.mutate({
        mutation: ADD_PERSON_RELATION,
        variables: moveFormToGqlVariable(this.personRelation),
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
      this.clearForm(this.personRelation)
      this.$router.push('/thanks')
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
