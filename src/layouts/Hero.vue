<template>
  <div id="Hero">
    <div id="Hero-background">
      <picture>
        <source
          media="(min-width:530px)"
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

    <div id="Hero-rectangle-title">
      台灣
      <div>
        <span class="text-style-1">政商人物</span
        ><span class="text-style-2">關係</span>
      </div>
      資料庫計畫
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
    z-index: 0;
    // position: absolute;
    // top: 0;
    // height: 100%;
    width: 100%;
    background: white;
    img {
      width: 100%;
    }
  }

  #Hero-rectangle-title {
    z-index: 1;
    width: 215px;
    height: 170px;
    background-color: #102c34;

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 20px 0 24px;

    .text-style-1 {
      color: #ed8c4a;
    }
    .text-style-2 {
      color: #63c1e2;
    }

    font-size: 30px;
    font-weight: 600;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: center;
    color: #ffffff;

    #Hero-rectangle-content {
      height: 568px;
      background-color: #102c34;

      // width: 495px;
      // height: 256px;
      // font-family: PingFangTC;
      // font-size: 16px;
      // font-weight: 500;
      // font-stretch: normal;
      // font-style: normal;
      // line-height: 2;
      // letter-spacing: normal;
      // text-align: center;
      // color: #ffffff;
    }
  }

  // @include atSmall {
  //   height: 568px;
  //   #Hero-background {
  //     position: relative;
  //   }
  //   #Hero-rectangle {
  //     #Hero-rectangle-title {
  //       position: absolute;
  //       top: 187px;
  //       font-size: 30px;
  //       width: 215px;
  //       height: 170px;
  //       background-color: #102c34;
  //     }
  //     #Hero-rectangle-content {
  //       max-width: 280px;
  //     }
  //   }
  // }
}
</style>
