<template>
  <div v-if="field.value.length" class="FieldBlock VarifyFieldBlock">
    <!-- handle title list decoration if read only -->
    <div class="FieldBlock-title">
      <div class="FieldBlock-title-decoration">
        <h5 v-if="field.readOnly" class="star">＊</h5>
        <input v-else type="checkbox" disabled="true" />
      </div>
      {{ field.label }}
    </div>

    <div class="FieldBlock-content">
      <h5 class="FieldBlock-value">{{ field.value }}</h5>

      <div class="FieldBlock-modifier">
        <div class="radioBlock">
          <input type="radio" v-model="modified.flag" value="false" /><label
            >資料正確</label
          >
        </div>
        <div class="radioBlock">
          <input type="radio" v-model="modified.flag" value="true" /><label
            >資料錯誤，正確資料為：</label
          ><input type="text" v-model="modified.payload" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["field"],
  data() {
    return {
      modified: {
        flag: "",
        payload: "",
      },
    };
  },
};
</script>

<style lang="scss">
@import "../styles/FieldBlock.scss";
.fieldContainer {
  width: 800px;
  margin: 50px auto 0;
}

.VarifyFieldBlock {
  .FieldBlock-value {
    height: 29px;

    font-size: 21px;
    font-weight: 600;
  }

  .FieldBlock-title-decoration {
    margin-right: 10px;
    input {
      width: 20px;
      height: 20px;
      transform: translateY(1px);
    }
  }

  .FieldBlock-modifier {
  }
}
</style>
