<template>
  <div id="Page-Organization" class="Form-Page">
    <FormHero
      :id="hero.id"
      :title="hero.title"
      :content="hero.content"
      :target="hero.target"
      type="create"
    />
    <div class="fieldContainer">
      <span class="create-star">＊</span>為必填欄位
      <form action @submit.prevent="uploadHandler">
        <FieldBlock
          v-for="field in organization"
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
import { organizationFields } from '../../fields/organizationFields'

import { ADD_ORGANIZATION } from '../../graphQL/query/organization'
import { ADD_COLLABORATE } from '../../graphQL/query/collaborate'
import { moveFormToGqlVariable } from '../../graphQL/organizationFormHandler'

import formMixin from '../../mixins/formMixin'

import More from '../../components/More'
import Footer from '../../components/Footer'
import OtherForms from '../../components/OtherForms'

export default {
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
        title: '新增組織資料表單',
        content: '臺灣政商人物關係資料庫計畫',
        target: '組織',
        type: 'create',
        id: 2,
      },
      organization: organizationFields,
      collaborate: {
        name: '',
        email: '',
        feedback: '',
      },
    }
  },
  mounted() {
    this.clearForm(this.organization)
  },
  methods: {
    async uploadHandler() {
      if (await !this.checkForm(this.organization)) {
        this.goToErrorField()
        return
      }
      this.uploadForm()
      this.clearForm(this.organization)
      this.$router.push('/thanks')
    },

    async uploadForm() {
      // Upload person form
      this.$apollo.mutate({
        mutation: ADD_ORGANIZATION,
        variables: await moveFormToGqlVariable(this.organization),
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
#Page-Organization {
  .create-star {
    color: #ed8c4a;
    margin: 0;
  }
}
</style>
