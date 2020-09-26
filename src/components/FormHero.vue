<template>
  <div id="FormHero">
    <div id="FromHero-logo">
      <img :src="formLogo" alt="" />
    </div>
    <div
      id="FormHero-title"
      :class="{ create: type == 'create', verify: type == 'verify' }"
    >
      <div id="FormHero-title-text">
        {{ title }}
      </div>
    </div>
    <div id="FormHero-content">
      <p>
        這是{{ type == "create" ? "新增" : "驗證"
        }}{{ content }}的表單<br />歡迎大家花費 5-10 分鐘的時間幫忙填寫資料
        <br />如果有任何問題 <br />歡迎來信 readr@readr.tw
        <br />或是私訊粉專https://www.facebook.com/readr.tw/
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
  height: 550px;
  background-color: #102c34;

  display: flex;
  flex-direction: column;
  align-items: center;
  #FromHero-logo {
    width: 93px;
    height: 94px;
    margin: 27px auto;
    img {
      width: 100%;
      height: 100%;
    }
  }

  #FormHero-title {
    height: 50px;
    border-radius: 31px;

    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0px auto 20px;

    #FormHero-title-text {
      // height: 40px;
      font-size: 28px;
      font-weight: 500;
      font-stretch: normal;
      text-align: center;
      color: #ffffff;
      letter-spacing: 2px;
      padding: 5px 18px;
    }
  }
  #FormHero-content {
    width: 270px;
    height: 294px;

    margin: 0 auto 38px;
    p {
      margin: 0;
      width: 100%;
      font-size: 1rem;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.75;
      letter-spacing: normal;
      text-align: center;
      color: #ffffff;
    }
  }

  .create {
    background-color: #ed8c4a;
  }

  .verify {
    background-color: #63c1e2;
  }
}
</style>
