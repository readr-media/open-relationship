<template>
  <div id="Hero">
    <div id="Hero-background">
      <picture>
        <source
          media="(min-width:480px)"
          srcset="
            ../images/hands.png 1x,
            ../images/hands.png 2x,
            ../images/hands.png 3x
          "
        />
        <!-- <source
          media="(min-width:150px)"
          srcset="
            ../images/bgSmall.png 1x,
            ../images/bgSmall.png 2x,
            ../images/bgSmall.png 3x
          "
        /> -->
        <img srcset="../images/bgSmall.png" alt="" />
      </picture>
    </div>

    <div id="Hero-rectangle-small">
      <div id="Hero-rectangle-small-title">
        台灣
        <div>
          <span class="text-style-1">政商人物</span
          ><span class="text-style-2">關係</span>
        </div>
        資料庫計畫
      </div>
    </div>

    <div id="Hero-rectangle-large">
      <div id="Hero-rectangle-large-title">
        台灣
        <span class="text-style-1">政商人物</span
        ><span class="text-style-2">關係</span>
        資料庫計畫
      </div>
      <div id="Hero-rectangle-large-content">
        這是一個簡單但需要眾人協力的計畫。我們希望用「開放資料」的格式將散佈在網路上關於公眾人物的公開資料串連起來，包括公眾人物的學歷、經歷、資產、政治獻金、學術論文、報告、親戚關係、甚至說過的每一句話。當資料庫成形，人們可以專心在開發應用或是更深入的調查報導，而不是每一次都要從頭蒐集資料。
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "../styles/responsiveMixin.scss";
#Hero {
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;

  #Hero-background {
    z-index: 1;

    width: 100%;
    height: 100%;
    img {
      width: 100%;
    }
  }
  .text-style-1 {
    color: #ed8c4a;
  }
  .text-style-2 {
    color: #63c1e2;
  }

  #Hero-rectangle-small-title {
    z-index: 0;
    width: 215px;
    height: 170px;
    background-color: #102c34;

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 20px 0 24px;

    font-size: 30px;
    font-weight: 600;

    text-align: center;
    color: #ffffff;
  }
  // -----------------------------------------------

  #Hero-rectangle-large {
    display: none;
    min-width: 58.333%;
    min-height: 71.111%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #102c34;

    flex-direction: column;
    align-items: center;
    justify-content: center;

    &-title {
      height: 56px;
      font-family: PingFangTC;
      font-size: 2rem;
      font-weight: 600;
      font-stretch: normal;
      font-style: normal;
      line-height: normal;
      letter-spacing: normal;
      text-align: center;
      color: #ffffff;

      margin-bottom: 5px;
    }

    &-content {
      width: 495px;
      // height: 256px;
      padding: 10px;

      font-family: PingFangTC;
      font-size: 0.8rem;
      font-weight: 500;
      font-stretch: normal;
      font-style: normal;
      line-height: 2;
      letter-spacing: normal;
      text-align: center;
      color: #ffffff;
    }
  }
  @include atSmall {
    position: relative;
    #Hero-rectangle-large {
      display: none;
    }
  }

  @include atMedium {
    #Hero-rectangle-large {
      display: flex;
      min-width: auto;
      min-height: auto;
      width: 560px;
      height: 384px;

      &-title {
        margin-bottom: 5px;
        font-size: 2rem;
      }

      &-content {
        width: 495px;
        padding: 10px;
        font-size: 0.8rem;
      }
    }
  }

  @include atLarge {
    #Hero-rectangle-large {
      width: 700px;
      height: 480px;

      &-title {
        margin-bottom: 25px;
        font-size: 2.5rem;
      }

      &-content {
        width: 495px;

        font-size: 1rem;
      }
    }
  }

  @include atUltraLarge {
    #Hero-rectangle-large {
      width: 840px;
      height: 576px;

      &-title {
        margin-bottom: 25px;
        font-size: 3rem;
      }

      &-content {
        width: 594px;
        font-size: 1.2rem;
      }
    }
  }
}
</style>
