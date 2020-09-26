<template>
  <div id="Page-Person-verify" class="Form-Page">
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

export default {
  data() {
    return {
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
  components: {
    FieldBlock,
    FormHero,
    CollaborateFieldBlock,
    Button,
  },
};
</script>

<style lang="scss" scoped></style>
