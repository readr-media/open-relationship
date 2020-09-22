<template>
  <div id="Page-Person">
    <FormHero :title="hero.title" :content="hero.content" type="create" />
    <div class="fieldContainer">
      ＊為必填欄位
      <form action v-on:submit.prevent="checkForm">
        <FieldBlock
          v-for="field in character"
          :key="field.label"
          :field="field"
        />

        <!-- 
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
      </div> -->
        <h5>協作者的資料與心得</h5>
        <p>
          以下欄位皆選填，請自由填答，
          我們會拿你的資料做什麼、你有什麼好處、我們不會亂來
          blablablabinbinbapsushinomidorikurasushisushiro
        </p>
        <CollaborateFieldBlock collaborate="collaborate" />
        <b-button type="submit">送出</b-button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import FormHero from "../../components/FormHero";
import FieldBlock from "../../components/FieldBlock";
import CollaborateFieldBlock from "../../components/CollaborateFieldBlock";

import { graphql } from "../../../graphQL/graphql.util";
import { ADD_PERSON } from "../../../graphQL/graphql.types";

export default {
  data() {
    return {
      hero: {
        title: "新增人物資料表單",
        content: "台灣政商人物資料",
        type: "create",
      },
      character: {
        name: {
          label: "人物的姓名",
          info: "作答示範：原住民名字中間使用半形空格，例：Walis Nokan",
          value: "",
          inputStatus: { type: "text" },
        },
        alternative: {
          label: "人物是否有其他名字",
          info: "",
          value: "",
          inputStatus: { type: "text" },
        },
        other_names: {
          label: "人物是否有其他別稱",
          info: "",
          value: "",
          inputStatus: { type: "text" },
        },
        identifiers: {
          label: "ID",
          info: "",
          value: "",
          inputStatus: { type: "text" },
        },
        gender: {
          label: "人物的生理性別",
          info: "",
          value: "",
          inputStatus: {
            type: "radio",
            multi: [
              { label: "男", value: "male" },
              { label: "女", value: "female" },
            ],
          },
        },
        email: {
          label: "人物的電子信箱",
          info: "作答示範：readr123@gmail.com",
          value: "",
          inputStatus: { type: "text" },
        },
        birth_date: {
          label: "出生日期",
          info: "",
          value: "",
          inputStatus: { type: "date" },
        },
        death_date: {
          label: "死亡日期",
          info: "",
          value: "",
          inputStatus: { type: "date" },
        },
        image: {
          label: "大頭照",
          info: "",
          value: "",
          inputStatus: { type: "text" },
        },
        summary: {
          label: "一句話描寫這個人",
          info: "",
          value: "",
          inputStatus: { type: "text" },
        },
        biography: {
          label: "詳細生平",
          info: "",
          value: "",
          inputStatus: { type: "text" },
        },
        national_identity: {
          label: "國籍",
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
        source: {
          label: "資料來源",
          info: "",
          value: "",
          inputStatus: { type: "text" },
        },
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
      } = this.character;

      // commit to graphQL
      await graphql(ADD_PERSON, {
        name: name.value,
        alternative: alternative.value,
        other_names: other_names.value,
        identifiers: other_names.identifiers,
        email: email.value,
        gender: gender.value,
        birth_date: birth_date.value.length ? birth_date.value : null,
        death_date: death_date.value.length ? death_date.value : null,
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

  components: {
    FormHero,
    FieldBlock,
    CollaborateFieldBlock,
  },
};
</script>

<style lang="scss" scoped>
#Page-Person {
  background-color: #ebebeb;
}

.fieldContainer {
  width: 800px;
  margin: 50px auto 0;
}
</style>
