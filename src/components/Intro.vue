<template>
  <div class="intro g-bg-green" v-text="INTRODUCTION" />
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
.intro {
  padding: 72px 20px;

  display: flex;
  align-items: center;
  justify-content: center;

  font-weight: 500;
  line-height: 2;
  text-align: center;
  color: #ffffff;
  @include media-breakpoint-up(md) {
    display: none;
  }
}
</style>
