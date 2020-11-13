<template>
  <div id="thanksPage" class="g-bg-green">
    <img id="thanksPage-logo" src="~/assets/logo.svg" alt="READr" />

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
            class="thanksPage__list"
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
            class="thanksPage__list"
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
import RelationButtonContainer from '../../components/RelationButtonContainer'
import relationListMixin from '../../mixins/relationListMixin'

import { fetchAllFormsCount } from '~/apollo/queries/common.gql'

export default {
  components: {
    RelationButtonContainer,
  },
  mixins: [relationListMixin],
  apollo: {
    allFormsCount: {
      query: fetchAllFormsCount,
      update: (data) => data,
      result(result) {
        this.checkFormsHaveItems(result.data)
      },
    },
  },
  data() {
    return {
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
#thanksPage {
  padding-bottom: 47px;
  min-height: 100vh;
  text-align: center;
  ul {
    list-style-position: inside;
    li {
      + li {
        margin-top: 10px;
        @include media-breakpoint-up(lg) {
          margin-top: 20px;
        }
      }
    }
  }
  &-logo {
    width: 60px;
    height: 55px;
    margin: 20px auto 0;

    filter: invert(43%) sepia(100%) saturate(2%) hue-rotate(45deg)
      brightness(206%) contrast(101%);
  }

  &-subtitle {
    margin-top: 20px;
    font-size: 20px;
    font-weight: 600;
    color: #ffffff;
  }

  &-content {
    width: 90%;
    max-width: 500px;
    margin: 20px auto 0;
    text-align: left;
    line-height: 1.75;
    color: #ffffff;
    @include media-breakpoint-up(lg) {
      max-width: 800px;
    }
  }

  &-prompt {
    margin-top: 50px;
    line-height: 1.75;
    color: #ffffff;
    cursor: pointer;
  }

  .smallEnter {
    display: none;
  }
  .thanksPage__list::v-deep {
    > * {
      margin: 10px 0 0;
      @include media-breakpoint-up(lg) {
        flex: 1;
        margin: 0 5px 0;
      }
    }
  }
  @include media-breakpoint-up(lg) {
    .smallEnter {
      display: inline;
    }
    #thanksPage-subtitle {
      font-size: 30px;
      margin-bottom: 40px;
    }
  }
}
</style>
