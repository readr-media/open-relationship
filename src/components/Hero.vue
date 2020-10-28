<template>
  <div class="hero">
    <picture class="hero__background">
      <source media="(min-width:768px)" srcset="~/assets/bg-hero-md.png" />
      <source
        media="(max-width:767px) and (orientation: landscape)"
        srcset="~/assets/bg-hero-md.png"
      />
      <img src="~/assets/bg-hero-sm.png" />
    </picture>

    <div class="hero__content g-bg-green">
      <h1 class="hero__heading">
        臺灣<br /><span class="color--orange">政商人物</span
        ><span class="color--blue">關係</span><br />資料庫計畫
      </h1>
      <p class="hero__description" v-text="INTRODUCTION" />
    </div>
  </div>
</template>

<script>
import { INTRODUCTION } from '../constants'

export default {
  data() {
    return {
      INTRODUCTION,
    }
  },
  methods: {},
}
</script>

<style lang="scss" scoped>
.hero {
  position: relative;
  &__background {
    position: relative;
    display: block;
    img {
      display: block;
      width: 100%;
      height: 100%;
      max-height: calc(100vh - #{$header-height});
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
    @include media-breakpoint-up(md) {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      width: 560px;
      min-height: 50%;
      padding: 40px;
    }
    @include media-breakpoint-up(lg) {
      width: 70%;
      max-width: 840px;
      padding: 60px 0;
    }
  }
  &__heading {
    font-size: 30px;
    font-weight: 600;
    @include media-breakpoint-up(md) {
      font-size: 40px;
      br {
        display: none;
      }
    }
    @include media-breakpoint-up(lg) {
      font-size: 48px;
    }
  }
  &__description {
    display: none;
    @include media-breakpoint-up(md) {
      display: block;
      width: 495px;
      margin: 30px auto 0;
      font-weight: 500;
      line-height: 2;
    }
    @include media-breakpoint-up(lg) {
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
