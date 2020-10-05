<template>
  <div id="Page-Person-verify" class="Form-Page">
    <FormHero
      :title="hero.title"
      :content="hero.content"
      :target="hero.target"
      :id="hero.id"
      type="verify"
    />
    <div class="fieldContainer">
      <div class="fieldContainer-notation">
        <span class="verify-star">＊</span>為必填欄位
      </div>
      <form action v-on:submit.prevent="uploadHandler">
        <FieldBlock
          v-for="field in person"
          :key="field.label"
          :field="field"
          type="verify"
        />
        <div class="btnContainer">
          <Button title="送出" fitDiv="true" round="true" type="verify" />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import FormHero from "../../components/FormHero";
import FieldBlock from "../../components/FieldBlock";
import CollaborateFieldBlock from "../../components/CollaborateFieldBlock";
import Button from "../../components/Button";
import { personFields } from "../../fields/personFields";
import {
  FETCH_PERSONS_COUNT,
  FETCH_RANDOM_PERSON,
  UPDATE_PERSON,
} from "../../graphQL/query/person";
import {
  moveFormToGqlVariable,
  moveGqlToForm,
} from "../../graphQL/personFormHandler";
import { getRandomId } from "../../graphQL/getRandomId";
import gql from "graphql-tag";

import formMixin from "../../mixins/formMixin";

export default {
  mixins: [formMixin],
  components: {
    FieldBlock,
    FormHero,
    CollaborateFieldBlock,
    Button,
  },

  data() {
    return {
      personId: 1,
      hero: {
        title: "驗證人物資料表單",
        content: "臺灣政商人物關係資料庫計畫",
        target: "人物",
        type: "verify",
        id: 1,
      },
      person: personFields,

      collaborate: {
        name: "",
        email: "",
        feedback: "",
      },
    };
  },

  async mounted() {
    await this.fetchPersonCount();
  },

  methods: {
    fetchPersonCount() {
      // 1 fetch person counts
      this.$apollo.addSmartQuery("_allPersonsMeta", {
        query: FETCH_PERSONS_COUNT,
        update(data) {
          //2 get random personid from result
          const randomId = getRandomId(data._allPersonsMeta.count);
          if (randomId == 0) return;
          // 3 fetch random person
          this.fetchRandomPerson(randomId);
        },
      });
      return;
    },
    async fetchRandomPerson(randomId) {
      // 4 fetch random person
      this.$apollo.addSmartQuery("Person", {
        query: FETCH_RANDOM_PERSON,
        variables() {
          return {
            id: randomId,
          };
        },
        update(data) {
          // 5 set id and move data to form fields
          this.personId = data.Person.id;
          moveGqlToForm(this.person, data.Person);
        },
      });
    },
    uploadHandler() {
      if (!this.checkForm(this.person)) return;
      this.uploadFormToGoogle(this.person, "person");
      this.uploadForm();
      this.clearForm(this.person);
      this.$router.push("/thanks");
    },

    async uploadForm() {
      this.$apollo.mutate({
        mutation: UPDATE_PERSON,
        variables: {
          // put form data to graphql's field
          id: this.personId,
          ...moveFormToGqlVariable(this.person),
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
