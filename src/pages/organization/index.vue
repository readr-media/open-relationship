<template>
  <div id="Page-Organization" class="Form-Page">
    <FormHero :title="hero.title" :content="hero.content" type="create" />
    <div class="fieldContainer">
      <form action v-on:submit.prevent="checkForm">
        <FieldBlock
          v-for="field in organization"
          :key="field.label"
          :field="field"
        />

        <h5>協作者的資料與心得</h5>
        <p>
          以下欄位皆選填，請自由填答，
          我們會拿你的資料做什麼、你有什麼好處、我們不會亂來
          blablablabinbinbapsushinomidorikurasushisushiro
        </p>
        <CollaborateFieldBlock collaborate="collaborate" />
        <Button title="送出" fitDiv="true" round="true" type="create" />
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

import { graphql } from "../../graphQL/graphql.util";
import { ADD_ORGANIZATION } from "../../graphQL/graphql.types";

import { moveFormToGqlVariable } from "../../graphQL/organizationFormHandler";

export default {
  data() {
    return {
      organizationId: 0,
      hero: {
        title: "新增組織資料表單",
        content: "台灣政商組織資料",
        type: "create",
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
    async checkForm() {
      this.$apollo.mutate({
        mutation: ADD_ORGANIZATION,
        variables: moveFormToGqlVariable(this.organization),
      });
      // Greet and redirect to home

      this.$router.push("/thanks");
    },
  },
  components: {
    FormHero,
    FieldBlock,
    CollaborateFieldBlock,
    Button,
  },

  async mounted() {
    // vuex獲取所有用戶資料
    await this.$store.dispatch("fetchOrganizationList");
    // 獲取隨機資料
    const targetOrganization = this.$store.getters.getRandomOrganization;
    // Put fetched Random person‘s data to form
    this.organizationId = targetPerson.id;
    moveGqlToForm(this.character, targetPerson);
  },
};
</script>

<style lang="scss" scoped>
#Page-Organization {
}
</style>
