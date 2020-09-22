<template>
  <div class="FieldBlock">
    <div class="FieldBlock-title">
      <div class="FieldBlock-title-decoration">
        <h5
          v-if="field.needed"
          :class="type == 'create' ? 'create-star' : 'varify-star'"
        >
          ＊
        </h5>
      </div>

      {{ field.label }}
    </div>
    <p v-if="field.info.length > 0" class="FieldBlock-info">{{ field.info }}</p>

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
        class="textarea"
        v-model="field.value"
        id=""
        cols="80"
        rows="10"
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
      /> -->
      <input :type="field.inputStatus.type" v-model="field.value" />
    </div>

    <!-- handle single input -->
    <div v-else class="inputWrapper-single">
      <input :type="field.inputStatus.type" v-model="field.value" />
    </div>
  </div>
</template>

<script>
export default {
  props: ["field", "type"],
};
</script>

<style lang="scss">
@import "../styles/FieldBlock.scss";
</style>
