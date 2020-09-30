<template>
  <div id="FormHero">
    <div class="FormHero-logo">
      <img :src="formLogo" alt="" />
    </div>
    <div
      class="FormHero-title"
      :class="{ createTitle: type == 'create', verifyTitle: type == 'verify' }"
    >
      <div class="FormHero-title-text">
        {{ title }}
      </div>
    </div>
    <div v-if="type == 'create'" class="FormHero-content">
      <p class="FormHero-content-paragraph">
        「{{ content }}」是由 READr
        發起的開放、開源資料建立計畫，希望能將散落在各處的公開資料，以統一的格式建立成開放資料。
        <br />
        <br />

        <span :style="{ color: '#ed8c4a' }"
          >新增方式：<br />
          請將該{{
            target
          }}的資料填入對應的欄位，請確認每一項都為公開資料（在網路上可以搜尋得到），並在資料來源欄位附上網址。
        </span>
        <br />
        <br />
        找不到想要的欄位？請參考其他表單：
      </p>
      <RelationButtonContainer
        type="create"
        :filterId="id"
        dark="true"
        :btnList="createSectionList"
      />

      <p class="FormHero-content-paragraph">
        以上還是沒有你想要的資料嗎？請參考 READr
        的文章，看看它有沒有在未來即將推出的項目中；如果沒有，歡迎來信
        readr@readr.tw 或是私訊粉專 https://www.facebook.com/readr.tw 許願！
      </p>
    </div>

    <!-- ----------------------Verify-------------------------------- -->
    <div v-else-if="type == 'verify'" class="FormHero-content">
      <p class="FormHero-content-paragraph">
        請對照「資料來源」裡的資料，驗證欄位內的資料是否正確
        <br />
        <br />
      </p>

      <p class="FormHero-content-paragraph">
        驗證方式<br />1 在要驗證欄位中：<br />
        &nbsp; &bull;&nbsp; 留下正確的資料，<br />
        &nbsp; &bull;&nbsp; 刪除不正確的資料 <br />2 或是在空白處填入正確資料<br />3
        留下您驗證時的參考資料來源網址 <br />驗證完成後選擇是否留下你的個人資料
      </p>

      <p class="FormHero-content-paragraph">
        <br />

        如果有任何問題 歡迎來信 readr@readr.tw 或是私訊粉專
        https://www.facebook.com/readr.tw/ 我們會有專人為你解答 謝謝你的參與！ |
      </p>
    </div>
    <div v-else></div>
  </div>
</template>

<script>
import createLogo from "../images/orange-03.svg";
import checkLogo from "../images/blue-03.svg";
import RelationButtonContainer from "../components/RelationButtonContainer";

export default {
  components: {
    RelationButtonContainer,
  },
  props: ["title", "content", "target", "type", "id"],
  data() {
    return {
      formLogo: this.type == "create" ? createLogo : checkLogo,
      createSectionList: [
        { id: 1, title: "新增人物", route: "/person" },
        { id: 2, title: "新增組織", route: "/organization" },
        // { id: 3, title: "新增人物關係", route: "/person_relation" },
        // { id: 4, title: "新增組織關係", route: "/organization_relation" },
        // {
        //   id: 5,
        //   title: "新增人物組織關係",
        //   route: "/person_organization",
        // },
      ],
      verifySectionList: [
        { id: 1, title: "驗證人物", route: "/person-verify" },
        { id: 2, title: "驗證組織", route: "/organization-verify" },
        // { id: 3, title: "驗證人物關係", route: "/people_relation" },
        // { id: 4, title: "驗證組織關係", route: "/organization_relation" },
        // { id: 5, title: "驗證人物組織關係", route: "/people_organization" },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/responsiveMixin.scss";

#FormHero {
  width: 100%;
  // height: 550px;
  padding-bottom: 30px;
  background-color: #102c34;

  display: flex;
  flex-direction: column;
  align-items: center;
  .FormHero-logo {
    width: 93px;
    height: 94px;
    margin: 27px auto;
    img {
      width: 100%;
      height: 100%;
    }
  }

  .FormHero-title {
    height: 50px;
    border-radius: 31px;

    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0px auto 20px;

    .FormHero-title-text {
      // height: 40px;
      font-size: 28px;
      font-weight: 500;
      font-stretch: normal;
      text-align: center;
      color: #ffffff;
      letter-spacing: 2px;
      padding: 5px 18px;
    }
  }
  .FormHero-content {
    width: 270px;
    // height: 294px;

    margin: 0 auto 38px;
    .FormHero-content-paragraph {
      margin: 0;
      width: 100%;
      font-size: 1rem;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.75;
      letter-spacing: normal;
      text-align: left;
      color: #ffffff;
    }
  }

  .createTitle {
    background-color: #ed8c4a;
  }

  .verifyTitle {
    background-color: #63c1e2;
  }

  @include atSmall {
    // height: 420px;
    .FormHero-title {
      width: 400px;
    }
    .FormHero-content {
      width: 500px;
    }
  }

  @include atLarge {
    .FormHero-content {
      width: 800px;
    }
  }
}
</style>
