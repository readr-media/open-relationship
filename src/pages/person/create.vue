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
          v-for="field in person"
          :key="field.label"
          :field="field"
          type="create"
          @updateTags="updateTags"
        />

        <CollaborateFieldBlock :collaborate="collaborate" />

        <div class="btnContainer">
          <Button
            title="送出"
            fitDiv="true"
            round="true"
            type="create"
            @click="handleClick"
          />
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

import { personFields } from '../../fields/personFields'

import { ADD_PERSON } from '../../graphQL/query/person'
import { ADD_COLLABORATE } from '../../graphQL/query/collaborate'
import { moveFormToGqlVariable } from '../../graphQL/personFormHandler'
import formMixin from '../../mixins/formMixin'

import More from '../../components/More'
import Footer from '../../components/Footer'
import OtherForms from '../../components/OtherForms'

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
  },
  mixins: [formMixin],
  data() {
    return {
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
    }
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
    updateTags(value) {
      this.person.tags.value = value.map((item) => ({ id: item.id }))
    },

    async uploadHandler() {
      if (await !this.checkForm(this.person)) {
        this.goToErrorField()
        return
      }
      this.uploadForm()
      this.clearForm(this.person)
      this.$router.push('/thanks')
    },

    async uploadForm() {
      // Upload person form
      this.$apollo.mutate({
        mutation: ADD_PERSON,
        variables: await moveFormToGqlVariable(this.person),
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
