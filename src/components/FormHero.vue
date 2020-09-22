<template>
  <div id="FormHero">
    <div id="FromHero-logo">
      <img :src="formLogo" alt="" />
    </div>
    <div
      id="FormHero-title"
      :class="{ create: type == 'create', varify: type == 'varify' }"
    >
      <div id="FormHero-title-text">
        {{ title }}
      </div>
    </div>
    <div id="FormHero-content">
      <p>
        這是新增{{ content }}的表單<br />歡迎大家花費 5-10
        分鐘的時間幫忙填寫資料 <br />如果有任何問題 <br />歡迎來信
        readr@readr.tw 或是私訊粉專https://www.facebook.com/readr.tw/
        <br />我們會有專人為你解答 <br />謝謝你的參與！
      </p>
    </div>
  </div>
</template>

<script>
import createLogo from "../images/orange-03.svg";
import checkLogo from "../images/blue-03.svg";

export default {
  props: ["title", "content", "type"],
  data() {
    return {
      formLogo: this.type == "create" ? createLogo : checkLogo,
    };
  },
  components: {},
};
</script>

<style lang="scss" scoped>
#FormHero {
  width: 100%;
  height: 426px;
  background-color: #102c34;

  display: flex;
  flex-direction: column;
  align-items: center;
  #FromHero-logo {
    width: 146px;
    height: 118px;
    margin: 15px auto 0;
    img {
      width: 100%;
      height: 100%;
    }
  }

  #FormHero-title {
    width: 400px;
    height: 50px;
    border-radius: 31px;

    display: flex;
    align-items: center;
    justify-content: center;
    margin: 17px auto 20px;

    #FormHero-title-text {
      max-width: 800px;
      height: 40px;
      font-size: 28px;
      font-weight: 500;
      font-family: PingFangTC;
      font-stretch: normal;
      font-style: normal;
      line-height: normal;
      text-align: center;
      color: #ffffff;
      letter-spacing: 2px;
    }
  }
  #FormHero-content {
    max-width: 800px;
    height: 162px;

    font-family: PingFangTC;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.75;
    letter-spacing: normal;
    text-align: center;
    color: #ffffff;

    margin: 0 auto 38px;
    p {
      margin: 0;
      width: 100%;
    }
  }

  .create {
    background-color: #ed8c4a;
  }

  .varify {
    background-color: #63c1e2;
  }
}
</style>
