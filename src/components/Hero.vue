<template>
  <div class="hero">
    <a
      class="hero__logo"
      href="https://www.readr.tw/"
      target="_blank"
      rel="noopener noreferrer"
      @click="handleClick"
    >
      <img :src="READrLogo" alt="READr" />
    </a>

    <!-- <img id="Hero-share" :src="share" alt="" /> -->

    <picture class="hero__background">
      <source media="(min-width:768px)" srcset="../images/bg-hero-md.png" />
      <source
        media="(max-width:767px) and (orientation: landscape)"
        srcset="../images/bg-hero-md.png"
      />
      <img src="../images/bg-hero-sm.png" />
    </picture>

    <div class="hero__content">
      <h1 class="hero__heading">
        臺灣<br /><span class="color--orange">政商人物</span
        ><span class="color--blue">關係</span><br />資料庫計畫
      </h1>
      <p class="hero__description">
        「臺灣政商人物關係資料庫計畫」希望用「開放資料」的格式將散佈在網路上關於公眾人物的公開資料串連起來，包括他們的學歷、經歷、資產、企業關係、選舉經驗、政治獻金、學術論文、報告、親戚關係、甚至每一句公開發言。
      </p>
    </div>
  </div>
</template>

<script>
import READrLogo from '../images/logo.svg'
import share from '../images/share.svg'

export default {
  data() {
    return {
      READrLogo,
      share,
    }
  },
  methods: {
    handleClick() {
      this.$ga.event({
        eventCategory: 'projects',
        eventAction: 'click',
        eventLabel: 'go to readr',
      })
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../styles/responsiveMixin.scss';

.hero {
  position: relative;
  &__logo {
    position: fixed;
    top: 10px;
    left: 10px;
    width: 45px;
    height: 41px;
    z-index: 999;
    @include atMedium {
      top: 20px;
      left: 20px;
      width: 50px;
      height: 50px;
    }
  }
  &__background {
    position: relative;
    z-index: 1;
    display: block;
    img {
      display: block;
      width: 100%;
      height: 100%;
      max-height: 100vh;
      object-fit: cover;
      object-position: center center;
    }
  }
  &__content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 215px;
    padding: 20px 0;
    color: #fff;
    text-align: center;
    background-color: #102c34;
    @include atMedium {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      width: 560px;
      min-height: 50%;
      padding: 40px;
    }
    @include atLarge {
      width: 70%;
      max-width: 840px;
      padding: 60px 0;
    }
  }
  &__heading {
    font-size: 30px;
    font-weight: 600;
    @include atMedium {
      font-size: 40px;
      br {
        display: none;
      }
    }
    @include atLarge {
      font-size: 48px;
    }
  }
  &__description {
    display: none;
    @include atMedium {
      display: block;
      width: 495px;
      margin: 30px auto 0;
      font-weight: 500;
      line-height: 2;
    }
    @include atLarge {
      font-size: 20px;
    }
  }
}

.color {
  &--orange {
    color: #ed8c4a;
  }
  &--blue {
    color: #63c1e2;
  }
}
</style>
