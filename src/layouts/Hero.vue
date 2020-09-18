<template>
  <div id="Hero">
    <div id="Hero-background">
      <img src="../images/hands.png" alt="" srcset="" />
    </div>
    <div id="Hero-rectangle">
      <div id="Hero-rectangle-title">
        台灣<span class="text-style-1">政商人物</span
        ><span class="text-style-2">關係</span>資料庫計畫
      </div>
      <div id="Hero-rectangle-content">
        這是一個簡單但雄心勃勃的項目，目的是以任何人都可以使用的一致<br />，開放的格式收集和共享數據。<br />
        為什麼？ 因為資源尚不存在。<br />
        對於全世界許多人和組織來說，這將是非常有用的。<br />
        當數據採用一致的結構化格式時，開發人員可以在任何地方重用它們。
        您不必浪費時間抓取數據並將其轉換為可以使用的格式；
        相反，您只需專注於製作工具。
        而且這些工具可以更容易地獲得，使用和適應世界各地的本地需求，從而節省了所有人的時間和精力。
      </div>
    </div>
  </div>
</template>

<script>
import heroBackground from "../images/hands.png";
export default {};
</script>

<style lang="scss" scoped>
#Hero {
  width: 100%;
  height: 675px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
}
#Hero-background {
  z-index: 0;
  position: absolute;
  top: 0;
  height: 100%;
  background: white;
  img {
    height: 100%;
  }
}

#Hero-rectangle {
  z-index: 1;
  width: 700px;
  height: 480px;
  background-color: #102c34;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  #Hero-rectangle-title {
    width: 700px;
    height: 56px;
    font-family: PingFangTC;
    font-size: 40px;
    font-weight: 600;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: center;
    color: #ffffff;
    .text-style-1 {
      color: #ed8c4a;
    }
    .text-style-2 {
      color: #63c1e2;
    }
  }

  #Hero-rectangle-content {
    width: 495px;
    height: 256px;
    font-family: PingFangTC;
    font-size: 16px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 2;
    letter-spacing: normal;
    text-align: center;
    color: #ffffff;
  }
}
</style>
