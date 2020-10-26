<template>
  <div class="CollaborateFieldBlock">
    <div class="CollaborateFieldInfo">
      <h5>協作者個人資訊</h5>
      <p>可選擇是否留下你的大名、Email 及心得，並提交問卷</p>
    </div>

    <div class="FieldBlock">
      <div class="FieldBlock-title">你的大名（選填）</div>
      <p class="FieldBlock-info">
        預計會在專題頁面上放上你的名字，感謝你的協作！
      </p>

      <div class="inputWrapper-single">
        <input
          v-model="collaborate.name"
          type="text"
          class="CollaborateFieldBlock-input"
        />
      </div>

      <div class="FieldBlock-title">你的 email（選填）</div>
      <p class="FieldBlock-info">專題上線時，我們將於第一時間與你分享！</p>

      <div class="inputWrapper-single">
        <input
          v-model="collaborate.email"
          type="text"
          class="CollaborateFieldBlock-input"
        />
      </div>

      <div class="FieldBlock-title">你的協作心得（選填）</div>
      <p class="FieldBlock-info">你的回饋，是 READr 推動專題的原動力！</p>

      <div class="inputWrapper-textarea">
        <textarea
          id=""
          v-model="collaborate.feedback"
          name=""
          class="CollaborateFieldBlock-input"
        ></textarea>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['collaborate'],
}
</script>

<style lang="scss" scoped>
@import '../scss/FieldBlock.scss';
@import '../scss/responsiveMixin.scss';

.CollaborateFieldBlock {
  width: 100%;
  margin-bottom: 0;
  .CollaborateFieldInfo {
    box-sizing: border-box;
    padding: 30px 15px 0;
    width: 100%;
    h5 {
      height: 40px;
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

  @include atMedium {
    .CollaborateFieldInfo {
      padding: 30px 0 0;
    }
  }
}
</style>
