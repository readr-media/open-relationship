<template>
  <header class="header">
    <a
      class="header__logo"
      href="https://www.readr.tw/"
      target="_blank"
      rel="noopener noreferrer"
      @click="handleClick('go to readr')"
    >
      <img src="~/assets/logo.svg" alt="READr" />
    </a>

    <div class="header__share">
      <img
        class="toggle"
        src="~/assets/share.svg"
        alt="分享"
        @click="toggleShareIcons"
      />
      <div :class="{ active: shareIconsIsActive }" class="header__share-icons">
        <a
          class="icon facebook"
          :href="`https://www.facebook.com/share.php?u=${url}`"
          target="_blank"
          rel="noopener noreferrer"
          @click="handleClick('share to fb')"
        >
          <img src="~/assets/facebook.svg" alt="分享至 Facebook" />
        </a>
        <a
          class="icon line"
          :href="`https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(
            url
          )}`"
          target="_blank"
          rel="noopener noreferrer"
          @click="handleClick('share to line')"
        >
          <img src="~/assets/line.svg" alt="分享至 Line" />
        </a>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      shareIconsIsActive: false,
      url: undefined,
    }
  },
  mounted() {
    this.url = window.location.href
  },
  methods: {
    handleClick(eventLabel) {
      this.$ga.event({
        eventCategory: 'projects',
        eventAction: 'click',
        eventLabel,
      })
    },
    toggleShareIcons() {
      this.shareIconsIsActive = !this.shareIconsIsActive
    },
  },
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  height: $header-height;
  padding: 0 20px;
  background-color: #fff;
  border-bottom: solid 1px #d8d8d8;
  @include media-breakpoint-up(lg) {
    padding: 0 26px;
  }
  &__logo {
    display: block;
    img {
      display: block;
      width: 48px;
      height: 44px;
    }
  }
  &__share {
    position: relative;
    margin: 0 0 0 auto;
    img {
      display: block;
      width: 42px;
      height: 42px;
    }
    .toggle {
      cursor: pointer;
    }
  }
  &__share-icons {
    &.active {
      display: block;
      .icon {
        visibility: visible;
        transition: all 0.2s ease-in-out;
      }
      .facebook {
        transform: translateY(55px);
      }
      .line {
        transform: translateY(110px);
      }
    }
    .icon {
      position: absolute;
      top: 0;
      left: 0;
      transform: translateY(45px);
      transition: all 0s ease-in-out;
      visibility: hidden;
    }
  }
}
</style>
