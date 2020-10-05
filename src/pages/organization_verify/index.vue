<template>
  <div id="Page-Organization-verify" class="Form-Page">
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
          v-for="field in organization"
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
      organizationId: 1,
      hero: {
        title: "驗證組織資料表單",
        content: "臺灣政商人物關係資料庫計畫",
        target: "組織",
        type: "verify",
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

  async mounted() {
    await this.fetchOrganizationCount();
  },

  methods: {
    fetchOrganizationCount() {
      // 1 fetch organization counts
      this.$apollo.addSmartQuery("_allOrganizationsMeta", {
        query: FETCH_ORGANIZATIONS_COUNT,
        update(data) {
          //2 get random organizationid from result
          const randomId = getRandomId(data._allOrganizationsMeta.count);
          if (randomId == 0) return;
          // 3 fetch random organization
          this.fetchRandomOrganization(randomId);
        },
      });
      return;
    },
    async fetchRandomOrganization(randomId) {
      // 4 fetch random organization
      this.$apollo.addSmartQuery("Organization", {
        query: FETCH_RANDOM_ORGANIZATION,
        variables() {
          return {
            id: randomId,
          };
        },
        update(data) {
          // 5 set id and move data to form fields
          this.organizationId = data.Organization.id;
          moveGqlToForm(this.organization, data.Organization);
        },
      });
    },

    uploadHandler() {
      if (!this.checkForm(this.organization)) return;
      this.uploadFormToGoogle(this.organization, "organization");

      this.uploadForm();
      this.clearForm(this.organization);
      this.$router.push("/thanks");
    },

    async uploadForm() {
      // Post update data to keystone
      this.$apollo.mutate({
        mutation: UPDATE_ORGANIZATION,
        variables: {
          // put form data to graphql's field
          id: this.organizationId,
          ...moveFormToGqlVariable(this.organization),
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
