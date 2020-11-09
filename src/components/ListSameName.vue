<template>
  <div v-if="hasItems || showLinkForSameName" class="list">
    <p>
      <strong v-if="isCreateForm && hasItems"
        >你要新增的是下列{{ formNameDisplay }}嗎？</strong
      >
      <strong v-else-if="!isCreateForm"
        >上述不是你要的驗證資料？{{
          hasItems ? `請參考下列${formNameDisplay}` : ''
        }}</strong
      >
    </p>
    <div v-if="hasItems" class="list__items">
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
    <p v-if="showLinkForSameName">
      <span v-if="hasItems"
        >如果以上不是你要{{ formTypeDisplay }}的{{ formNameDisplay }}，</span
      ><span v-else-if="!hasItems && !isCreateForm">
        如果你想要{{ formTypeDisplay }}的{{ formNameDisplay }}與上述{{
          formNameDisplay
        }}名稱相同，</span
      ><span
        >請填寫<a
          :class="`g-color-${formType}`"
          :href="linkForAddSameName"
          target="_blank"
          rel="noopener noreferrer"
          >表單</a
        >，我們將為你新增{{ formNameDisplay }}資料
      </span>
    </p>
  </div>
</template>

<script>
import { ROUTE_MAPPING } from '~/constants'

const LINK_FOR_ADD_SAME_NAME = {
  person: 'https://forms.gle/cuzHnCb8pE1S31FV7',
  'person-organization': 'https://forms.gle/KmnkF5HrbeQUkcXK9',
  'person-relation': 'https://forms.gle/pV2z67vNe5NhKKPp7',
  organization: 'https://forms.gle/ExtoR4116oSndUot6',
  'organization-relation': 'https://forms.gle/t5GwSywgcVfp9qhv6',
}

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
    isCreateForm() {
      return this.formType === 'create'
    },
    linkForAddSameName() {
      return LINK_FOR_ADD_SAME_NAME[this.formName] || ''
    },
    showLinkForSameName() {
      return (
        this.linkForAddSameName &&
        !(this.formType === 'create' && !this.hasItems)
      )
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
