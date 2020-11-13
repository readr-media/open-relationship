<template>
  <div class="Relation-btn-container">
    <RelationButton
      v-for="createItem in showBtnList"
      :key="createItem.id"
      :title="createItem.title"
      :to="createItem.route"
      :dark="dark"
      :type="type"
      :small="small"
      :enable="getButtonEnable(createItem)"
    />
  </div>
</template>

<script>
import RelationButton from './RelationButton'

export default {
  components: {
    RelationButton,
  },
  props: ['type', 'filterId', 'dark', 'btnList', 'small'],
  data() {
    return {
      showBtnList: [],
    }
  },

  mounted() {
    const result = this.relationBtnFilter(this.btnList)
    this.showBtnList = result
  },

  methods: {
    getButtonEnable(createItem) {
      return createItem.enable
    },
    relationBtnFilter(btnList) {
      return btnList.filter((btn) => {
        return btn.id !== this.filterId
      })
      // return null;
    },
  },
}
</script>

<style lang="scss" scoped>
.Relation-btn-container {
  margin: 10px auto 0;

  width: 100%;
  display: flex;
  flex-direction: column;
  @include media-breakpoint-up(sm) {
    max-width: 500px;
    margin: 10px auto 0;
  }
  @include media-breakpoint-up(lg) {
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    max-width: 1200px;
  }
}
</style>
