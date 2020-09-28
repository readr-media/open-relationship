<template>
  <div id="Page-Organization-verify" class="Form-Page">
    <FormHero :title="hero.title" :content="hero.content" type="verify" />
    <div class="fieldContainer">
      <div class="fieldContainer-notation">
        <span class="verify-star">＊</span>為必填欄位
      </div>
      <form action v-on:submit.prevent="checkForm">
        <FieldBlock
          v-for="field in organization"
          :key="field.label"
          :field="field"
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
import { organizationFields } from "../../fields/organizationFields";
import Button from "../../components/Button";

import {
  FETCH_ORGANIZATIONS_COUNT,
  FETCH_RANDOM_ORGANIZATION,
  UPDATE_ORGANIZATION,
} from "../../graphQL/query/organization";

import { getRandomId } from "../../graphQL/getRandomId";
import {
  moveFormToGqlVariable,
  moveGqlToForm,
} from "../../graphQL/organizationFormHandler";

export default {
  components: {
    FieldBlock,
    FormHero,
    CollaborateFieldBlock,
    Button,
  },
  data() {
    return {
      organizationId: 1,
      hero: {
        title: "驗證人物資料表單",
        content: "台灣政商人物資料",
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

  apollo: {
    _allOrganizationsMeta: {
      query: FETCH_ORGANIZATIONS_COUNT,
    },
  },

  async mounted() {
    setTimeout(() => {
      // 利用隨機ID獲取隨機資料
      this.$apollo.addSmartQuery("Organization", {
        query: FETCH_RANDOM_ORGANIZATION,
        variables() {
          const count = this._allOrganizationsMeta.count;
          const randomId = getRandomId(count);
          return {
            id: randomId,
          };
        },
      });
    }, 500);

    setTimeout(() => {
      this.organizationId = this._data.Organization.id;
      moveGqlToForm(this.organization, this._data.Organization);
    }, 800);
  },

  methods: {
    async checkForm() {
      // Post update data to keystone
      this.$apollo.mutate({
        mutation: UPDATE_ORGANIZATION,
        variables: {
          // put form data to graphql's field
          id: this.organizationId,
          ...moveFormToGqlVariable(this.organization),
        },
      });

      this.$router.push("/thanks");
    },
  },
};
</script>

<style lang="scss" scoped></style>
