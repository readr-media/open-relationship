<template>
  <div id="Page-Person-varify" class="Form-Page">
    <FormHero :title="hero.title" :content="hero.content" type="varify" />
    打＊的欄位不需經過驗證
    <div class="fieldContainer">
      <form action v-on:submit.prevent="checkForm">
        <VarifyFieldBlock
          v-for="field in character"
          :key="field.label"
          :field="field"
        />
        <b-button type="submit">送出</b-button>
      </form>
    </div>
  </div>
</template>

<script>
import FormHero from "../../components/FormHero";
import VarifyFieldBlock from "../../components/VarifyFieldBlock";
import CollaborateFieldBlock from "../../components/CollaborateFieldBlock";

export default {
  data() {
    return {
      hero: {
        title: "驗證人物資料表單",
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
  components: {
    VarifyFieldBlock,
    FormHero,
    CollaborateFieldBlock,
  },
};
</script>

<style lang="scss" scoped></style>
