<template>
  <div class="CollaborateFieldBlock FieldBlock">
    <div class="FieldBlock-title">你的大名</div>
    <div class="inputWrapper-single">
      <input type="text" v-model="collaborate.name" />
    </div>

    <div class="FieldBlock-title">你的email address</div>
    <div class="inputWrapper-single">
      <input type="text" v-model="collaborate.email" />
    </div>

    <div class="FieldBlock-title">你的協作心得</div>
    <div class="inputWrapper-single">
      <textarea
        name=""
        id=""
        cols="30"
        rows="10"
        v-model="collaborate.feedback"
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
  .CollaborateFieldInfo {
    h5 {
      height: 40px;
      font-family: PingFangTC;
      font-size: 28px;
      font-weight: 500;
      font-stretch: normal;
      font-style: normal;
      line-height: normal;
      letter-spacing: normal;
      color: #000000;
    }
  }
  p {
    height: 56px;
    font-family: PingFangTC;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.75;
    letter-spacing: normal;
    text-align: justify;
    color: #000000;
  }
}
</style>
