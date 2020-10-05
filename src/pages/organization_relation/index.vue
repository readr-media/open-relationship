<template>
  <div id="Page-Person" class="Form-Page">
    <FormHero
      :title="hero.title"
      :content="hero.content"
      :target="hero.target"
      :id="hero.id"
      type="create"
    />

    <div class="fieldContainer">
      <div class="fieldContainer-notation">
        <span class="create-star">＊</span>為必填欄位
      </div>
      <form action v-on:submit.prevent="uploadHandler">
        <FieldBlock
          v-for="field in organizationRelation"
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

import { organizationRelationFields } from "../../fields/organizationRelationFields";

import gql from "graphql-tag";
import { ADD_PERSON } from "../../graphQL/query/person";
import { ADD_COLLABORATE } from "../../graphQL/query/collaborate";
import { moveFormToGqlVariable } from "../../graphQL/peopleFormHandler";

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
        title: "新增組織關係資料表單",
        content: "臺灣政商人物關係資料庫計畫",
        target: "組織關係",
        type: "create",
        id: 4,
      },
      organizationRelation: organizationRelationFields,
      collaborate: {
        name: "",
        email: "",
        feedback: "",
      },
    };
  },
  methods: {
    uploadHandler() {
      this.checkForm(this.organizationRelation);
      this.uploadForm();
      this.clearForm(this.organizationRelation);
      this.$router.push("/thanks");
    },

    async uploadForm() {
      // Upload person form
      this.$apollo.mutate({
        mutation: ADD_PERSON,
        variables: await moveFormToGqlVariable(this.person),
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
#Page-Person {
  width: 100%;

  // background: gold;
}
</style>
