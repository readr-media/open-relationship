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
        <input v-model="field.value" type="radio" :value="radio.value" /><label
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
        v-model="field.value"
        name=""
        class="CollaborateFieldBlock-input"
      ></textarea>
    </div>

    <!-- handle date -->
    <div
      v-else-if="field.inputStatus.type == 'date'"
      class="inputWrapper-single"
    >
      <input
        v-model="field.value"
        @change="verifyField(field)"
        placeholder="yyyy-mm-dd"
      />
    </div>

    <!-- handle relation -->
    <div
      v-else-if="field.inputStatus.type == 'relation'"
      class="inputWrapper-single"
    >
      <RelationInput :field="field" :verifyField="verifyField" />
    </div>

    <!-- handle single input -->
    <div v-else class="inputWrapper-single">
      <input v-model="field.value" @change="verifyField(field)" />
    </div>

    <!-- error prompt -->
    <div v-if="field.formState == false" class="FieldBlock-error">
      <div v-for="prompt in errorPrompt" :key="prompt">
        {{ prompt }}
      </div>
    </div>

    <!-- handle verify section -->
    <div v-if="type == 'verify'" class="FieldBlock-verify">
      <div class="FieldBlock-verify-radioBlock">
        <input v-model="field.correctVerify" type="radio" :value="true" /><label
          >資料正確</label
        >
      </div>
      <div class="FieldBlock-verify-radioBlock">
        <input
          v-model="field.correctVerify"
          type="radio"
          :value="false"
        /><label>資料錯誤</label>
      </div>
    </div>
  </div>
</template>

<script>
import { validateEmail, validateDate, validateUrl } from '../utils/fieldVerify'
import RelationInput from './RelationInput'

export default {
  props: ['field', 'type'],
  components: {
    RelationInput,
  },
  data() {
    return {
      errorPrompt: [],
      verifyStatus: 'pass',
    }
  },

  mounted() {
    // when mounted,initial each field's own error prompt
    if (!this.field.verify) return
    this.field.verify.forEach((checkItem) => {
      switch (checkItem) {
        case 'required':
          this.errorPrompt.push('錯誤警告-此欄位為必填')
          break
        case 'emailFormat':
          this.errorPrompt.push('錯誤警告-email格式不正確')
          break
        case 'dateFormat':
          this.errorPrompt.push('錯誤警告-日期格式不正確')
          break
        case 'urlFormat':
          this.errorPrompt.push('錯誤警告-網址格式不正確')
          break
        default:
          break
      }
    })
  },
  methods: {
    verifyField(field) {
      console.log(field)
      //  return if there is no verify needed
      if (!field.verify) return

      // handle multiple verify
      field.verify.forEach((checkItem) => {
        // handle each type of verify
        switch (checkItem) {
          case 'required':
            if (field.value == '') {
              field.formState = false
            } else {
              field.formState = true
            }
            break

          case 'emailFormat':
            if (validateEmail(field.value) || field.value == '') {
              field.formState = true
            } else {
              field.formState = false
            }
            break

          case 'dateFormat':
            if (validateDate(field.value) || field.value == '') {
              field.formState = true
            } else {
              field.formState = false
            }
            break

          case 'urlFormat':
            if (validateUrl(field.value) || field.value == '') {
              field.formState = true
            } else {
              field.formState = false
            }
            break

          default:
            break
        }
      })
    },
  },
}
</script>

<style lang="scss">
@import '../styles/FieldBlock.scss';

.fieldError {
  border: solid 3px #d0021b;
}
</style>
