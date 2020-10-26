<template>
  <div id="Relation">
    <!-- <a class="anchorPoint" href="#Relation" /> -->
    <div class="section-title Relation-title">| 我要新增資料 |</div>
    <RelationButtonContainer
      type="create"
      :filterId="null"
      :dark="false"
      :btnList="createSectionList"
      :small="true"
      :style="{ marginBottom: '50px' }"
    />

    <div class="section-title Relation-title">| 我要驗證資料 |</div>
    <RelationButtonContainer
      type="verify"
      :filterId="null"
      :dark="false"
      :btnList="verifySectionList"
      :small="true"
      :style="{ marginBottom: '80px' }"
      :verifyPersonRelationsIsEnable="verifyPersonRelationsIsEnable"
    />
    <div class="continue">陸續開放更多協作表單</div>
  </div>
</template>

<script>
import RelationButtonContainer from '../components/RelationButtonContainer'
import relationListMixin from '../mixins/relationListMixin'

import { FETCH_PERSON_RELATIONS_COUNT } from '../graphQL/query/person_relation'

export default {
  components: {
    RelationButtonContainer,
  },
  apollo: {
    personRelationsCount: {
      query: FETCH_PERSON_RELATIONS_COUNT,
      update: (data) => data._allPersonRelationsMeta.count,
      result(result) {
        const count = result.data._allPersonRelationsMeta.count
        if (count > 0) {
          this.verifyPersonRelationsIsEnable = true
        }
      },
    },
  },
  mixins: [relationListMixin],
  data() {
    return {
      verifyPersonRelationsIsEnable: false,
    }
  },
}
</script>

<style lang="scss" scoped>
@import '../scss/breakpoint.scss';

#Relation {
  // height: 430px;
  padding: 40px 20px 16px;
  width: 100%;
  background-color: #102c34;

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
    @include atSmall {
      max-width: 500px;
      margin: auto;
    }
    @include atLarge {
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

  @include atLarge {
    padding: 50px 115px 44px;
    justify-content: center;
  }
}
</style>
