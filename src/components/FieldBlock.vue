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
.FieldBlock {
  margin: 10px auto;
  padding: 20px 50px;
  background-color: #ffffff;

  .FieldBlock-title {
    width: 700px;
    height: 29px;
    font-family: PingFangTC;
    font-size: 21px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #000000;
  }

  .FieldBlock-info {
    width: 700px;
    height: 28px;
    font-family: PingFangTC;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.75;
    letter-spacing: normal;
    text-align: justify;
  }

  .input-single {
    width: 100%;
    border: none;
    border-bottom: 1px lightgray solid;
    &:focus {
      outline: none;
    }
  }
}
</style>
