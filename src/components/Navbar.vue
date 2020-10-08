<template>
  <div class="Navbar">
    <a
      class="Navbar__logo"
      href="https://www.readr.tw/"
      target="_blank"
      rel="noopener noreferrer"
      @click="handleClick"
    >
      <img :src="READrLogo" alt="READr" />
    </a>

    <div class="Navbar__share">
      <img
        :src="share"
        class="Navbar__share_toggle_button"
        @click="folderToggle"
      />
      <div class="Navbar__share_folder">
        <!-- <a
          v-for="icon in shareList"
          :key="icon.id"
          class="Navbar__share_folder_icon"
          :href="icon.to"
        >
          <img :src="icon.svg" :alt="icon.alt" />
        </a> -->
      </div>
    </div>
  </div>
</template>

<script>
import READrLogo from '../images/logo.svg'
import share from '../images/share.svg'
import facebook from '../images/navbar/facebook.svg'
import line from '../images/navbar/line.svg'
import link from '../images/navbar/link.svg'

export default {
  data() {
    return {
      READrLogo,
      share,
      shareList: [
        {
          id: 1,
          svg: facebook,
          alt: 'facebook',
          to: 'https://www.facebook.com/readr.tw/',
        },
        { id: 2, svg: line, alt: 'line', to: '' },
        { id: 3, svg: link, alt: 'link', to: '' },
      ],
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
      const folder = document.querySelector('.Navbar__share_folder')
      folder.classList.toggle('Navbar__share_folder_show')
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../styles/responsiveMixin.scss';

.Navbar {
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
    position: relative;
    cursor: pointer;

    &_toggle_button {
    }
    &_folder {
      // display: none;
      position: absolute;
      display: flex;
      flex-direction: column;

      top: 52px;
      display: block;

      opacity: 0;
      transition: all 0.2s ease-in-out;

      &_icon {
        margin-bottom: 10px;
      }

      &_show {
        opacity: 1;
      }
    }
    img {
      width: 40px;
      height: 40px;
    }
  }

  @include atMedium {
    // width: 50px;
    // height: 50px;
  }
}
</style>
