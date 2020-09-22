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

import { graphql } from "../../../graphQL/graphql.util";
import { ADD_ORGANIZATION } from "../../../graphQL/graphql.types";

export default {
  data() {
    return {
      hero: {
        title: "新增組織資料表單",
        content: "台灣政商組織資料",
        type: "create",
      },
      organization: {
        name: {
          label: "組織名稱",
          info: "",
          value: "",
          inputStatus: { type: "text" },
        },
        alternative: {
          label: "組織別名",
          info: "",
          value: "",
          inputStatus: { type: "text" },
        },
        other_names: {
          label: "組織舊名",
          info: "",
          value: "",
          inputStatus: { type: "text" },
        },
        identifiers: {
          label: "統一編號",
          info: "",
          value: "",
          inputStatus: { type: "text" },
        },
        classification: {
          label: "組織類型",
          info: "",
          value: "",
          inputStatus: { type: "text" },
        },
        area: {
          label: "組織地區",
          info: "",
          value: "",
          inputStatus: { type: "text" },
        },
        abstract: {
          label: "一句話描述該組織",
          info: "",
          value: "",
          inputStatus: { type: "text" },
        },
        description: {
          label: "組織詳細介紹",
          info: "",
          value: "",
          inputStatus: { type: "text" },
        },
        founding_date: {
          label: "創立時間",
          info: "",
          value: "",
          inputStatus: { type: "date" },
        },
        dissolution_date: {
          label: "解散時間",
          info: "",
          value: "",
          inputStatus: { type: "date" },
        },
        image: {
          label: "圖像",
          info: "",
          value: "",
          inputStatus: { type: "text" },
        },
        contact_details: {
          label: "聯絡方式",
          info: "",
          value: "",
          inputStatus: { type: "text" },
        },
        links: {
          label: "網站",
          info: "",
          value: "",
          inputStatus: { type: "text" },
        },
        address: {
          label: "組織稅籍登記地址",
          info: "",
          value: "",
          inputStatus: { type: "text" },
        },
        source: {
          label: "來源",
          info: "",
          value: "",
          inputStatus: { type: "text" },
        },
        //area: { label: "地區", type: Relationship, many: false, ref: 'Area' },
        //memberships: { label: "成員", type: Relationship, many: true, ref: 'Membership' },
        //posts: { label: "posts", type: Relationship, many: true, ref: 'Post' },
        //motions: { label: "發起活動", type: Relationship, many: true, ref: 'Motion' },
        //vote_events: { label: "選舉/投票", type: Relationship, many: true, ref: 'Vote_event' },
        //votes: { label: "votes", type: Relationship, many: true, ref: 'Vote' },
        //identifiers: { label: "identifiers", type: Relationship, many: false, ref: 'User',  isRequired: true},
      },
      collaborate: {
        name: "",
        email: "",
        feedback: "",
      },
    };
  },
  methods: {
    async checkForm() {
      // destructure character field
      const {
        name,
        alternative,
        other_names,
        identifiers,
        classification,
        area,
        abstract,
        description,
        founding_date,
        dissolution_date,
        image,
        contact_details,
        links,
        address,
        source,
      } = this.organization;

      // commit to graphQL
      await graphql(ADD_ORGANIZATION, {
        name: name.value,
        alternative: alternative.value,
        other_names: other_names.value,
        identifiers: identifiers.value,
        classification: classification.value,
        area: area.value,
        abstract: abstract.value,
        description: description.value,
        founding_date: founding_date.value,
        dissolution_date: dissolution_date.value,
        image: image.value,
        contact_details: contact_details.value,
        links: links.value,
        address: address.value,
        source: source.value,
      });

      // Greet and redirect to home

      alert("感謝您的幫助！");
      this.$router.push("/");
    },
  },
  components: {
    FormHero,
    FieldBlock,
    CollaborateFieldBlock,
    Button,
  },
};
</script>

<style lang="scss" scoped>
#Page-Organization {
}
</style>
