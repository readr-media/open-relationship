<template>
  <div id="Page-Person-Relation" class="Form-Page">
    <FormHero
      :title="hero.title"
      :content="hero.content"
      :target="hero.target"
      type="create"
      :id="hero.id"
    />

    <div class="fieldContainer">
      <div class="fieldContainer-notation">
        <span class="create-star">＊</span>為必填欄位
      </div>
      <form action v-on:submit.prevent="checkForm">
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
  </div>
</template>

<script>
import axios from "axios";
import FormHero from "../../components/FormHero";
import FieldBlock from "../../components/FieldBlock";
import CollaborateFieldBlock from "../../components/CollaborateFieldBlock";
import Button from "../../components/Button";

import { personRelationFields } from "../../fields/personRelationFields";

import gql from "graphql-tag";
import { ADD_PERSON } from "../../graphQL/query/person";
import { ADD_COLLABORATE } from "../../graphQL/query/collaborate";
import { moveFormToGqlVariable } from "../../graphQL/peopleFormHandler";

export default {
  components: {
    FormHero,
    FieldBlock,
    CollaborateFieldBlock,
    Button,
  },
  data() {
    return {
      hero: {
        title: "新增人物資料表單",
        content: "臺灣政商人物關係資料庫計畫",
        target: "人物",
        type: "create",
        id: 3,
      },
      personRelation: personRelationFields,
      collaborate: {
        name: "",
        email: "",
        feedback: "",
      },
    };
  },
  methods: {
    checkForm() {
      // check form before upload
      for (const item of Object.entries(this.character)) {
        // get form's each field object
        const field = item[1];
        // if there's an unedit field ,but required, return
        if (field.required && field.value == "") {
          field.formState = false;
          return;
        }
        // if there's an uncorrect field ,reutrn
        if (field.formState == false) {
          return;
        }
      }

      this.uploadForm();
      this.clearForm(this.character);

      this.$router.push("/thanks");
    },

    async uploadForm() {
      // Upload character form
      this.$apollo.mutate({
        mutation: ADD_PERSON,
        variables: await moveFormToGqlVariable(this.character),
      });
      // Update collaborate form
      this.$apollo.mutate({
        mutation: ADD_COLLABORATE,
        variables: {
          name: this.collaborate.name,
          email: this.collaborate.email,
          feedback: this.collaborate.feedback,
        },
      });
    },

    clearForm(form) {
      for (const item of Object.entries(form)) {
        // get form's each field object
        const field = item[1];
        field.value = "";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
#Page-Person-Relation {
  width: 100%;

  // background: gold;
}
</style>
