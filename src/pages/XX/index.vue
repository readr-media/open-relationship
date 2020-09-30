<template>
  <div class="personRelationPage container main-container">
    <h1>新增人物組織關係表單</h1>
    <p>
      這是新增台灣人物組織關係的表單 歡迎大家花費 5-10 分鐘的時間幫忙填寫資料
      如果有任何問題 歡迎來信 readr@readr.tw 或是私訊粉專
      https://www.facebook.com/readr.tw/ 我們會有專人為你解答 謝謝你的參與！
    </p>

    <form action v-on:submit.prevent="checkForm">
      <div
        v-for="field in personRelation"
        :key="field.label"
        class="fieldBlock"
      >
        <h5>{{ field.label }}</h5>
        <p>{{ field.info }}</p>

        <div v-if="field.inputStatus.type == 'reference'" class="inputWrapper">
          <ReferenceInput :field="field" />
        </div>

        <div v-else class="inputWrapper">
          <input :type="field.inputStatus.type" v-model="field.value" />
        </div>
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

import { ADD_PERSON } from "../../graphQL/query/person";
import ReferenceInput from "../../components/ReferenceInput";

export default {
  components: {
    ReferenceInput,
  },
  data() {
    return {
      personRelation: {
        person_id: {
          label: "人物名稱",
          info: "",
          value: "",
          inputStatus: { type: "reference" },
        },
        organization_id: {
          label: "組織名稱",
          info: "",
          value: "",
          inputStatus: { type: "reference" },
        },
        role: {
          label: "職位名稱",
          info: "",
          value: "",
          inputStatus: { type: "text" },
        },
        start_date: {
          label: "起始時間",
          info: "",
          value: "",
          inputStatus: { type: "date" },
        },
        end_date: {
          label: "結束時間",
          info: "",
          value: "",
          inputStatus: { type: "date" },
        },
        source: {
          label: "資料來源",
          info: "",
          value: "",
          inputStatus: { type: "text" },
        },
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
      // destructure person field
      const {
        name,
        alternative,
        other_names,
        identifiers,
        email,
        gender,
        birth_date,
        death_date,
        image,
        summary,
        biography,
        national_identity,
        contact_details,
        links,
        source,
      } = this.person;

      // commit to graphQL
      await graphql(ADD_PERSON, {
        name: name.value,
        alternative: alternative.value,
        other_names: other_names.value,
        identifiers: other_names.identifiers,
        email: email.value,
        gender: gender.value,
        birth_date: birth_date.value.length ? birth_date.value.length : null,
        death_date: death_date.value.length ? eath_date.value : null,
        image: image.value,
        summary: summary.value,
        biography: biography.value,
        national_identity: national_identity.value,
        contact_details: contact_details.value,
        links: links.value,
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
