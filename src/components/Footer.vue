<template>
  <div class="Footer">
    <div class="Footer__icons_container">
      <a
        v-for="icon in footerIcons"
        :key="icon.id"
        :href="icon.to"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          :src="icon.svg"
          :alt="icon.alt"
          class="Footer__icons_container_icon"
        />
      </a>
    </div>

    <div class="Footer__btn_container">
      <a
        v-for="btn in footerBtns"
        :key="btn.id"
        :href="btn.to"
        class="Footer__btn_container_btn"
        target="_blank"
        rel="noopener noreferrer"
        v-text="btn.title"
      />
    </div>

    <span class="Footer__copyright">&reg;2020 READr All Rights Reserved</span>
  </div>
</template>

<script>
import facebook from '../images/footer/facebook.svg'
import twitter from '../images/footer/twitter.svg'
import instagram from '../images/footer/instagram.svg'
import github from '../images/footer/github.svg'

export default {
  data() {
    return {
      facebook,
      twitter,
      instagram,
      github,
      footerBtns: [
        { id: 1, title: '關於我們', to: 'https://www.readr.tw/about' },
        { id: 2, title: '聯絡我們', to: 'mailto:readr@readr.tw' },
        {
          id: 3,
          title: '意見回饋',
          to:
            'https://docs.google.com/forms/d/e/1FAIpQLSc-nbJFU419hLQN5TOcHrOFUXv8a4-wKb_Wk85Up0kSt6926Q/viewform',
        },
      ],
      footerIcons: [
        {
          id: 1,
          svg: facebook,
          alt: 'facebook',
          to: 'https://www.facebook.com/readr.tw/',
        },
        {
          id: 2,
          svg: twitter,
          alt: 'twitter',
          to: 'https://twitter.com/readr_news',
        },
        {
          id: 3,
          svg: instagram,
          alt: 'instagram',
          to: 'https://www.instagram.com/readrteam_daily/',
        },
        {
          id: 4,
          svg: github,
          alt: 'github',
          to: 'https://github.com/readr-media/',
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
@import '../styles/responsiveMixin.scss';

.Footer {
  box-sizing: border-box;
  position: relative;
  height: 155px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;

  border-top: solid 1px #979797;
  padding: 32px 22px;

  &__btn_container {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    margin-bottom: 1rem;

    height: auto;
    &_btn {
      //   margin-right: 73px;
      cursor: pointer;
      color: #000;
      font-size: 0.875rem;
      line-height: 1;
    }
  }

  &__icons_container {
    display: flex;
    flex-direction: row;
    align-items: center;

    margin-bottom: 34px;

    &_icon {
      margin-left: 15px;
      width: 26px;
      height: 26px;
    }

    a {
      height: 26px;
    }
  }

  &__copyright {
    height: 0.875rem;
    font-size: 0.875rem;
  }
  @include atMedium {
    &__btn_container {
      width: 600px;
    }
  }

  @include atLarge {
    height: 82px;
    padding: 0 52px;

    flex-direction: row-reverse;
    justify-content: space-between;

    &__copyright {
      position: absolute;
      right: 230px;
      //   top: 50%;
      //   transform: translateY(-50%);
      height: 82px;
      line-height: 82px;
    }

    &__btn_container {
      width: 310px;
      justify-content: space-between;
      margin-bottom: 0;
    }

    &__icons_container {
      width: 150px;
      margin-bottom: 0;
    }
  }
}
</style>
