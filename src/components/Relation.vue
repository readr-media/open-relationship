<template>
  <div id="Relation">
    <!-- <a class="anchorPoint" href="#Relation" /> -->
    <div class="section-title Relation-title">| 我要新增資料 |</div>
    <RelationButtonContainer
      type="create"
      :filterId="null"
      :dark="false"
      :btnList="createSectionList"
    />

    <div class="section-title Relation-title">| 我要驗證資料 |</div>
    <RelationButtonContainer
      type="verify"
      :filterId="null"
      :dark="false"
      :btnList="verifySectionList"
    />
  </div>
</template>

<script>
import RelationButtonContainer from '../components/RelationButtonContainer'
import relationListMixin from '../mixins/relationListMixin'

export default {
  components: {
    RelationButtonContainer,
  },
  mixins: [relationListMixin],
}
</script>

<style lang="scss" scoped>
@import '../styles/responsiveMixin.scss';

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
    margin-bottom: 33px;
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

  @include atLarge {
    padding: 50px 115px;
    justify-content: center;
  }
}
</style>
