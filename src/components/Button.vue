<template>
  <button
    class="Button"
    :class="{
      inactive: btnStatus == 'inactive',
      fitDiv: fitDiv,
      round: round,
      create: type == 'create',
      verify: type == 'verify',
      whiteText: whiteText,
    }"
  >
    <div v-if="btnStatus == 'inactive'" class="Button-text">即將開放</div>
    <div v-else-if="btnStatus == 'active'" class="Button-text">我要參與</div>
    <div v-else class="Button-text">{{ title }}</div>
  </button>
</template>

<script>
export default {
  props: ["btnStatus", "title", "fitDiv", "round", "type", "whiteText"],
};
</script>

<style lang="scss" scoped>
.Button {
  //   width: 100%;
  height: 29px;
  font-family: PingFangTC;
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

  padding: 0 29px;

  &:focus {
    outline: 0;
  }

  &:hover {
    cursor: pointer;
  }
}

.inactive {
  opacity: 0.5;
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
</style>
