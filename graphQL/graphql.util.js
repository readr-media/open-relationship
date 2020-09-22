export const graphql = async (query, variables = {}) => {
  return fetch("http://localhost:3000/admin/api", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      variables,
      query,
    }),
  })
    .then((result) => {
      console.log("Upload success");
      console.log(result);
      return result.json();
    })
    .catch((error) => {
      console.log("Upload failed");
      console.log(error);
      return error.message;
    });
};

// // 如果今天要將object中的項目個別取出並作為變數
// const list = {
//   name: "Liyi",
//   age: 30,
//   gender: "male",
// };
// // ES6可以用以下手法destructure出來
// const { name, age, gender } = list;
// 然而若該物件的形式改成：
// const list = {
//   name:{
//     id:1,
//     value: "Liyi",
//   },
//   age: {
//     id:2,
//     value: 30,
//   },
//   gender: {
//     id:3,
//     value: "male",
//   },
// };

// const { name, age, gender } = list;
// console.log(name);

// 此時仍希望得到狀況一的destructure結果
