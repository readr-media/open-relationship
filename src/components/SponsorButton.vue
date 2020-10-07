<template>
  <div class="SponsorButton">
    <a href="">
      <img :src="sponsor" alt="READr sponsor" />
    </a>
  </div>
</template>

<script>
import sponsor from '../images/sponsor.svg'
export default {
  data() {
    return {
      sponsor,
    }
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

  transition: all 0.1s ease-in-out;
  &:hover {
    transform: scale(1.05);
  }
  @include atSmall {
    width: 395px;
  }
}
</style>
