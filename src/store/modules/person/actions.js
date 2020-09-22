import { graphql } from "../../../../graphQL/graphql.util";
import { FETCH_PERSONS } from "../../../../graphQL/graphql.types";
import axios from "axios";
import ApolloClient from "apollo-client";

export const actions = {
  async fetchPersonList(context) {
    context.commit("SET_LOADING_STATUS", "loading");

    const results = await graphql(FETCH_PERSONS);
    // console.log(results.data.allPersons);
    //   axios({
    //     url: `http://localhost:3000/admin/api/`,
    //     method: "post",
    //     data: { query: FETCH_PERSONS },
    //   })
    //     .then((response) => {
    //       console.log(response.data);
    //       context.commit("SET_LOADING_STATUS", "notLoading");
    //       context.commit("SET_PERSON_LIST", response.data);
    //     })
    //     .catch((error) => {
    //       console.log(error.message);
    //     });

    context.commit("SET_LOADING_STATUS", "notLoading");
    context.commit("SET_PERSON_LIST", results.data.allPersons);
    // context.commit(
    //   "SET_TARGET_PERSON",
    //   getRandomPerson(results.data.allPersons)
    // );
  },
};

// function getRandomPerson(list) {
//   const numberOfPeople = list.length;
//   const randomIndex = Math.floor(Math.random() * numberOfPeople);
//   return list[randomIndex];
// }
