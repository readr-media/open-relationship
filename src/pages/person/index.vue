<template>
  <div id="Page-Person" class="Form-Page">
    <FormHero :title="hero.title" :content="hero.content" type="create" />
    <div class="fieldContainer">
      <span class="create-star">＊</span>為必填欄位
      <form action v-on:submit.prevent="checkForm">
        <FieldBlock
          v-for="field in character"
          :key="field.label"
          :field="field"
          type="create"
        />

        <div class="CollaborateFieldInfo">
          <h5>協作者的資料與心得</h5>
          <p>
            以下欄位皆選填，請自由填答，<br />
            我們會拿你的資料做什麼、你有什麼好處、我們不會亂來
            blablablabinbinbapsushinomidorikurasushisushiro
          </p>
        </div>

        <CollaborateFieldBlock collaborate="collaborate" />
        <!-- <b-button type="submit">送出</b-button> -->
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

import { graphqlHandler } from "../../../graphQL/graphql.util";
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
          needed: true,
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
              { label: "男", value: "男" },
              { label: "女", value: "女" },
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
          inputStatus: { type: "textarea" },
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
      // Greet and redirect to home
      await graphqlHandler(ADD_PERSON, this.character);
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
#Page-Person {
  background-color: #ebebeb;
  .create-star {
    color: #ed8c4a;
    margin: 0;
  }
  .CollaborateFieldInfo {
    h5 {
      height: 40px;
      font-family: PingFangTC;
      font-size: 28px;
      font-weight: 500;
      font-stretch: normal;
      font-style: normal;
      line-height: normal;
      letter-spacing: normal;
      color: #000000;
    }
  }
  p {
    height: 56px;
    font-family: PingFangTC;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.75;
    letter-spacing: normal;
    text-align: justify;
    color: #000000;
  }
}
</style>
