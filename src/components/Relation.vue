<template>
  <div id="Relation" class="g-bg-green">
    <!-- <a class="anchorPoint" href="#Relation" /> -->
    <div class="g-heading Relation-title">| 我要新增資料 |</div>
    <RelationButtonContainer
      type="create"
      :filterId="null"
      :dark="false"
      :btnList="createSectionList"
      :small="true"
      :style="{ marginBottom: '50px' }"
    />

    <div class="g-heading Relation-title">| 我要驗證資料 |</div>
    <RelationButtonContainer
      type="verify"
      :filterId="null"
      :dark="false"
      :btnList="verifySectionList"
      :small="true"
      :style="{ marginBottom: '80px' }"
    />
    <div class="continue">陸續開放更多協作表單</div>
  </div>
</template>

<script>
import RelationButtonContainer from '../components/RelationButtonContainer'
import relationListMixin from '../mixins/relationListMixin'

import { fetchAllFormsCount } from '~/apollo/queries/common.gql'

export default {
  components: {
    RelationButtonContainer,
  },
  apollo: {
    allFormsCount: {
      query: fetchAllFormsCount,
      update: (data) => data,
      result(result) {
        this.checkFormsHaveItems(result.data)
      },
    },
  },
  mixins: [relationListMixin],
}
</script>

<style lang="scss" scoped>
#Relation {
  // height: 430px;
  padding: 40px 20px 16px;
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;

  .Relation-title {
    color: #ffffff;
    margin-bottom: 20px;
  }

  .Relation-btn-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    @include media-breakpoint-up(sm) {
      max-width: 500px;
      margin: auto;
    }
    @include media-breakpoint-up(lg) {
      flex-direction: row;
      align-items: center;
      justify-content: space-around;
      max-width: 1200px;
    }

    &-create {
      .RelationButton {
        background-color: #ed8c4a;
        &:hover {
          background-color: #ed8b4ae3;
        }
      }
    }
    &-verify {
      .RelationButton {
        background-color: #63c1e2;
        &:hover {
          background-color: #63c0e2e1;
        }
      }
    }
  }
  .continue {
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.75;
    letter-spacing: normal;
    text-align: center;
    color: #ffffff;
  }

  @include media-breakpoint-up(lg) {
    padding: 50px 115px 44px;
    justify-content: center;
  }
}
</style>
