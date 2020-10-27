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
          v-for="field in personOrganization"
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

import { personOrganizationFields } from '../../fields/personOrganizationFields'

import { ADD_PERSON_ORGANIZATION } from '../../graphQL/query/person_organization'
import { ADD_COLLABORATE } from '../../graphQL/query/collaborate'
import { moveFormToGqlVariable } from '../../graphQL/personOrganizationFormHandler'
import formMixin from '../../mixins/formMixin'

import More from '../../components/More'
import Footer from '../../components/Footer'
import OtherForms from '../../components/OtherForms'

export default {
  name: 'CreatePersonOrganization',
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
        title: '新增人物組織關係資料表單',
        content: '臺灣政商人物關係資料庫計畫',
        target: '人物組織關係',
        type: 'create',
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
  mounted() {
    this.clearForm(this.personOrganization)
  },
  methods: {
    async uploadHandler() {
      if (await !this.checkForm(this.personOrganization)) {
        this.goToErrorField()
        return
      }
      this.uploadForm()
      this.clearForm(this.personOrganization)
      this.$router.push('/thanks')
    },

    async uploadForm() {
      // Upload person form
      this.$apollo.mutate({
        mutation: ADD_PERSON_ORGANIZATION,
        variables: await moveFormToGqlVariable(this.personOrganization),
      })
      // Update collaborate form
      this.$apollo.mutate({
        mutation: ADD_COLLABORATE,
        variables: {
          name: this.collaborate.name,
          email: this.collaborate.email,
          feedback: this.collaborate.feedback,
        },
      })
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
