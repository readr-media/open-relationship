<template>
  <div class="PreviewNews">
    <div class="PreviewNews__image">
      <img :src="news.image" alt="" />
    </div>
    <div class="PreviewNews__text">
      <div class="PreviewNews__text_title">{{ news.title }}</div>
      <div class="PreviewNews__text_date">{{ news.date }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['news'],
}
</script>

<style lang="scss" scoped>
.PreviewNews {
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: row;

  margin-top: 14px;

  &__image {
    width: 33.3%;
    height: 100%;
    overflow: hidden;
    img {
      height: 100%;
    }
  }

  &__text {
    width: 66.6%;
    padding: 0 19px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    &_title {
      font-size: 1rem;
      font-weight: 800;
    }

    &_date {
      margin-bottom: 19px;
      opacity: 0.7;
    }
  }
}
</style>
