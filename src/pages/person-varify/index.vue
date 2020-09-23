<template>
  <div id="Page-Person-varify" class="Form-Page">
    <FormHero :title="hero.title" :content="hero.content" type="varify" />

    <!-- <div v-if="$apollo.loading">Loading...</div> -->
    <div class="fieldContainer">
      打＊的欄位不需經過驗證
      <form action v-on:submit.prevent="checkForm">
        <FieldBlock
          v-for="field in character"
          :key="field.label"
          :field="field"
          type="varify"
        />
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
import { characterFields } from "../../fields/characterFields";
import {
  FETCH_PERSONS_COUNT,
  FETCH_RANDOM_PERSON,
  UPDATE_PERSON,
} from "../../graphQL/graphql.types";
import {
  moveFormToGqlVariable,
  moveGqlToForm,
} from "../../graphQL/peopleFormHandler";
import { getRandomId } from "../../graphQL/getRandomId";
import gql from "graphql-tag";

export default {
  components: {
    FieldBlock,
    FormHero,
    CollaborateFieldBlock,
    Button,
  },

  data() {
    return {
      personId: 1,
      hero: {
        title: "驗證人物資料表單",
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
  apollo: {
    _allPersonsMeta: {
      query: FETCH_PERSONS_COUNT,
    },
    // Person: {
    //   query: FETCH_RANDOM_PERSON,
    //   variables() {
    //     const count = 4;
    //     const randomId = getRandomId(count);
    //     console.log(randomId);
    //     return {
    //       id: randomId,
    //     };
    //   },
    // },
  },

  async mounted() {
    setTimeout(() => {
      // 利用隨機ID獲取隨機資料
      this.$apollo.addSmartQuery("Person", {
        query: FETCH_RANDOM_PERSON,
        variables() {
          const count = this._allPersonsMeta.count;
          const randomId = getRandomId(count);
          return {
            id: randomId,
          };
        },
      });
    }, 500);

    setTimeout(() => {
      this.personId = this._data.Person.id;
      moveGqlToForm(this.character, this._data.Person);
    }, 800);
  },

  methods: {
    async checkForm() {
      // Post update data to keystone
      this.$apollo.mutate({
        mutation: UPDATE_PERSON,
        variables: {
          // put form data to graphql's field
          id: this.personId,
          ...moveFormToGqlVariable(this.character),
        },
      });

      alert("感謝您的幫助！");
      this.$router.push("/");
    },
  },
};
</script>

<style lang="scss" scoped></style>
