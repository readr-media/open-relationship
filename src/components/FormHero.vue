<template>
  <div class="FormHero g-bg-green">
    <div class="content_wrapper">
      <div
        class="FormHero__title"
        :class="{
          createTitle: type == 'create',
          verifyTitle: type == 'verify',
        }"
      >
        {{ title }}
      </div>

      <div v-if="type == 'create'" class="FormHero__content">
        <p class="FormHero__content_intro">
          「{{ content }}」是由 READr
          發起的開放、開源資料建立計畫，希望能將散落在各處的公開資料，以統一的格式建立成開放資料。
          <br />
          <br />
        </p>

        <p class="FormHero__content_tutorial">
          <span :style="{ color: '#ed8c4a' }">新增方式： <br /></span>
          <span>
            請將該{{
              target
            }}的資料填入對應的欄位，請確認每一項都為公開資料（在網路上可以搜尋得到），並在資料來源欄位附上網址。
            當你要在一個作答區填入多筆資料，請使用半形分號做區隔
          </span>
        </p>
      </div>

      <!-- ----------------------Verify-------------------------------- -->
      <div v-else-if="type == 'verify'" class="FormHero__content">
        <p class="FormHero__content_intro">
          「{{ content }}」是由 READr
          發起的開放、開源資料建立計畫，希望能將散落在各處的公開資料，以統一的格式建立成開放資料。
          <br />
          <br />
        </p>

        <p class="FormHero__content_tutorial">
          <span :style="{ color: '#63c1e2' }">驗證方式： <br /></span>
          <span>
            1. 在要驗證的欄位點選資料正確<br />
            2. 或在要驗證的欄位點選資料錯誤，資料錯誤的欄位請直接將原資料更正<br />
            3. 在答案為空白的欄位直接填上你有的資料<br />
            4. 選擇是否要留下你的個人資料<br />
            5. 檢查你想驗證的資料都有驗證到，即可按送出
          </span>
        </p>
      </div>
      <div v-else></div>

      <button :class="[type, 'form-hero__btn']" @click="handleClick">
        回到主畫面
      </button>
    </div>
  </div>
</template>

<script>
import createLogo from '../images/character-card-orange.svg'
import checkLogo from '../images/character-card-blue.svg'

import relationListMixin from '../mixins/relationListMixin'

export default {
  mixins: [relationListMixin],
  props: ['title', 'content', 'target', 'type', 'id'],
  data() {
    return {
      formLogo: this.type === 'create' ? createLogo : checkLogo,
    }
  },
  methods: {
    handleClick() {
      this.$router.push('/')
      this.$ga.event({
        eventCategory: 'projects',
        eventAction: 'click',
        eventLabel: 'back to home',
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.form-hero {
  &__btn {
    display: flex;
    justify-content: center;
    align-items: center;
    align-self: flex-end;
    width: 120px;
    height: 30px;
    padding: 5px 0;
    color: #fff;
    font-size: 0.875rem;
    border: none;
    border-radius: 42px;
    cursor: pointer;
    &::before {
      content: '';
      align-self: center;
      display: inline-block;
      width: 0;
      height: 0;
      margin-right: 9px;
      border-style: solid;
      border-width: 5.5px 9.5px 5.5px 0;
      border-color: transparent #fff transparent transparent;
    }
    &.create {
      background-color: #ed8c4a;
    }
    &.verify {
      background-color: #63c1e2;
    }
  }
}
</style>

<style lang="scss" scoped>
.FormHero {
  box-sizing: border-box;
  width: 100%;
  // height: 550px;
  padding: 50px 25px 41px;

  .content_wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__title {
    font-size: 28px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: 2px;
    text-align: center;
    color: #ed8c4a;
    margin-bottom: 10px;
  }
  &__content {
    // width: 270px;
    // height: 294px;

    // margin: 0 auto 38px;
    font-size: 16px;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.75;
    letter-spacing: normal;
    text-align: justify;
    color: #ffffff;

    margin-bottom: 10px;

    &_intro {
      margin: 0;
      width: 100%;

      font-weight: normal;
    }

    &_tutorial {
      width: 100%;
      font-weight: 500;
    }
  }

  .createTitle {
    color: #ed8c4a;
  }

  .verifyTitle {
    color: #63c1e2;
  }

  .Button {
    align-self: flex-end;
  }

  @include media-breakpoint-up(sm) {
    padding-bottom: 50px;
    .content_wrapper {
      width: 400px;
      margin: auto;
    }
  }

  @include media-breakpoint-up(lg) {
    .content_wrapper {
      width: 600px;
    }

    &__title {
      align-self: flex-start;
    }
  }
}
</style>
