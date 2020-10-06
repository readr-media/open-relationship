<template>
  <div id="Navigation">
    <a href="http://readr.tw/">
      <img :src="READrLogo" id="Navigation-logo" alt="" />
    </a>
    <div id="Navigation-share">
      <img :src="share" id="Navigation-share-icon" @click="folderToggle" />
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
    folderToggle() {
      const folder = document.querySelector('.Navigation-share-folder')
      folder.classList.toggle('Navigation-share-folder-show')
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../styles/responsiveMixin.scss';

#Navigation {
  z-index: 10;
  position: fixed;
  top: 0;
  left: 0;
  #Navigation-logo {
    width: 45px;
    height: 41px;
    position: absolute;
    top: 10px;
    left: 10px;
  }

  #Navigation-share {
    position: absolute;
    top: 10px;
    left: 65px;

    #Navigation-share-icon {
      width: 35px;
      height: 35px;
      cursor: pointer;
    }

    .Navigation-share-folder {
      width: 100px;
      height: 100px;
      background: red;

      &-show {
        background: gold;
      }
    }
  }

  @include atMedium {
    #Navigation-logo {
      width: 50px;
      height: 50px;

      top: 20px;
      left: 20px;
    }

    #Navigation-share {
      position: absolute;
      top: 20px;
      left: 90px;

      #Navigation-share-icon {
        width: 45px;
        height: 45px;
      }
    }
  }
}
</style>
