import Vue from "vue";
import Vuex from "vuex";
import person from "./modules/person/person";

Vue.use(Vuex);

const store = () => {
  return new Vuex.Store({
    modules: {
      person,
    },
  });
};

export default store;
