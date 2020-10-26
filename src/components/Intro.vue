<template>
  <div class="intro" v-text="INTRODUCTION" />
</template>

<script>
import { INTRODUCTION } from '../constants'

export default {
  name: 'Intro',
  data() {
    return {
      INTRODUCTION,
    }
  },
}
</script>

<style lang="scss" scoped>
@import '../scss/responsiveMixin.scss';

.intro {
  background-color: #102c34;

  padding: 72px 20px;

  display: flex;
  align-items: center;
  justify-content: center;

  font-weight: 500;
  line-height: 2;
  text-align: center;
  color: #ffffff;

  @include atMedium {
    display: none;
  }
}
</style>
