<template>
  <div class="app">
    <div class="header-section container">
      <h1 class="landingPage-title">台灣政商人物關係資料庫計畫</h1>
      <p col-lg-6>
        這是一個簡單但雄心勃勃的項目，目的是以任何人都可以使用的一致，開放的格式收集和共享數據。
        為什麼？ 因為資源尚不存在。
        對於全世界許多人和組織來說，這將是非常有用的。
        當數據採用一致的結構化格式時，開發人員可以在任何地方重用它們。
        您不必浪費時間抓取數據並將其轉換為可以使用的格式；
        相反，您只需專注於製作工具。
        而且這些工具可以更容易地獲得，使用和適應世界各地的本地需求，從而節省了所有人的時間和精力。
      </p>
    </div>

    <div class="create-section buttonsContainer">
      <ul>
        <li v-for="createItem in createSectionList" :key="createItem.id">
          <b-button variant="warning" :to="createItem.route">
            {{ createItem.title }}
          </b-button>
        </li>
      </ul>
    </div>
    <div class="varify-section buttonsContainer">
      <ul>
        <li v-for="varifyItem in varifySectionList" :key="varifyItem.id">
          <b-button variant="success" :to="varifyItem.route">
            {{ varifyItem.title }}
          </b-button>
        </li>
      </ul>
    </div>
    <div class="introduction-section container">
      <div class="introduction-detail">
        <h1 class="landingPage-title">計畫緣起</h1>
        <p>
          因為這是一個國際的計畫，已經有很多人把資料如何呈現、如何應用都做好了。因為資料的格式是一樣的，所以你只要把資料到進去就可以產生各式各樣的關係圖
          我們希望在台灣推動這個計畫，網民們可以寫code去對政府網頁爬蟲、記者在做跟「關係」有關的專案時，就可以順手把手上的資料結構化，上傳。ngo
          也可以。或是像我們的政治獻金專案、即將要推出的議員關係專案、
          之前獎助金的對象台電金流追追追、參與者榮尼王抓的公司資料庫等等……
        </p>
        <button>現在就加入我們</button>
      </div>
    </div>

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
export default {
  head: {
    title: "Home page",
  },
  data() {
    return {
      newTodo: "",
      createSectionList: [
        { id: 1, title: "新增人物", route: "/people" },
        { id: 2, title: "新增組織", route: "/organization" },
        { id: 3, title: "新增人物關係", route: "/people_relation" },
        { id: 4, title: "新增組織關係", route: "/organization_relation" },
        { id: 5, title: "新增人物組織關係", route: "/people_organization" },
      ],
      varifySectionList: [
        { id: 1, title: "驗證人物", route: "/people" },
        { id: 2, title: "驗證組織", route: "/organization" },
        { id: 3, title: "驗證人物關係", route: "/people_relation" },
        { id: 4, title: "驗證組織關係", route: "/organization_relation" },
        { id: 5, title: "驗證人物組織關係", route: "/people_organization" },
      ],
      processSectionList: [
        { id: 1, title: "新增與驗證", content: "說明文字" },
        { id: 2, title: "統整資料", content: "說明文字" },
        { id: 3, title: "產出專題報告", content: "說明文字" },
        { id: 4, title: "做成資料庫網站 開放民眾使用", content: "說明文字" },
      ],
    };
  },

  methods: {},
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
