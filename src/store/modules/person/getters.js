export const getters = {
  getPersonList: (state) => {
    return state.personList;
  },
  getRandomPerson: (state) => {
    return getRandomFromList(state.personList);
  },
};

function getRandomFromList(list) {
  const numberOfPeople = list.length;
  const randomIndex = Math.floor(Math.random() * numberOfPeople);
  const result = list[randomIndex];
  console.log(result);

  return result;
}
