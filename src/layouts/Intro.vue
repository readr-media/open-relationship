<template>
  <div id="Intro">
    <div id="Intro-content">
      這是一個簡單但雄心勃勃的項目，目的是以任何人都可以使用的一致，開放的格式收集和共享數據。<br />
      為什麼？ 因為資源尚不存在。<br />
      對於全世界許多人和組織來說，這將是非常有用的。<br />
      當數據採用一致的結構化格式時，開發人員可以在任何地方重用它們。
      您不必浪費時間抓取數據並將其轉換為可以使用的格式；
      相反，您只需專注於製作工具。
      而且這些工具可以更容易地獲得，使用和適應世界各地的本地需求，從而節省了所有人的時間和精力。
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "../styles/responsiveMixin.scss";

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
