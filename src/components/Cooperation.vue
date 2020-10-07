<template>
  <div id="Cooperation">
    <div id="Cooperation__title" class="section-title">| 合作夥伴 |</div>

    <div id="Cooperation__list_container">
      <div
        v-for="cooperation in cooperationList"
        :key="cooperation.id"
        class="logoContainer"
      >
        <img :src="cooperation.logo" ：alt="cooperation.title" />
      </div>
    </div>
  </div>
</template>

<script>
import cooperation01 from '../images/cooperation_01.svg'
export default {
  data() {
    return {
      cooperationList: [
        {
          id: 1,
          title: '公視P新聞實驗室',
          logo: cooperation01,
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
#Cooperation {
  width: 100%;
  background-color: #ebebeb;
  overflow: auto;

  &__title {
    margin-bottom: 0;
  }

  &__list_container {
    display: flex;
    flex-direction: row;
    justify-content: center;

    .logoContainer {
      width: 153px;
      img {
        width: 100%;
      }
    }
  }
}
</style>
