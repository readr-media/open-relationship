import axios from "axios";

export const actions = {
  fetchPersonList(context) {
    context.commit("SET_LOADING_STATUS", "loading");
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        console.log(response.data);
        context.commit("SET_LOADING_STATUS", "notLoading");
        context.commit("SET_PERSON_LIST", response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  },
};
