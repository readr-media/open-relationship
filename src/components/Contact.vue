<template>
  <div id="Contact">
    <div id="Contact-title" class="section-title">
      留下 email，<br class="changeLine-small" />
      通知你最新進度！
    </div>
    <form id="Contact-form">
      <input id="Contact-form-input" type="text" />
      <Button title="送出" @click="handleClick" />
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

#Contact {
  width: 100%;
  padding: 42px 20px;
  background-color: #ebebeb;
  overflow: auto;

  #Contact-title {
    height: auto;
    margin: 0 auto 20px;
  }
  #Contact-form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    #Contact-form-input {
      height: 50px;
      font-size: 1rem;
      box-shadow: inset 0 1px 3px 0 rgba(0, 0, 0, 0.5);
      background-color: #ffffff;
      margin-bottom: 10px;
    }
  }

  @include atSmall {
    #Contact-form {
      flex-direction: row;
      #Contact-form-input {
        flex: 7;
        margin-right: 10px;
      }
      .Button {
        flex: 1;
      }
    }
  }

  @include atMedium {
    #Contact-form {
      margin: auto;
      width: 610px;
    }
  }
}
</style>
