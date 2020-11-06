<template>
  <div class="FieldBlock" :class="{ fieldError: field.formState == false }">
    <div class="FieldBlock-title">
      {{ field.label }}
      <div v-if="field.required" class="FieldBlock-title-decoration">
        <h5 :class="type == 'create' ? 'create-star' : 'verify-star'">＊</h5>
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
      :class="{ textareaAuto: field.inputStatus.size === 'auto' }"
    >
      <textarea
        v-model="field.value"
        name=""
        class="CollaborateFieldBlock-input"
        @change="verifyField(field)"
      ></textarea>
    </div>

    <!-- handle date -->
    <div
      v-else-if="field.inputStatus.type == 'date'"
      class="inputWrapper-single"
    >
      <input
        v-model="field.value"
        placeholder="yyyy-mm-dd"
        @change="verifyField(field)"
      />
    </div>

    <!-- handle relation -->
    <div
      v-else-if="field.inputStatus.type == 'relation'"
      class="inputWrapper-single"
    >
      <RelationInput
        :field="field"
        :readonly="type === 'verify' && field.lockedDuringVerification"
        :verifyField="verifyField"
      />
    </div>

    <div v-else-if="field.inputStatus.type == 'relationMany'">
      <RelationManyInput
        :initialValue="field.value"
        :schemaTarget="field.inputStatus.target"
        @update="updateTags"
      />
    </div>

    <!-- handle single input -->
    <div v-else class="inputWrapper-single">
      <input
        v-model="field.value"
        :readonly="type === 'verify' && field.lockedDuringVerification"
        @change="verifyField(field)"
      />
    </div>

    <!-- error prompt -->
    <div v-if="field.formState == false" class="FieldBlock-error">
      <!-- <div v-for="prompt in errorPrompt" :key="prompt">
        {{ prompt }}
      </div> -->
      <div v-if="errorPromptId === 0">錯誤警告-此欄位為必填</div>
      <div v-if="errorPromptId === 1">錯誤警告-email格式不正確</div>
      <div v-if="errorPromptId === 2">錯誤警告-日期格式不正確</div>
      <div v-if="errorPromptId === 3">錯誤警告-網址格式不正確</div>
    </div>

    <!-- handle verify section -->
    <div
      v-if="type == 'verify' && !field.lockedDuringVerification"
      class="FieldBlock-verify"
    >
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
    <slot />
  </div>
</template>

<script>
import { validateEmail, validateDate, validateUrl } from '../utils/fieldVerify'
import RelationInput from './RelationInput'
import RelationManyInput from './RelationManyInput'

export default {
  components: {
    RelationInput,
    RelationManyInput,
  },
  props: ['field', 'type'],
  data() {
    return {
      errorPromptId: 0,

      verifyStatus: 'pass',
    }
  },

  mounted() {
    // when mounted,initial each field's own error prompt
    if (!this.field.verify) return
    for (let i = 0; i < this.field.verify.length; i++) {
      switch (this.field.verify[i]) {
        case 'required':
          this.errorPromptId = 0
          break
        case 'emailFormat':
          this.errorPromptId = 1
          break
        case 'dateFormat':
          this.errorPromptId = 2
          break
        case 'urlFormat':
          this.errorPromptId = 3
          break
        default:
          break
      }
      if (this.errorPromptId !== null) return
    }
  },
  methods: {
    updateTags(value) {
      this.$emit('updateTags', value)
    },
    verifyField(field) {
      //  return if there is no verify needed
      if (!field.verify) return

      // handle multiple verify
      for (let i = 0; i < field.verify.length; i++) {
        // handle each type of verify
        switch (field.verify[i]) {
          case 'required':
            if (field.inputStatus.type === 'relation' && !field.value?.name) {
              field.formState = false
              this.errorPromptId = 0
            } else if (!field.value) {
              field.formState = false
              this.errorPromptId = 0
            } else {
              field.formState = true
              this.errorPromptId = null
            }
            break

          case 'emailFormat':
            if (validateEmail(field.value) || field.value === '') {
              field.formState = true
              this.errorPromptId = null
            } else {
              field.formState = false
              this.errorPromptId = 1
            }
            break

          case 'dateFormat':
            if (validateDate(field.value) || field.value === '') {
              field.formState = true
              this.errorPromptId = null
            } else {
              field.formState = false
              this.errorPromptId = 2
            }
            break

          case 'urlFormat':
            if (validateUrl(field.value)) {
              field.formState = true
              this.errorPromptId = null
            } else {
              field.formState = false
              this.errorPromptId = 3
            }
            break

          default:
            break
        }
        if (this.errorPromptId !== null) return
      }
    },
  },
}
</script>

<style lang="scss">
@import '../scss/field-block.scss';

.fieldError {
  border: solid 3px #d0021b;
}
</style>
