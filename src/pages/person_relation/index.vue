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
      <form action v-on:submit.prevent="uploadHandler">
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
import { ADD_PERSON_RELATION } from "../../graphQL/query/person_relation";
import { ADD_COLLABORATE } from "../../graphQL/query/collaborate";
import { moveFormToGqlVariable } from "../../graphQL/personRelationFormHandler";
import formMixin from "../../mixins/formMixin";

export default {
  mixins: [formMixin],

  components: {
    FormHero,
    FieldBlock,
    CollaborateFieldBlock,
    Button,
  },
  data() {
    return {
      hero: {
        title: "新增人物關係資料表單",
        content: "臺灣政商人物關係資料庫計畫",
        target: "人物關係",
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
    uploadHandler() {
      if (!this.checkForm(this.personRelation)) return;
      this.uploadForm();
      this.clearForm(this.personRelation);
      this.$router.push("/thanks");
    },

    async uploadForm() {
      // Upload person form
      this.$apollo.mutate({
        mutation: ADD_PERSON_RELATION,
        variables: await moveFormToGqlVariable(this.personRelation),
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
  },
};
</script>

<style lang="scss" scoped>
#Page-Person-Relation {
  width: 100%;

  // background: gold;
}
</style>
