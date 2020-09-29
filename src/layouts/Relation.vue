<template>
  <div id="Relation">
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
import RelationButtonContainer from "../components/RelationButtonContainer";
export default {
  data() {
    return {
      createSectionList: [
        { id: 1, title: "新增人物", route: "/person" },
        { id: 2, title: "新增組織", route: "/organization" },
        { id: 3, title: "新增人物關係", route: "/person_relation" },
        { id: 4, title: "新增組織關係", route: "/organization_relation" },
        {
          id: 5,
          title: "新增人物組織關係",
          route: "/person_organization",
        },
      ],
      verifySectionList: [
        { id: 1, title: "驗證人物", route: "/person-verify" },
        { id: 2, title: "驗證組織", route: "/organization-verify" },
        { id: 3, title: "驗證人物關係", route: "/people_relation" },
        { id: 4, title: "驗證組織關係", route: "/organization_relation" },
        { id: 5, title: "驗證人物組織關係", route: "/people_organization" },
      ],
    };
  },
  components: {
    RelationButtonContainer,
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/responsiveMixin.scss";

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
