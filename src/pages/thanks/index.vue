<template>
  <div id="thanksPage">
    <img :src="READrLogo" id="thanksPage-logo" alt="" />

    <div id="thanksPage-title">THANK YOU!</div>
    <div id="thanksPage-content">
      產生沒有意義的文章，供排版時填充版面用，<br />
      但不會因為字義而左右版型的判斷。<br />
      文字、標點符號出現機率大致符合台灣文章習慣。
    </div>
    <div id="thanksPage-prompt">{{ seconds }}秒後回到主畫面</div>
  </div>
</template>

<script>
import READrLogo from "../../images/READr Logo.svg";
export default {
  data() {
    return {
      READrLogo,
      seconds: 3,
    };
  },
  mounted() {
    const countDown = setInterval(() => {
      this.seconds--;
      if (this.seconds == 0) {
        clearInterval(countDown);
        this.$router.push("/");
      }
    }, 1000);
  },
};
</script>

<style lang="scss" scoped>
#thanksPage {
  background-color: #102c34;
  min-height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &-logo {
    width: 60px;
    height: 55px;

    filter: invert(43%) sepia(100%) saturate(2%) hue-rotate(45deg)
      brightness(206%) contrast(101%);

    margin-bottom: 10px;
    // margin-top: -100px;
  }

  &-title {
    width: 1200px;
    height: 70px;
    font-family: Arial;
    font-size: 50px;
    font-weight: 900;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: center;
    color: #ffca54;

    margin: 10px;
  }

  &-content {
    width: 800px;
    height: 84px;
    font-family: PingFangTC;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.75;
    letter-spacing: normal;
    text-align: center;
    color: #ffffff;
  }

  &-prompt {
    margin-top: 50px;
    width: 800px;
    height: 84px;
    font-family: PingFangTC;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.75;
    letter-spacing: normal;
    text-align: center;
    color: #ffffff;
  }
}
</style>
