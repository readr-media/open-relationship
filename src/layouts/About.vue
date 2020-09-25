<template>
  <div id="About">
    <div class="section-title" id="About-title">| 計畫緣起 |</div>
    <div id="About-content">
      <p>
        因為這是一個國際的計畫，已經有很多人把資料如何呈現、如何應用都做好了。因為資料的格式是一樣的，所以你只要把資料倒進去就可以產生各式各樣的關係圖。
      </p>
      <br />
      <p>
        我們希望在臺灣推動這個計畫，網民們可以寫 code
        去對政府網頁爬蟲、記者在做跟「關係」有關的專案時，就可以順手把手上的資料結構化，上傳。ngo
        也可以。或是像我們的政治獻金專案、即將要推出的議員關係專案、
        之前獎助金的對象台電金流追追追、參與者榮尼王抓的公司資料庫等等......
      </p>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "../styles/responsiveMixin.scss";

#About {
  width: 100%;
  background-color: #ebebeb;
  padding: 40px 20px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  #About-title {
    color: #000000;
  }

  #About-content {
    // width: 800px;
    // height: 168px;
    width: 280px;
    font-family: PingFangTC;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.75;
    letter-spacing: normal;
    text-align: justify;
    color: #000000;
  }

  @include atSmall {
    padding: 50px 115px;
    #About-content {
      width: 400px;
    }
  }
  @include atMedium {
    #About-content {
      width: 600px;
    }
  }
  @include atLarge {
    #About-content {
      width: 800px;
    }
  }
}
</style>
