<template>
  <div id="thanksPage">
    <img id="thanksPage-logo" :src="READrLogo" alt="" />

    <div id="thanksPage-subtitle">謝謝你的貢獻！</div>

    <div id="thanksPage-content">
      接下來你可以：
      <br />
      <br class="smallEnter" />

      <ul>
        <li>
          繼續新增資料
          <RelationButtonContainer
            type="create"
            :filterId="null"
            :dark="true"
            :btnList="createSectionList"
            :small="true"
          />
        </li>
        <li>
          去驗證資料
          <RelationButtonContainer
            type="verify"
            :filterId="null"
            :dark="true"
            :btnList="verifySectionList"
            :small="true"
          />
        </li>
        <li>看看現在有哪些公開資料（ 即將開放）</li>
      </ul>
    </div>

    <!-- <RelationButton to="" title="新增組織" dark="true" type="create" /> -->
    <div id="thanksPage-prompt" @click="returnToHome">回到主畫面</div>
  </div>
</template>

<script>
import READrLogo from '../../images/logo.svg'
import RelationButtonContainer from '../../components/RelationButtonContainer'
import relationListMixin from '../../mixins/relationListMixin'

export default {
  components: {
    RelationButtonContainer,
  },
  mixins: [relationListMixin],
  data() {
    return {
      READrLogo,
      seconds: 8,
    }
  },
  mounted() {
    // const countDown = setInterval(() => {
    //   this.seconds--;
    //   if (this.seconds == 0) {
    //     clearInterval(countDown);
    //     this.$router.push("/");
    //   }
    // }, 1000);
  },
  methods: {
    returnToHome() {
      this.$router.push('/')
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../../styles/responsiveMixin.scss';
#thanksPage {
  width: 100%;
  background-color: #102c34;
  min-height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  ul {
    list-style-position: inside;
  }
  &-logo {
    width: 60px;
    height: 55px;

    filter: invert(43%) sepia(100%) saturate(2%) hue-rotate(45deg)
      brightness(206%) contrast(101%);

    margin-bottom: 10px;
    // margin-top: -100px;
  }

  &-subtitle {
    font-size: 20px;
    font-weight: 600;
    color: #ffffff;
    margin-bottom: 0;
  }

  &-content {
    box-sizing: border-box;
    width: 100%;
    // height: 84px;
    padding: 8px 11px;
    font-family: PingFangTC;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.75;
    letter-spacing: normal;
    text-align: start;
    color: #ffffff;
  }

  &-prompt {
    margin-top: 50px;
    // width: 800px;
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

    cursor: pointer;
  }

  .smallEnter {
    display: none;
  }
  @include atLarge {
    .smallEnter {
      display: inline;
    }
    #thanksPage-subtitle {
      font-size: 30px;
      margin-bottom: 40px;
    }
    #thanksPage-content {
      width: 800px;
    }
  }
}
</style>
