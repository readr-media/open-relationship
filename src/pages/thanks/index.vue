<template>
  <div id="thanksPage">
    <img :src="READrLogo" id="thanksPage-logo" alt="" />

    <div id="thanksPage-title">THANK YOU!</div>
    <div id="thanksPage-content">
      謝謝你的貢獻！ 接下來你可以：
      <ul>
        <li>點擊在同一個表單新增下一筆資料</li>
        <li>
          去其他表單新增更多資料：
        </li>
        <li>去驗證資料：點擊導到專題頁 anchor at 驗證資料列</li>
        <li>看看現在有哪些公開資料（ 即將開放）</li>
      </ul>
    </div>

    <!-- <RelationButton to="" title="新增組織" dark="true" type="create" /> -->
    <div id="thanksPage-prompt">{{ seconds }}秒後回到主畫面</div>
  </div>
</template>

<script>
import READrLogo from "../../images/READrLogo.svg";
import RelationButton from "../../components/RelationButton";
export default {
  components: {
    RelationButton,
  },
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
    // height: 84px;
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
