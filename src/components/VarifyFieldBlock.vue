<template>
  <div v-if="field.value.length" class="FieldBlock VarifyFieldBlock">
    <!-- handle title list decoration if read only -->
    <div class="FieldBlock-title">
      <h5 v-if="field.readOnly" class="star">＊</h5>
      <input v-else type="checkbox" />
      <h5>{{ field.label }}</h5>
    </div>

    <h5 class="field-value">{{ field.value }}</h5>
    <div v-if="!field.readOnly" class="field-modifier">
      <div class="checkbox-field">
        <input type="radio" /><label>資料正確</label>
      </div>
      <div class="checkbox-field">
        <input type="radio" /><label>資料錯誤，正確資料為</label>
        <!-- handle multi-input just like radio and checkbox -->
        <div v-if="field.inputStatus.type == 'radio'" class="inputWrapper">
          <span v-for="radio in field.inputStatus.multi" :key="radio.label">
            <input
              type="radio"
              :value="radio.value"
              v-model="field.value"
            /><label>{{ radio.label }}</label>
          </span>
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

.VarifyFieldBlock {
  .field-value {
    height: 29px;

    font-size: 21px;
    font-weight: 600;
  }

  .field-modifier {
  }
}
</style>
