<template>
  <div class="contact">
    <div class="contact__title">
      留下 email，<br class="contact__break-line" />通知你最新進度！
    </div>
    <form class="contact__form">
      <input class="contact__input" type="email" />
      <Button
        class="contact__submit"
        title="送出"
        @click.prevent="handleClick"
      />
    </form>
  </div>
</template>

<script>
import Button from '../components/Button'
export default {
  components: {
    Button,
  },
  methods: {
    handleClick() {
      this.$ga.event({
        eventCategory: 'projects',
        eventAction: 'click',
        eventLabel: 'send email',
      })
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../styles/responsiveMixin.scss';

.contact {
  padding: 42px 20px;
  background-color: #ebebeb;
  > * {
    max-width: 610px;
    margin-left: auto;
    margin-right: auto;
  }
  &__title {
    font-size: 21px;
    font-weight: 600;
    letter-spacing: 1px;
    text-align: center;
  }
  &__break-line {
    @include atMedium {
      display: none;
    }
  }
  &__form {
    margin: 20px auto 0;
    @include atMedium {
      display: flex;
    }
  }
  &__input {
    display: block;
    width: 100%;
    height: 50px;
    padding: 0 0 0 10px;
    font-size: 16px;
    background-color: #ffffff;
    box-shadow: inset 0 1px 3px 0 rgba(0, 0, 0, 0.5);
    @include atMedium {
      flex: 1;
      width: auto;
    }
  }
  &__submit {
    width: 100%;
    margin-top: 10px;
    @include atMedium {
      width: 100px;
      margin: 0 0 0 10px;
    }
  }
}
</style>
