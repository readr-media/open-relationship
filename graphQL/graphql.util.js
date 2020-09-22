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
      return result.json();
    })
    .catch((error) => {
      console.log("Upload failed");
      return error.message;
    });
};

export const graphqlHandler = async (query, targetData) => {
  // destructure character field
  const {
    name,
    alternative,
    other_names,
    identifiers,
    email,
    gender,
    birth_date,
    death_date,
    image,
    summary,
    biography,
    national_identity,
    contact_details,
    links,
    source,
  } = targetData;
  // commit to graphQL
  await graphql(query, {
    name: name.value,
    alternative: alternative.value,
    other_names: other_names.value,
    identifiers: other_names.identifiers,
    email: email.value,
    gender: gender.value,
    birth_date: birth_date.value.length ? birth_date.value : null,
    death_date: death_date.value.length ? death_date.value : null,
    image: image.value,
    summary: summary.value,
    biography: biography.value,
    national_identity: national_identity.value,
    contact_details: contact_details.value,
    links: links.value,
    source: source.value,
  });
};
