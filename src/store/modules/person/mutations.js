// import { state } from "../counter/state";

export const mutations = {
  SET_LOADING_STATUS: (state, status) => {
    state.loadingStatus = status;
  },

  SET_PERSON_LIST: (state, fetchedList) => {
    state.personList = fetchedList;
  },

  SET_TARGET_PERSON: (state, targetPerson) => {
    state.targetPerson = targetPerson;
  },
};
