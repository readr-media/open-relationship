<template>
  <div id="Relation">
    <div class="section-title" id="Relation-title">| 我要新增資料 |</div>
    <div class="Relation-btn-container Relation-btn-container-create">
      <RelationButton
        v-for="createItem in createSectionList"
        :key="createItem.id"
        :title="createItem.title"
        :to="createItem.route"
      />
    </div>

    <div class="section-title" id="Relation-title">| 我要驗證資料 |</div>
    <div class="Relation-btn-container Relation-btn-container-varify ">
      <RelationButton
        v-for="createItem in varifySectionList"
        :key="createItem.id"
        :title="createItem.title"
        :to="createItem.route"
      />
    </div>
  </div>
</template>

<script>
import RelationButton from "../components/RelationButton";
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
      varifySectionList: [
        { id: 1, title: "驗證人物", route: "/people" },
        { id: 2, title: "驗證組織", route: "/organization" },
        { id: 3, title: "驗證人物關係", route: "/people_relation" },
        { id: 4, title: "驗證組織關係", route: "/organization_relation" },
        { id: 5, title: "驗證人物組織關係", route: "/people_organization" },
      ],
    };
  },
  components: {
    RelationButton,
  },
};
</script>

<style lang="scss" scoped>
#Relation {
  height: 430px;
  background-color: #102c34;

  display: flex;
  flex-direction: column;
  align-items: center;

  #Relation-title {
    color: #ffffff;
  }

  .Relation-btn-container {
    display: flex;
    flex-direction: row;

    &-create {
      .RelationButton {
        background-color: #ed8c4a;
        &:hover {
          background-color: #ed8b4ae3;
        }
      }
    }
    &-varify {
      .RelationButton {
        background-color: #63c1e2;
        &:hover {
          background-color: #63c0e2e1;
        }
      }
    }
  }
}
</style>
