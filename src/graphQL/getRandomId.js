export const getRandomId = (counts) => {
  // console.log(list);
  // if (!counts) return 1;

  const randomIndex = Math.floor(Math.random() * counts + 1);
  return randomIndex;
};
