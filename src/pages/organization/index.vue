<template>
  <div class="pplPage container main-container">
    <h1>新增組織資料表單</h1>
    <p>
      這是新增台灣政商人物資料的表單 歡迎大家花費 5-10 分鐘的時間幫忙填寫資料
      如果有任何問題 歡迎來信 readr@readr.tw 或是私訊粉專
      https://www.facebook.com/readr.tw/ 我們會有專人為你解答 謝謝你的參與！
    </p>

    <form action v-on:submit.prevent="checkForm">
      <div v-for="field in organization" :key="field.label" class="fieldBlock">
        <h5>{{ field.label }}</h5>
        <p>{{ field.info }}</p>
        <input :type="field.inputStatus.type" v-model="field.value" />
      </div>

      <div class="fieldBlock">
        <h5>協作者的資料與心得</h5>
        <p>
          以下欄位皆選填，請自由填答，
          我們會拿你的資料做什麼、你有什麼好處、我們不會亂來
          blablablabinbinbapsushinomidorikurasushisushiro
        </p>
      </div>

      <div class="fieldBlock">
        <h5>你的大名</h5>
        <input type="text" v-model="editor.name" />
        <h5>你的email address</h5>
        <input type="email" v-model="editor.email" />
        <h5>你的協作心得</h5>
        <textarea
          name
          id
          cols="30"
          rows="10"
          v-model="editor.feedback"
        ></textarea>
      </div>
      <b-button type="submit">送出</b-button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import { graphql } from "../../../graphQL/graphql.util";
import { ADD_ORGANIZATION } from "../../../graphQL/graphql.types";

export default {
  data() {
    return {
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
      editor: {
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
};
</script>

<style lang="scss" scoped>
.fieldBlock {
  padding: 20px;
  margin: 29px auto;
  border: 1px solid #756060;
  box-sizing: border-box;
}
</style>
