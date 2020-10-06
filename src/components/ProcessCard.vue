<template>
  <div class="ProcessCard">
    <img :src="numbers[number - 1]" alt="" class="PrecessCard-number" />

    <div class="ProcessCard-textContainer">
      <div class="ProcessCard-text-title">{{ title }}</div>
      <div class="ProcessCard-text-content">{{ content }}</div>
    </div>
    <a class="anchorPoint" :href="to" @click="handleClick">
      <div class="ProcessCard-btnContainer">
        <Button :btnStatus="btnStatus" title="YOYO" fitDiv="true" />
      </div>
    </a>
  </div>
</template>

<script>
import Button from '../components/Button'
import number1 from '../images/letter-number-one.svg'
import number2 from '../images/letter-number-two.svg'
import number3 from '../images/letter-number-three.svg'
import number4 from '../images/letter-number-four.svg'

export default {
  components: {
    Button,
  },
  props: ['number', 'title', 'content', 'btnStatus', 'to'],
  data() {
    return {
      numbers: [number1, number2, number3, number4],
    }
  },
  methods: {
    handleClick() {
      if (this.btnStatus === 'active') {
        this.$ga.event({
          eventCategory: 'projects',
          eventAction: 'click',
          eventLabel: `我要參與 ${this.title}`,
        })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../styles/responsiveMixin.scss';

.ProcessCard {
  max-width: 100%;
  height: 259px;
  background-color: #ffffff;

  display: flex;
  flex-direction: column;
  margin: 76px 0 20px;
  position: relative;

  .PrecessCard-number {
    position: absolute;
    width: 70px;
    height: 83px;
    // box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
    background-color: #ffffff;
    left: 50%;
    transform: translateX(-50%);
    margin-top: -63px;
    background: none;
  }
  .ProcessCard-textContainer {
    height: 209px;
    .ProcessCard-text-title {
      // width: 380px;
      height: 29px;
      font-family: PingFangTC;
      font-size: 21px;
      font-weight: 300;
      font-stretch: normal;
      font-style: normal;
      line-height: normal;
      letter-spacing: normal;
      text-align: center;
      color: #000000;

      margin: 38px auto 10px;
    }
    .ProcessCard-text-content {
      // width: 300px;
      font-family: PingFang TC;
      font-size: 16px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.75;
      letter-spacing: normal;
      color: #000000;
      margin: 0 25px 23px;
    }
  }

  .ProcessCard-btnContainer {
    bottom: 0;
  }

  @include atSmall {
    max-width: 380px;
    margin: 76px 20px 20px;
  }
  @include atMedium {
    max-width: 300px;
  }
  @include atLarge {
    max-width: 380px;
  }
}
</style>
