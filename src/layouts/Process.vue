<template>
  <div id="Process">
    <!-- <a class="anchorPoint" href="#Process" /> -->
    <div class="section-title" id="Process-title">| 階段進度 |</div>
    <div id="Process-cardContainer">
      <ProcessCard
        v-for="processCard in processCardList"
        :key="processCard.id"
        :number="processCard.id"
        :title="processCard.title"
        :content="processCard.content"
        :btnStatus="processCard.btnStatus"
        :to="processCard.to"
      />
    </div>
  </div>
</template>

<script>
import ProcessCard from "../components/ProcessCard";
export default {
  data() {
    return {
      processCardList: [
        {
          id: 1,
          title: "新增資料",
          content:
            "你可以新增單筆或大量新增關於人物、組織的資料（更多屬性表單即將開放）。新增前請務必確認它是公開資料，且一定要附上資料來源。",
          btnStatus: "active",
          to: "#Relation",
        },
        {
          id: 2,
          title: "驗證資料",
          content: "你可以協助確認網友們新增的資料是不是正確的。",
          btnStatus: "active",
          to: "#Relation",
        },
        {
          id: 3,
          title: "開放資料（即將開放）",
          content:
            "我們會將這些網友協力新增、且驗證過一定次數的資料彙集並開放，讓你一鍵下載。",
          btnStatus: "inactive",
          to: "",
        },
        {
          id: 4,
          title: "資料庫網站上線（即將開放）",
          content:
            "我們預計將架設視覺化、可查詢的資料庫網站，讓公眾人物關係一目瞭然！",
          btnStatus: "inactive",
          to: "",
        },
      ],
    };
  },
  components: {
    ProcessCard,
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/responsiveMixin.scss";

#Process {
  // height: 770px;
  width: 100%;
  padding: 40px 20px 20px;
  background-color: #ebebeb;
  overflow: auto;

  #Process-title {
    margin-bottom: 0;
  }

  #Process-cardContainer {
    width: 100%;
    box-sizing: border-box;
    margin: auto;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-content: center;
  }

  @include atMedium {
    padding: 50px;
    #Process-cardContainer {
      flex-direction: row;
      width: 700px;
    }
  }

  @include atLarge {
    // padding: 50px;
    #Process-cardContainer {
      flex-direction: row;
      width: 840px;
    }
  }
}
</style>
5
