<template>
  <a :href="news.url">
    <div class="PreviewNews">
      <div class="PreviewNews__image">
        <img :src="news.image" alt="" />
      </div>
      <div class="PreviewNews__text">
        <div class="PreviewNews__text_title">{{ news.title }}</div>
        <div class="PreviewNews__text_date">{{ news.date }}</div>
      </div>
    </div>
  </a>
</template>

<script>
export default {
  props: ['news'],
}
</script>

<style lang="scss" scoped>
@import '../styles/responsiveMixin.scss';

.PreviewNews {
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: row;

  // margin-top: 14px;

  &__image {
    width: 33.3%;
    height: 100%;
    overflow: hidden;
    img {
      width: 100%;
    }
  }

  &__text {
    width: 66.6%;
    padding: 0 14px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    color: black;

    &_title {
      font-size: 0.875rem;
      font-weight: 800;
    }

    &_date {
      margin-bottom: 19px;
      opacity: 0.6;
      font-size: 0.75px;
    }
  }

  @include atMedium {
    &__text {
      &_title {
        font-size: 1rem;
      }

      &_date {
      }
    }
  }
}
</style>
