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
            以下欄位皆選填，請自由填答，
            <br />我們會拿你的資料做什麼、你有什麼好處、我們不會亂來
            blablablabinbinbapsushinomidorikurasushisushiro
          </p>
        </div>

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

import { ADD_PERSON } from "../../graphQL/graphql.types";

import gql from "graphql-tag";
import { characterFields } from "../../fields/characterFields";

import { moveFormToGqlVariable } from "../../graphQL/peopleFormHandler";

export default {
  data() {
    return {
      hero: {
        title: "新增人物資料表單",
        content: "台灣政商人物資料",
        type: "create",
      },
      character: characterFields,
      collaborate: {
        name: "",
        email: "",
        feedback: "",
      },
    };
  },
  methods: {
    checkForm() {
      // check form before upload
      for (const item of Object.entries(this.character)) {
        // get form's each field object
        const field = item[1];
        // if there's an unedit field ,but required, return
        if (field.required && field.value == "") {
          field.formState = false;
          return;
        }
        // if there's an uncorrect field ,reutrn
        if (field.formState == false) {
          return;
        }
      }
      console.log("upload");
      // this.uploadForm();
    },

    async uploadForm() {
      this.$apollo.mutate({
        mutation: ADD_PERSON,
        variables: await moveFormToGqlVariable(this.character),
      });

      this.$router.push("/thanks");
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
