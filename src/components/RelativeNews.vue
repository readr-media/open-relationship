<template>
  <div class="RelativeNews">
    <div class="RelativeNews__title"><div>相關報導</div></div>
    <div class="RelativeNews__container">
      <PreviewNews
        v-for="(news, index) in relativeNewsList"
        :key="news.id"
        :news="news"
        class="RelativeNews__item"
        @click="sendGaClickEvent(index)"
      />
    </div>
  </div>
</template>

<script>
import news1 from '../images/news1.jpg'
import news2 from '../images/news2.jpg'
import news3 from '../images/news3.jpg'
import PreviewNews from './PreviewNews'

export default {
  components: {
    PreviewNews,
  },
  data() {
    return {
      relativeNewsList: [
        {
          id: 1,
          title: '2020 總統候選人之事實查核計畫 - 讀＋READr',
          date: '2020-01-09',
          image: news1,
          url: 'https://www.readr.tw/project/fact-check-2020',
        },
        {
          id: 2,
          title:
            '數讀政治獻金 3.0：翻開立委（12年份）的金主投資名冊 - 讀＋READr',
          date: '2020-07-23',
          image: news2,
          url: 'https://www.readr.tw/project/political-contribution',
        },
        {
          id: 3,
          title: '看板追追追——2020選舉看板紀錄 - 讀＋READr',
          date: '2019-11-28',
          image: news3,
          url: 'https://www.readr.tw/project/election-board',
        },
      ],
    }
  },
  methods: {
    sendGaClickEvent(index) {
      this.$ga.event({
        eventCategory: 'projects',
        eventAction: 'click',
        eventLabel: `相關報導 ${index + 1}`,
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.RelativeNews {
  margin: auto;
  box-sizing: border-box;
  width: 100%;
  padding: 0 10px;

  &__title {
    background: rgb(224, 232, 254);
    display: block;
    padding: 14px 0 12px;
    text-align: center;
    font-size: 1.125rem;
    font-weight: 800;
    color: rgb(0, 39, 84);
    margin-bottom: 14px;
  }
  &__item {
    display: block;
    + .RelativeNews__item {
      margin-top: 24px;
    }
  }
  @include media-breakpoint-up(sm) {
    width: 500px;
  }
  @include media-breakpoint-up(md) {
    width: 600px;
  }
}
</style>
