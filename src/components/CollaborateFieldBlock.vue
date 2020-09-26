<template>
  <div class="CollaborateFieldBlock">
    <div class="CollaborateFieldInfo">
      <h5>協作者的資料與心得</h5>
      <p>
        以下欄位皆選填，請自由填答，我們會拿你的資料做什麼、你有什麼好處、我們不會亂來blablablab
      </p>
    </div>

    <div class=" FieldBlock">
      <div class="FieldBlock-title">你的大名</div>
      <div class="inputWrapper-single">
        <input
          type="text"
          v-model="collaborate.name"
          class="CollaborateFieldBlock-input"
        />
      </div>

      <div class="FieldBlock-title">你的email address</div>
      <div class="inputWrapper-single">
        <input
          type="text"
          v-model="collaborate.email"
          class="CollaborateFieldBlock-input"
        />
      </div>

      <div class="FieldBlock-title">你的協作心得</div>
      <div class="inputWrapper-textarea ">
        <textarea
          name=""
          id=""
          v-model="collaborate.feedback"
          class="CollaborateFieldBlock-input"
        ></textarea>
      </div>
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
  width: 100%;
  margin-bottom: 0;
  .CollaborateFieldInfo {
    box-sizing: border-box;
    padding: 30px 15px 0;
    width: 100%;
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
      margin-bottom: 10px;
    }
    p {
      // height: 56px;
      width: 100%;
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
  &-input {
    margin-bottom: 21px;
  }
}
</style>
