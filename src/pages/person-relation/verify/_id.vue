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
        <template v-for="(field, key) in personRelation">
          <!-- To refactor reverse_relative -->
          <template v-if="key !== 'reverse_relative'">
            <FieldBlock :key="field.label" :field="field" type="verify" />
            <ListSameName
              v-if="key === 'related_person_id'"
              :key="`${key}`"
              :items="searchResults"
              class="FieldBlock"
            />
          </template>
        </template>

        <CollaborateFieldBlock :collaborate="collaborate" />

        <div class="btnContainer">
          <Button title="送出" fitDiv="true" round="true" type="verify" />
          <p v-if="hasSubmitError" class="g-submit-error">
            糟糕！遇到了問題，請稍後再試或聯繫我們
          </p>
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
import { moveGqlToForm } from '~/graphQL/personRelationFormHandler'
import { buildGqlVariables, getRandomId } from '~/utils'
import formMixin from '~/mixins/formMixin'

import More from '~/components/More'
import Footer from '~/components/Footer'
import OtherForms from '~/components/OtherForms'
import ListSameName from '~/components/ListSameName'
import { updatePersonRelation } from '~/apollo/mutations/person-relation.gql'
import {
  fetchPersonRelationById,
  fetchPersonRelationsCount,
  searchPersonRelations,
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
    ListSameName,
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
      hasSubmitError: false,
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
      searchResults: [],
    }
  },
  computed: {
    needUploadToGoogleSheet() {
      return Object.values(this.personRelation).some(
        (field) => 'correctVerify' in field && field.correctVerify !== null
      )
    },
    personRelationIdSpecific() {
      return Number(this.$route.params.id) && this.$route.params.id
    },
  },
  watch: {
    'personRelation.person_id.value.name'() {
      this.searchPersonRelationByName()
    },
    'personRelation.related_person_id.value.name'() {
      this.searchPersonRelationByName()
    },
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
          // To refactor reverse_relative
          delete this.personRelation.reverse_relative
        },
      })
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
              return items
                .filter((item) => item.id !== this.personRelationId)
                .map((item) => ({
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

    uploadHandler() {
      if (!this.checkForm(this.personRelation)) {
        this.goToErrorField()
        return
      }
      this.uploadForm()
    },

    async uploadForm() {
      try {
        await this.$apollo.mutate({
          mutation: updatePersonRelation,
          variables: {
            // put form data to graphql's field
            id: this.personRelationId,
            data: buildGqlVariables(this.personRelation),
          },
        })
        if (this.needUploadToGoogleSheet) {
          this.uploadFormToGoogle(this.personRelation, 'personRelation')
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

<style lang="scss" scoped></style>
