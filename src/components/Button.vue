/* eslint-disable vue/no-parsing-error */
<template>
  <button
    class="Button"
    :class="{
      small: small,
      inactive: btnStatus == 'inactive',
      fitDiv: fitDiv,
      round: round,
      create: type == 'create',
      verify: type == 'verify',
      whiteText: whiteText,
    }"
    @click="$emit('click')"
  >
    <div v-if="small" class="Button-text">{{ title }}</div>
    <div v-else class="Button-text">{{ title }}</div>
  </button>
</template>

<script>
export default {
  props: [
    'btnStatus',
    'title',
    'fitDiv',
    'round',
    'type',
    'whiteText',
    'small',
  ],
}
</script>

<style lang="scss" scoped>
.Button {
  //   width: 100%;
  height: 29px;
  font-size: 21px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 2px;
  text-align: center;
  color: #000000;

  height: 50px;
  text-align: center;
  line-height: 50px;
  background-color: #ffca54;
  border: none;

  &:focus {
    outline: 0;
  }

  &:hover {
    cursor: pointer;
  }
}

.inactive {
  opacity: 0.5;
  pointer-events: none;
}

.fitDiv {
  width: 100%;
}

.round {
  border-radius: 42px;
  margin: 50px auto 87px;
}

.create {
  background-color: #ed8c4a;
}

.verify {
  background-color: #63c1e2;
}

.whiteText {
  color: white;
  margin: 0;
}

.small {
  font-size: 0.875rem;
  padding: 5px 0;
  height: 30px;
  width: 120px;
}
</style>
