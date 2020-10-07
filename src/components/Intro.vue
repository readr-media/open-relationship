<template>
  <div id="Intro">
    <div id="Intro-content">
      這是一個簡單但需要眾人協力的計畫。我們希望用「開放資料」的格式將散佈在網路上關於公眾人物的公開資料串連起來，包括公眾人物的學歷、經歷、資產、政治獻金、學術論文、報告、親戚關係、甚至說過的每一句話。當資料庫成形，人們可以專心在開發應用或是更深入的調查報導，而不是每一次都要從頭蒐集資料。
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
@import '../styles/responsiveMixin.scss';

#Intro {
  width: 100%;
  height: 100vh;

  background-color: #102c34;

  padding: 72px 20px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  #Intro-content {
    width: 280px;
    // height: 568px;
    font-family: PingFang TC;
    font-size: 16px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 2;
    letter-spacing: normal;
    text-align: center;
    color: #ffffff;
  }

  @include atMedium {
    display: none;
  }
}
</style>
