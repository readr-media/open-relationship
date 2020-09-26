<template>
  <div id="Page-Person-verify" class="Form-Page">
    <FormHero :title="hero.title" :content="hero.content" type="verify" />
    <div class="fieldContainer">
      <div class="fieldContainer-notation">
        <span class="verify-star">＊</span>為必填欄位
      </div>
      <form action v-on:submit.prevent="checkForm">
        <FieldBlock
          v-for="field in character"
          :key="field.label"
          :field="field"
          type="verify"
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
import Button from "../../components/Button";
import { characterFields } from "../../fields/characterFields";
import {
  FETCH_PERSONS_COUNT,
  FETCH_RANDOM_PERSON,
  UPDATE_PERSON,
} from "../../graphQL/query/person";
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

      this.$router.push("/thanks");
    },
  },
};
</script>

<style lang="scss" scoped></style>
