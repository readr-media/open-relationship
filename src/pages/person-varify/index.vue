<template>
  <div id="Page-Person-varify" class="Form-Page">
    <FormHero :title="hero.title" :content="hero.content" type="varify" />
    <div class="fieldContainer">
      打＊的欄位不需經過驗證
      <form action v-on:submit.prevent="checkForm">
        <FieldBlock v-for="field in character" :key="field.label" :field="field" type="varify" />
        <Button title="送出" fitDiv="true" round="true" type="varify" />
      </form>
    </div>
  </div>
</template>

<script>
import FormHero from "../../components/FormHero";
import FieldBlock from "../../components/FieldBlock";
import CollaborateFieldBlock from "../../components/CollaborateFieldBlock";
import Button from "../../components/Button";

import { UPDATE_PERSON } from "../../../graphQL/graphql.types";

import gql from "graphql-tag";
export default {
  data() {
    return {
      personId: 0,
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
          readOnly: true,
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
      // Greet and redirect to home
      // await graphqlHandler(UPDATE_PERSON, {
      //   payload: this.character,
      //   id: this.personId,
      // });

      this.$apollo.mutate({
        mutation: gql`
          mutation(
            $id: ID!
            $name: String!
            $alternative: String
            $other_names: String
            $identifiers: String
            $email: String
            $gender: String
            $birth_date: String
            $death_date: String
            $image: String
            $summary: String
            $biography: String
            $national_identity: String
            $contact_details: String
            $links: String
            $source: String
          ) {
            updatePerson(
              id: $id
              data: {
                name: $name
                alternative: $alternative
                other_names: $other_names
                identifiers: $identifiers
                email: $email
                gender: $gender
                birth_date: $birth_date
                death_date: $death_date
                image: $image
                summary: $summary
                biography: $biography
                national_identity: $national_identity
                contact_details: $contact_details
                links: $links
                source: $source
              }
            ) {
              id
              name
              alternative
              other_names
              identifiers
              email
              gender
              birth_date
              death_date
              image
              summary
              biography
              national_identity
              contact_details
              links
              source
            }
          }
        `,
        variables: {
          id: this.personId,
          name: this.character.name.value,
          alternative: this.character.alternative.value,
          other_names: this.character.other_names.value,
          identifiers: this.character.identifiers.value,
          email: this.character.email.value,
          gender: this.character.gender.value,
          birth_date: this.character.birth_date.value,
          death_date: this.character.death_date.value,
          image: this.character.image.value,
          summary: this.character.summary.value,
          biography: this.character.biography.value,
          national_identity: this.character.national_identity.value,
          contact_details: this.character.contact_details.value,
          links: this.character.links.value,
          source: this.character.source.value,
        },
      });

      alert("感謝您的幫助！");
      // this.$router.push("/");
    },
  },
  components: {
    FieldBlock,
    FormHero,
    CollaborateFieldBlock,
    Button,
  },

  async mounted() {
    await this.$store.dispatch("fetchPersonList");
    const targetPerson = this.$store.getters.getRandomPerson;

    this.personId = targetPerson.id;
    this.character.name.value = targetPerson.name;
    this.character.alternative.value = targetPerson.alternative;
    this.character.other_names.value = targetPerson.other_names;
    this.character.identifiers.value = targetPerson.identifiers;
    this.character.gender.value = targetPerson.gender;
    this.character.email.value = targetPerson.email;
    this.character.birth_date.value = targetPerson.birth_date;
    this.character.death_date.value = targetPerson.death_date;
    this.character.image.value = targetPerson.image;
    this.character.summary.value = targetPerson.summary;
    this.character.biography.value = targetPerson.biography;
    this.character.national_identity.value = targetPerson.national_identity;
    this.character.contact_details.value = targetPerson.contact_details;
    this.character.links.value = targetPerson.links;
  },
};
</script>

<style lang="scss" scoped></style>
