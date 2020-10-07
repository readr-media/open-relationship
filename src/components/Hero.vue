<template>
  <div class="hero">
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
        這是一個簡單但需要眾人協力的計畫。我們希望用「開放資料」的格式將散佈在網路上關於公眾人物的公開資料串連起來，包括公眾人物的學歷、經歷、資產、政治獻金、學術論文、報告、親戚關係、甚至說過的每一句話。當資料庫成形，人們可以專心在開發應用或是更深入的調查報導，而不是每一次都要從頭蒐集資料。
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {},
}
</script>

<style lang="scss" scoped>
@import '../styles/responsiveMixin.scss';

.hero {
  position: relative;

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
