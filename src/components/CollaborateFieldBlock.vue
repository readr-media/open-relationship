<template>
  <div class="CollaborateFieldBlock FieldBlock">
    <h5 class="FieldBlock-title">你的大名</h5>
    <div class="inputWrapper">
      <input type="text" v-model="collaborate.name" class="input-single" />
    </div>

    <h5 class="FieldBlock-title">你的email address</h5>
    <div class="inputWrapper">
      <input type="text" v-model="collaborate.name" class="input-single" />
    </div>

    <h5 class="FieldBlock-title">你的協作心得</h5>
    <div class="inputWrapper">
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
.CollaborateFieldBlock {
  .FieldBlock-title {
    margin-top: 20px;
    // background: red;
  }
}
</style>
