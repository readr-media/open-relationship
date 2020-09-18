<template>
  <div class="app">
    <Hero />
    <About />
    <Relation />

    <div class="progress-section container">
      <h1 class="landingPage-title">階段進度</h1>
      <b-card-group deck class="progress-Container">
        <!-- <li v-for="processBlock in processSectionList" :key="processBlock.id"></li> -->
        <b-card
          v-for="processBlock in processSectionList"
          class="text-center"
          bg-variant="light"
          :key="processBlock.id"
          style="max-width: 20rem"
        >
          <b-card-text>{{ processBlock.title }}</b-card-text>
          <b-card-text class="small">{{ processBlock.content }}</b-card-text>
        </b-card>
      </b-card-group>
    </div>

    <div class="cooperation-section container">
      <h1 class="landingPage-title">合作夥伴</h1>
    </div>

    <div class="contact-section container">
      <h5 class="landingPage-title">留下email。通知你最新進度</h5>
      <form action>
        <input type="text" />
        <button>送出</button>
      </form>
    </div>

    <div class="credit-section"></div>

    <div class="footer section"></div>
  </div>
</template>

<script>
import Hero from "../layouts/Hero";
import About from "../layouts/About";
import Relation from "../layouts/Relation";

export default {
  head: {
    title: "Home page",
  },
  data() {
    return {
      processSectionList: [
        { id: 1, title: "新增與驗證", content: "說明文字" },
        { id: 2, title: "統整資料", content: "說明文字" },
        { id: 3, title: "產出專題報告", content: "說明文字" },
        { id: 4, title: "做成資料庫網站 開放民眾使用", content: "說明文字" },
      ],
    };
  },

  methods: {},
  components: {
    Hero,
    About,
    Relation,
  },
};
</script>

<style lang="scss">
*,
*:before,
*:after {
  box-sizing: border-box;
}
body,
html {
  margin: 0;
  padding: 0;
}

body {
  font-family: system-ui, BlinkMacSystemFont, -apple-system, Segoe UI, Roboto,
    sans-serif;
  display: flex;
  justify-content: center;
  min-height: 100vh;
}

.container {
  max-width: 700px !important;
}

.landingPage-title {
  text-align: center;
  margin: 30px;
}

.buttonsContainer {
  ul {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  li {
    list-style-type: none;
    margin: 5px;
  }
}

.introduction-section {
  .introduction-detail {
    margin: 50px;
    display: flex;
    flex-direction: column;
  }
}

.contact-section {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
