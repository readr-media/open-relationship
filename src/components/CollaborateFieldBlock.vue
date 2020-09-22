<template>
  <div class="CollaborateFieldBlock FieldBlock">
    <div class="FieldBlock-title">你的大名</div>
    <div class="inputWrapper-single">
      <input type="text" v-model="collaborate.name" />
    </div>

    <div class="FieldBlock-title">你的email address</div>
    <div class="inputWrapper-single">
      <input type="text" v-model="collaborate.name" />
    </div>

    <div class="FieldBlock-title">你的協作心得</div>
    <div class="inputWrapper-single">
      <textarea
        name=""
        id=""
        cols="30"
        rows="10"
        v-model="collaborate.name"
      ></textarea>
    </div>
  </div>
</template>

<script>
export default {
  props: ["collaborate"],
};
</script>

<style lang="scss" scoped>
@import "../styles/FieldBlock.scss";

.CollaborateFieldBlock {
  // .FieldBlock-title {
  //   margin-top: 20px;
  //   // background: red;
  // }
}
</style>
