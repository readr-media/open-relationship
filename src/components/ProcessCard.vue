<template>
  <div class="ProcessCard">
    <img :src="numbers[number - 1]" alt="" class="PrecessCard-number" />

    <div class="ProcessCard-textContainer">
      <div class="ProcessCard-text-title">{{ title }}</div>
      <div class="ProcessCard-text-content">{{ content }}</div>
    </div>

    <div class="ProcessCard-btnContainer">
      <a
        v-for="btn in btns"
        :key="btn.id"
        class="anchorPoint"
        :class="{
          twoBtn: btns.length > 1,
          inactive: btn.btnStatus == 'inactive',
        }"
        :href="btn.to"
        :target="btn.target || '_self'"
        :rel="getLinkRel(btn)"
        @click="handleClick(btn.btnStatus, btn.gaLabel)"
      >
        <Button :btnStatus="btn.btnStatus" :title="btn.title" fitDiv="true" />
      </a>
    </div>
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
  props: {
    number: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      default: '',
    },
    content: {
      type: String,
      default: '',
    },
    btns: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      numbers: [number1, number2, number3, number4],
    }
  },
  methods: {
    getLinkRel(target) {
      return target === '_blank' ? 'noopener noreferrer' : ''
    },
    handleClick(btnStatus, eventLabel) {
      if (btnStatus === 'active') {
        this.$ga.event({
          eventCategory: 'projects',
          eventAction: 'click',
          eventLabel: `我要參與 ${eventLabel || this.title}`,
        })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.ProcessCard {
  max-width: 100%;
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
    flex: 1;
    .ProcessCard-text-title {
      // width: 380px;
      height: 29px;
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
      font-size: 16px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.75;
      letter-spacing: normal;
      text-align: justify;
      color: #000000;
      margin: 0 25px 23px;
    }
  }

  .ProcessCard-btnContainer {
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    a {
      width: 100%;
    }

    .twoBtn {
      width: 100%;
    }

    .inactive {
      pointer-events: none;
      .twoBtn {
        width: 49.5%;
      }
    }

    .Button {
      margin-top: 1px;
    }
  }
  @include media-breakpoint-up(sm) {
    max-width: 380px;
    margin: 76px 20px 20px;
    .ProcessCard-btnContainer {
      flex-direction: row;
      .Button {
        padding: 0;
        margin-top: 0;
        margin-right: 1px;
      }
    }
  }
  @include media-breakpoint-up(md) {
    max-width: 300px;
  }
  @include media-breakpoint-up(lg) {
    max-width: 380px;
  }
}
</style>
