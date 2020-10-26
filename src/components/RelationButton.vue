<template>
  <router-link
    :to="to"
    class="RelationButton"
    :class="{
      small: small,
      darkCreate: dark && type == 'create',
      darkVerify: dark && type == 'verify',
      lightCreate: !dark && type == 'create',
      lightVerify: !dark && type == 'verify',
      disable: !enable,
    }"
    @click.native="handleClick"
  >
    <span>{{ title }}</span>
  </router-link>
</template>

<script>
export default {
  props: ['title', 'to', 'dark', 'type', 'small', 'enable'],
  methods: {
    handleClick() {
      if (this.enable) {
        this.$ga.event({
          eventCategory: 'projects',
          eventAction: 'click',
          eventLabel: `點擊 ${this.title}`,
        })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../scss/responsiveMixin.scss';

.RelationButton {
  width: 100%;
  border-radius: 42px;
  padding: 10px 0;
  margin-bottom: 30px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  cursor: pointer;
  text-decoration: none;

  span {
    font-size: 21px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: center;
    color: #ffffff;
  }
  @include atLarge {
    width: 170px;
    padding: 0;
    height: 80px;
    margin-bottom: 50px;
  }
}

.darkCreate {
  background: none;
  border: solid 1px #ed8c4a;
  span {
    color: #ed8c4a;
  }
}
.darkVerify {
  background: none;
  border: solid 1px #63c1e2;
  span {
    color: #63c1e2;
  }
}
.lightCreate {
  background: #ed8c4a;
  span {
    color: #ffffff;
  }
}
.lightVerify {
  background: #63c1e2;
  span {
    color: #ffffff;
  }
}

.small {
  width: 100%;
  border-radius: 42px;
  padding: 9px 0;
  margin-bottom: 10px;
  span {
    font-size: 1rem;
    font-weight: nomal;
  }

  @include atLarge {
    width: 170px;
    padding: 0;
    height: 30px;
    margin-bottom: 15px;
  }
}

.disable {
  // background: red;
  opacity: 0.5;
  pointer-events: none;
}
</style>
