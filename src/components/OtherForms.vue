<template>
  <div class="other-forms">
    <p>找不到想要的欄位？請參考其他表單：</p>
    <div :class="operationType" class="other-forms__links">
      <a
        v-for="item in formLinks"
        :key="item.title"
        :href="item.route"
        class="link"
        v-text="item.title"
      />
    </div>
    <p>
      以上還是沒有你想要的資料嗎？請參考 READr
      的文章，看看它有沒有在未來即將推出的項目中；如果沒有，歡迎來信
      <a :href="LINKS.MAIL" target="_blank" rel="noopener noreferrer"
        >readr@readr.tw</a
      >或是<a
        :href="LINKS.FACEBOOK_PAGE"
        target="_blank"
        rel="noopener noreferrer"
        >私訊粉專</a
      >許願！
    </p>
  </div>
</template>

<script>
import { LINKS } from '../constants'
import relationListMixin from '../mixins/relationListMixin'

export default {
  name: 'OtherForms',
  mixins: [relationListMixin],
  props: {
    operationType: {
      type: String,
      default: 'create',
      required: true,
    },
  },
  data() {
    return {
      LINKS,
    }
  },
  computed: {
    formLinks() {
      return this[`${this.operationType}SectionList`].filter(
        (item) => item.enable && item.route !== this.$route.path
      )
    },
  },
}
</script>

<style lang="scss" scoped>
.other-forms {
  padding: 40px 10px;
  text-align: justify;
  line-height: 1.75;
  background-color: #fff;
  border-bottom: solid 1px #979797;
  @include media-breakpoint-up(md) {
    padding: 40px calc((100% - 620px) / 2);
  }
  > * + * {
    margin-top: 40px;
  }
  p {
    a {
      color: #fc8737;
      font-weight: 500;
      text-decoration: underline;
    }
  }
  &__links {
    padding: 0 10px;
    @include media-breakpoint-up(lg) {
      display: flex;
      flex-wrap: wrap;
      padding: 0;
      margin: 30px 0 0;
    }
    &.create {
      .link {
        background-color: #ed8c4a;
      }
    }
    &.verify {
      .link {
        background-color: #63c1e2;
      }
    }
  }
  .link {
    display: block;
    padding: 6px 0;
    color: #fff;
    font-size: 21px;
    font-weight: 500;
    line-height: normal;
    text-align: center;
    border-radius: 42px;
    @include media-breakpoint-up(lg) {
      width: 170px;
      font-size: 16px;
      margin: 10px 30px 0 0;
    }
    + .link {
      margin: 30px 0 0;
      @include media-breakpoint-up(lg) {
        margin: 10px 30px 0 0;
      }
    }
  }
}
</style>
