<template>
  <div class="origin g-bg-grey">
    <div class="origin__title g-heading">| 計畫緣起 |</div>
    <div class="origin__content">
      <p>
        2018 年，READr
        的成員在不同的場合、不約而同地聽到國際的公眾人物關係資料計畫（<a
          href="http://www.popoloproject.com/"
          target="_blank"
          rel="noopener noreferrer"
          >Open Data Standards for Persons, Posts and Organizations to track
          Popolo</a
        >），該計畫非常簡單，就是使用一樣的資料格式，匯集散落在不同地方的公開資料。我們想將這樣的計畫帶進臺灣！
      </p>
      <p>
        資料的來源可能是政府網站、新聞、或法定公開卻未在網上公開的資料；資料的範疇包括公眾人物的學歷、經歷、資產、企業關係、選舉經驗、政治獻金、學術論文、報告、親戚關係（註）、甚至每一句公開發言。我們希望把散落在四處的公開資料連成線，再將線織成一張細密的網，這一切都需要你的幫忙，你可以透過新增資料或是驗證資料來加入這項計畫！
      </p>
      <p>
        註：《公務人員法》載明二親等為應迴避之親屬關係範圍，因此本計畫將親戚關係也納入資料蒐集的範圍。
      </p>
      <a
        href="https://www.readr.tw/post/2508"
        target="_blank"
        rel="noopener noreferrer"
        @click="sendGaClickEvent"
      >
        （看完整計畫緣起）
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProjectOrigin',
  methods: {
    sendGaClickEvent() {
      this.$ga.event({
        eventCategory: 'projects',
        eventAction: 'click',
        eventLabel: '點擊 看完整計畫緣起',
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.origin {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 50px 0;
  clear: both;
  &__content {
    width: 280px;
    line-height: 2;
    text-align: justify;
    @include media-breakpoint-up(sm) {
      width: 400px;
    }
    @include media-breakpoint-up(md) {
      width: 600px;
    }
    @include media-breakpoint-up(lg) {
      width: 800px;
    }
    > p {
      + p {
        margin-top: 40px;
      }
    }
    a {
      font-weight: 500;
    }
    > a {
      float: right;
    }
  }
}
</style>
