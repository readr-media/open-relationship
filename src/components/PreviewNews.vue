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
.PreviewNews {
  display: flex;

  &__image {
    width: 80px;
    height: 80px;
    @include media-breakpoint-up(md) {
      width: 200px;
      height: 100px;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center center;
    }
  }

  &__text {
    flex: 1;
    margin-left: 21px;

    &_title {
      display: -webkit-box;
      overflow: hidden;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      font-weight: 500;
      line-height: 1.5;
    }

    &_date {
      margin-top: 10px;
      color: rgba(0, 0, 0, 0.66);
      font-size: 14px;
      line-height: 1.86;
      @include media-breakpoint-up(md) {
        margin-top: 21px;
      }
    }
  }
}
</style>
