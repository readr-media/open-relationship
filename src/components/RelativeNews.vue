<template>
  <div class="RelativeNews">
    <div class="RelativeNews__title"><div>相關報導</div></div>
    <div class="RelativeNews__container">
      <PreviewNews
        v-for="news in relativeNewsList"
        :key="news.id"
        :news="news"
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
          title: '五一連假人潮去哪裡？1968人潮示警系統有用嗎？',
          date: new Date().toDateString(),
          image: news1,
          url: '',
        },
        {
          id: 2,
          title:
            '紐時募資廣告有用嗎？從Twitter聲量看臺灣如何成為「反世衛戰爭」的要角',
          date: new Date().toDateString(),
          image: news2,
          url: '',
        },
        {
          id: 3,
          title: '【更新】敦睦艦隊27確診者 全臺足跡總整理',
          date: new Date().toDateString(),
          image: news3,
          url: '',
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
@import '../styles/responsiveMixin.scss';

.RelativeNews {
  margin: auto;
  width: 100%;

  &__title {
    background: rgb(224, 232, 254);
    display: block;
    padding: 14px 0 12px;
    text-align: center;
    font-size: 1.125rem;
    font-weight: 800;
    color: rgb(0, 39, 84);
  }
  @include atSmall {
    width: 500px;
  }
  @include atMedium {
    width: 600px;
  }
}
</style>
