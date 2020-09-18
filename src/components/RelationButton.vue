<template>
  <router-link class="RelationButton" :to="to">
    {{ title }}
  </router-link>
</template>

<script>
export default {
  props: ["title", "to"],
};
</script>

<style lang="scss" scoped>
.RelationButton {
  width: 170px;
  height: 80px;
  border-radius: 42px;

  font-family: PingFangTC;
  font-size: 21px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #ffffff;

  display: flex;
  flex-direction: column;
  justify-content: center;

  margin: 0 15px;
  cursor: pointer;
  text-decoration: none;
}
</style>
