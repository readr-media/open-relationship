<template>
  <div v-if="hasItems" class="list">
    <p>
      <strong
        >你要{{ formTypeDisplay }}的是下列{{ formNameDisplay }}嗎？</strong
      >
    </p>
    <div class="list__items">
      <div v-for="item in items" :key="`${item.name}${item.id}`">
        <a
          :href="`/${formName}/verify/${item.id}`"
          :class="`g-color-${formType}`"
          target="_blank"
          rel="noopener noreferrer"
          v-text="item.name"
        />
        <!-- 由於不同表單提供的欄位資訊不同，請先組好要顯示的資訊 -->
        <span v-if="item.info">（{{ item.info }}）</span>
      </div>
    </div>
    <p>
      如果以上皆不是你要{{ formTypeDisplay }}的{{ formNameDisplay }}，請填寫<a
        :class="`g-color-${formType}`"
        target="_blank"
        rel="noopener noreferrer"
        >表單</a
      >，我們將為你新增同名的{{ formNameDisplay }}資料
    </p>
  </div>
</template>

<script>
import { ROUTE_MAPPING } from '~/constants'

export default {
  name: 'ListSameName',
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    formName() {
      return this.$route.path.split('/')[1]
    },
    formNameDisplay() {
      return ROUTE_MAPPING[this.formName] || ''
    },
    formType() {
      return this.$route.path.split('/')[2]
    },
    formTypeDisplay() {
      if (this.formType === 'create') {
        return '新增'
      } else if (this.formType === 'verify') {
        return '驗證'
      }
      return ''
    },
    hasItems() {
      return this.items.length > 0
    },
  },
}
</script>

<style lang="scss" scoped>
.list {
  padding: 39px 20px 0;
  line-height: 1.75;
  background-color: #fff;
  @include media-breakpoint-up(lg) {
    padding: 50px 0 0;
  }
  > * {
    max-width: 620px;
    margin: 0 auto;
  }
  p {
    a {
      text-decoration: underline;
    }
  }
}
</style>
