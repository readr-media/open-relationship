<template>
  <div id="Page-Organization" class="Form-Page">
    <FormHero
      :title="hero.title"
      :content="hero.content"
      :target="hero.target"
      type="create"
      :id="hero.id"
    />
    <div class="fieldContainer">
      <span class="create-star">＊</span>為必填欄位
      <form action v-on:submit.prevent="checkForm">
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
  </div>
</template>

<script>
import axios from "axios";
import FormHero from "../../components/FormHero";
import FieldBlock from "../../components/FieldBlock";
import CollaborateFieldBlock from "../../components/CollaborateFieldBlock";
import Button from "../../components/Button";
import { organizationFields } from "../../fields/organizationFields";

import { ADD_ORGANIZATION } from "../../graphQL/query/organization";
import { ADD_COLLABORATE } from "../../graphQL/query/collaborate";
import { moveFormToGqlVariable } from "../../graphQL/organizationFormHandler";

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
        title: "新增組織資料表單",
        content: "台灣政商組織資料",
        target: "組織",
        type: "create",
        id: 2,
      },
      organization: organizationFields,
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
      for (const item of Object.entries(this.organization)) {
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
      this.clearForm(this.organization);
      this.$router.push("/thanks");
    },

    async uploadForm() {
      // Upload person form
      this.$apollo.mutate({
        mutation: ADD_ORGANIZATION,
        variables: await moveFormToGqlVariable(this.organization),
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
#Page-Organization {
  .create-star {
    color: #ed8c4a;
    margin: 0;
  }
}
</style>
