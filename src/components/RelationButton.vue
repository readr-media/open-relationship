<template>
  <router-link
    class="RelationButton"
    :to="to"
    :class="{
      dark: dark,
      create: type == 'create',
      verify: type == 'verify',
    }"
  >
    <span>{{ title }}</span>
  </router-link>
</template>

<script>
export default {
  props: ["title", "to", "dark", "type"],
};
</script>

<style lang="scss" scoped>
@import "../styles/responsiveMixin.scss";

.RelationButton {
  width: 100%;
  // max-width: auto;

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

  @include atLarge {
    width: 170px;
    padding: 26px 22px;
    height: 80px;
    margin-bottom: 50px;
  }
}
.dark {
  @include atLarge {
    width: 170px;
    padding: 26px 22px;
    height: auto;
    margin-bottom: 50px;
  }
}

.create {
  color: #ed8c4a;
  border: solid 1px #ed8c4a;
}

.verify {
  color: #63c1e2;
  border: solid 1px #63c1e2;
}
</style>
