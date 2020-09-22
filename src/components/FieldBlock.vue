<template>
  <div class="FieldBlock">
    <h5 class="FieldBlock-title">{{ field.label }}</h5>
    <p v-if="field.info.length > 0" class="FieldBlock-info">{{ field.info }}</p>

    <!-- handle multi-input just like radio and checkbox -->
    <div v-if="field.inputStatus.type == 'radio'" class="inputWrapper">
      <span v-for="radio in field.inputStatus.multi" :key="radio.label">
        <input type="radio" :value="radio.value" v-model="field.value" /><label
          >{{ radio.label }}</label
        >
      </span>
    </div>
    <!-- handle textarea -->
    <div v-else-if="field.inputStatus.type == 'textarea'" class="inputWrapper">
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
    <div v-else-if="field.inputStatus.type == 'date'" class="inputWrapper">
      <!-- <Datepicker
        v-model="field.value"
        format="yyyy-MM-dd "
        class="input-single"
        placeholder="輸入日期"
        calendar-button-icon="fa fa-calendar"
      /> -->
      <input
        :type="field.inputStatus.type"
        v-model="field.value"
        class="input-single"
      />
    </div>

    <!-- handle single input -->
    <div v-else class="inputWrapper">
      <input
        :type="field.inputStatus.type"
        v-model="field.value"
        class="input-single"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: ["field"],
};
</script>

<style lang="scss">
@import "../styles/FieldBlock.scss";
</style>
