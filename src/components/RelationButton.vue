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
  width: 100%;
  border-radius: 42px;
  padding: 10px 0;
  margin-bottom: 30px;

  font-family: PingFang TC;
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

  // margin: 0 15px;
  cursor: pointer;
  text-decoration: none;
}
</style>
