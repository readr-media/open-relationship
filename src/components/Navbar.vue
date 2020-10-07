<template>
  <div id="Navbar">
    <a
      id="Navbar__logo"
      href="https://www.readr.tw/"
      target="_blank"
      rel="noopener noreferrer"
      @click="handleClick"
    >
      <img :src="READrLogo" alt="READr" />
    </a>

    <div id="Navbar__share">
      <img :src="share" @click="folderToggle" />
      <!-- <div class="Navigation-share-folder"></div> -->
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
    folderToggle() {
      // const folder = document.querySelector('.Navbar__share_folder')
      // folder.classList.toggle('Navbar__share_folder_show')
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../styles/responsiveMixin.scss';

#Navbar {
  position: fixed;
  box-sizing: border-box;
  z-index: 20;
  top: 0;
  width: 100%;
  height: 85px;
  display: flex;
  padding: 11px 26px;
  // border-bottom: solid 1px #d8d8d8;

  // background: rgba(255, 255, 255, 0.4);
  // border: solid 1px #d8d8d8;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  &__logo {
    img {
      width: 48px;
      height: 44px;
    }
  }

  &__share {
    img {
      width: 44px;
      height: 44px;
    }
  }

  @include atMedium {
    // width: 50px;
    // height: 50px;
  }
}
</style>
