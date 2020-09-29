<template>
  <div class="FieldBlock" :class="{ fieldError: field.formState == false }">
    <div class="FieldBlock-title">
      {{ field.label }}
      <div class="FieldBlock-title-decoration">
        <h5
          v-if="field.required"
          :class="type == 'create' ? 'create-star' : 'verify-star'"
        >
          ＊
        </h5>
      </div>
    </div>
    <div v-if="field.info.length > 0" class="FieldBlock-info">
      <div v-for="singleInfo in field.info" :key="singleInfo">
        {{ singleInfo }}
      </div>
    </div>

    <!-- handle multi-input just like radio and checkbox -->
    <div v-if="field.inputStatus.type == 'radio'" class="inputWrapper-radio">
      <span
        v-for="radio in field.inputStatus.multi"
        :key="radio.label"
        class="radio-wrap"
      >
        <input type="radio" :value="radio.value" v-model="field.value" /><label
          >{{ radio.label }}</label
        >
      </span>
    </div>

    <!-- handle textarea -->
    <div
      v-else-if="field.inputStatus.type == 'textarea'"
      class="inputWrapper-textarea"
    >
      <textarea
        name=""
        v-model="field.value"
        class="CollaborateFieldBlock-input"
      ></textarea>
    </div>

    <!-- handle date -->
    <div
      v-else-if="field.inputStatus.type == 'date'"
      class="inputWrapper-single"
    >
      <!-- <Datepicker
        v-model="field.value"
        format="yyyy-MM-dd "
        class="input-single"
        placeholder="輸入日期"
        calendar-button-icon="fa fa-calendar"
        changedMonth="(e) => verifyField(e)"
      /> -->
      <input
        :type="field.inputStatus.type"
        v-model="field.value"
        @change="(e) => verifyField(e)"
        placeholder="yyyy-mm-dd"
      />
    </div>

    <!-- handle single input -->
    <div v-else class="inputWrapper-single">
      <input
        :type="field.inputStatus.type"
        v-model="field.value"
        @change="(e) => verifyField(e)"
      />
    </div>

    <!-- error prompt -->
    <div v-if="field.formState == false" class="FieldBlock-error">
      <div v-for="prompt in errorPrompt" :key="prompt">
        {{ prompt }}
      </div>
    </div>

    <!-- <div class="FieldBlock-verify">
      <div class="FieldBlock-verify-radioBlock">
        <input type="radio" /><label>資料正確</label>
      </div>
      <div class="FieldBlock-verify-radioBlock">
        <input type="radio" /><label>資料錯誤 正確資料為</label>
        <input type="text" />
      </div>
    </div> -->
  </div>
</template>

<script>
import { validateEmail, validateDate, validateUrl } from "./fieldVerify";
export default {
  props: ["field", "type"],
  data() {
    return {
      errorPrompt: [],
    };
  },
  methods: {
    verifyField() {
      //  return if there is no verify needed
      if (!this.field.verify) return;

      // handle multiple verify
      this.field.verify.forEach((checkItem) => {
        // handle each type of verify
        switch (checkItem) {
          case "required":
            if (this.field.value == "") {
              this.field.formState = false;
            } else {
              this.field.formState = true;
            }
            break;

          case "emailFormat":
            if (validateEmail(this.field.value) || this.field.value == "") {
              this.field.formState = true;
            } else {
              this.field.formState = false;
            }
            break;

          case "dateFormat":
            if (validateDate(this.field.value) || this.field.value == "") {
              this.field.formState = true;
            } else {
              this.field.formState = false;
            }
            break;

          case "urlFormat":
            if (validateUrl(this.field.value) || this.field.value == "") {
              this.field.formState = true;
            } else {
              this.field.formState = false;
            }
            break;

          default:
            break;
        }
      });
    },
  },

  mounted() {
    // when mounted,initial each field's own error prompt
    if (!this.field.verify) return;
    this.field.verify.forEach((checkItem) => {
      switch (checkItem) {
        case "required":
          this.errorPrompt.push("錯誤警告-此欄位為必填");
          break;
        case "emailFormat":
          this.errorPrompt.push("錯誤警告-email格式不正確");
          break;
        case "dateFormat":
          this.errorPrompt.push("錯誤警告-日期格式不正確");
          break;
        case "urlFormat":
          this.errorPrompt.push("錯誤警告-網址格式不正確");
          break;
        default:
          break;
      }
    });
  },
};
</script>

<style lang="scss">
@import "../styles/FieldBlock.scss";

.fieldError {
  border: solid 3px #d0021b;
}
</style>
