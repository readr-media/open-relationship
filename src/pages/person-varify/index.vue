<template>
  <div id="Page-Person-varify" class="Form-Page">
    <FormHero :title="hero.title" :content="hero.content" type="varify" />
    <div class="fieldContainer">
      <button @click="handler">Click</button>
      打＊的欄位不需經過驗證
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
  methods: {
    handler() {
      this.$store.dispatch("fetchPersonList");
    },
  },
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
          value: "呂理詣",
          inputStatus: { type: "text" },
          readOnly: true,
        },
        alternative: {
          label: "人物是否有其他名字",
          info: "",
          value: "禮義",
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
          value: "男",
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
          value: "xmage211120@gmail.com",
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
          value: "宅男",
          inputStatus: { type: "text" },
        },
        biography: {
          label: "詳細生平",
          info: "",
          value: "以前是宅男音樂人 現在是宅男工程師",
          inputStatus: { type: "text" },
        },
        national_identity: {
          label: "國籍",
          info: "",
          value: "台灣",
          inputStatus: { type: "text" },
        },
        contact_details: {
          label: "聯絡方式",
          info: "",
          value: "才不告訴膩咧",
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
          value: "本人",
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

<style lang="scss" scoped>
.fieldContainer {
  width: 800px;
  margin: 50px auto 0;
}
</style>
