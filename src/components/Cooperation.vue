<template>
  <div class="cooperation">
    <div class="g-heading">| 合作夥伴 |</div>
    <div class="cooperation-container">
      <template v-for="item in PARTNER_LIST">
        <a
          v-if="item.link"
          :key="item.name"
          :href="item.link"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img :src="item.logo" :alt="item.name" class="cooperation__image" />
        </a>
        <img
          v-else
          :key="item.name"
          :src="item.logo"
          :alt="item.name"
          class="cooperation__image"
        />
      </template>
    </div>
  </div>
</template>

<script>
import { PARTNER_LIST } from '~/constants'

export default {
  name: 'Cooperation',
  data() {
    return {
      PARTNER_LIST,
    }
  },
}
</script>

<style lang="scss" scoped>
.cooperation {
  padding: 40px 0 20px;
  background-color: #ebebeb;
  &-container {
    display: flex;
    justify-content: center;
    a {
      display: block;
    }
  }
  &__image {
    width: 150px;
  }
}
</style>
