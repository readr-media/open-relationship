<template>
  <div class="SponsorButton">
    <a
      href="https://www.readr.tw/donate"
      target="_blank"
      rel="noopener noreferrer"
      @click="handleClick"
    >
      <img :src="sponsor" alt="READr sponsor" class="sponsor_normal" />
      <img :src="sponsorSmall" alt="READr sponsor" class="sponsor_small" />
    </a>
  </div>
</template>

<script>
import sponsor from '../images/sponsor.svg'
import sponsorSmall from '../images/sponsorSmall.svg'

export default {
  data() {
    return {
      sponsor,
      sponsorSmall,
    }
  },
  methods: {
    handleClick() {
      this.$ga.event({
        eventCategory: 'projects',
        eventAction: 'click',
        eventLabel: 'donate',
      })
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../styles/responsiveMixin.scss';

.SponsorButton {
  width: 279px;
  height: 43px;
  margin: auto;

  a {
    width: 100%;
    img {
      width: 100%;
    }
  }

  .sponsor {
    &_normal {
      display: none;
    }
  }

  transition: all 0.1s ease-in-out;
  &:hover {
    transform: scale(1.05);
  }
  @include atSmall {
    width: 395px;

    .sponsor {
      &_normal {
        display: block;
      }

      &_small {
        display: none;
      }
    }
  }
}
</style>
