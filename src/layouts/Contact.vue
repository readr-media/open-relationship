<template>
  <div id="Contact">
    <div class="section-title" id="Contact-title">
      留下 email, 通知你最新進度！
    </div>
    <form id="Contact-form">
      <input type="text" id="Contact-form-input" />
      <Button title="送出" />
    </form>
  </div>
</template>

<script>
import Button from "../components/Button";
export default {
  components: {
    Button,
  },
};
</script>

<style lang="scss" scoped>
#Contact {
  height: 179px;
  width: 100%;
  background-color: #ebebeb;
  overflow: auto;

  #Contact-form {
    display: flex;
    flex-direction: row;
    justify-content: center;
    #Contact-form-input {
      width: 500px;
      height: 50px;
      box-shadow: inset 0 1px 3px 0 rgba(0, 0, 0, 0.5);
      background-color: #ffffff;
      margin-right: 10px;
    }
  }
}
</style>
