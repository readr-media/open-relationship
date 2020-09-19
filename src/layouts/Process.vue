<template>
  <div id="Process">
    <div class="section-title" id="Process-title">| 階段進度 |</div>
    <div id="Process-cardContainer">
      <ProcessCard
        v-for="processCard in processCardList"
        :key="processCard.id"
        :number="processCard.id"
        :title="processCard.title"
        :content="processCard.content"
        :btnStatus="processCard.btnStatus"
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
          title: "新增與驗證",
          content:
            "產生沒有意義的文章，供排版時填充版面用，但不會因為字義而左右版型的判斷。文字、標點符號出現機率大致符合台灣文章習慣。",
          btnStatus: "active",
        },
        {
          id: 2,
          title: "統整資料",
          content:
            "產生沒有意義的文章，供排版時填充版面用，但不會因為字義而左右版型的判斷。文字、標點符號出現機率大致符合台灣文章習慣。",
          btnStatus: "inactive",
        },
        {
          id: 3,
          title: "產出專題報告",
          content:
            "產生沒有意義的文章，供排版時填充版面用，但不會因為字義而左右版型的判斷。文字、標點符號出現機率大致符合台灣文章習慣。",
          btnStatus: "inactive",
        },
        {
          id: 4,
          title: "資料庫網站開放使用",
          content:
            "產生沒有意義的文章，供排版時填充版面用，但不會因為字義而左右版型的判斷。文字、標點符號出現機率大致符合台灣文章習慣。",
          btnStatus: "inactive",
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
#Process {
  height: 770px;
  width: 100%;
  background-color: #ebebeb;
  overflow: auto;

  #Process-title {
    margin-bottom: 0;
  }

  #Process-cardContainer {
    width: 844px;
    margin: auto;
    display: flex;
    flex-direction: columns;
    flex-wrap: wrap;
    // align-content: center;
  }
}
</style>
5
