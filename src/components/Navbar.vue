<template>
  <header class="header">
    <a
      class="header__logo"
      href="https://www.readr.tw/"
      target="_blank"
      rel="noopener noreferrer"
      @click="handleClick"
    >
      <img :src="READrLogo" alt="READr" />
    </a>

    <!-- <div class="header__share">
      <img
        :src="share"
        class="header__share_toggle_button"
        @click="folderToggle"
      />
      <div class="header__share_folder">
        <a
          v-for="icon in shareList"
          :key="icon.id"
          class="header__share_folder_icon"
          :href="icon.to"
        >
          <img :src="icon.svg" :alt="icon.alt" />
        </a>
      </div>
    </div> -->
  </header>
</template>

<script>
import READrLogo from '../images/logo.svg'
// import share from '../images/share.svg'
// import facebook from '../images/navbar/facebook.svg'
// import line from '../images/navbar/line.svg'
// import link from '../images/navbar/link.svg'

export default {
  data() {
    return {
      READrLogo,
      // share,
      // shareList: [
      //   {
      //     id: 1,
      //     svg: facebook,
      //     alt: 'facebook',
      //     to: 'https://www.facebook.com/readr.tw/',
      //   },
      //   { id: 2, svg: line, alt: 'line', to: '' },
      //   { id: 3, svg: link, alt: 'link', to: '' },
      // ],
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
    // folderToggle() {
    //   const folder = document.querySelector('.header__share_folder')
    //   folder.classList.toggle('header__share_folder_show')
    // },
  },
}
</script>

<style lang="scss" scoped>
@import '../styles/responsiveMixin.scss';

.header {
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  height: 66px;
  padding: 0 20px;
  background-color: #fff;
  border-bottom: solid 1px #d8d8d8;
  @include atLarge {
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

  // &__share {
  //   position: relative;
  //   cursor: pointer;

  //   &_toggle_button {
  //   }
  //   &_folder {
  //     // display: none;
  //     position: absolute;
  //     display: flex;
  //     flex-direction: column;

  //     top: 52px;
  //     display: block;

  //     opacity: 0;
  //     transition: all 0.2s ease-in-out;

  //     &_icon {
  //       margin-bottom: 10px;
  //     }

  //     &_show {
  //       opacity: 1;
  //     }
  //   }
  //   img {
  //     width: 40px;
  //     height: 40px;
  //   }
  // }

  // @include atMedium {
  //   width: 50px;
  //   height: 50px;
  // }
}
</style>
