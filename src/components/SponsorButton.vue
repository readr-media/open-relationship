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
.SponsorButton {
  max-width: 395px;
  height: 43px;
  margin: auto;
}
</style>
