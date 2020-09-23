export const moveFormToGqlVariable = (character) => {
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
  } = character;

  return {
    // put form data to graphql's field
    name: name.value,
    alternative: alternative.value,
    other_names: other_names.value,
    identifiers: other_names.identifiers,
    email: email.value,
    gender: gender.value,
    birth_date: birth_date.value ? birth_date.value : null,
    death_date: death_date.value ? death_date.value : null,
    image: image.value,
    summary: summary.value,
    biography: biography.value,
    national_identity: national_identity.value,
    contact_details: contact_details.value,
    links: links.value,
    source: source.value,
  };
};

export const moveGqlToForm = (character, targetPerson) => {
  character.name.value = targetPerson.name;
  character.alternative.value = targetPerson.alternative;
  character.other_names.value = targetPerson.other_names;
  character.identifiers.value = targetPerson.identifiers;
  character.gender.value = targetPerson.gender;
  character.email.value = targetPerson.email;
  character.birth_date.value = targetPerson.birth_date;
  character.death_date.value = targetPerson.death_date;
  character.image.value = targetPerson.image;
  character.summary.value = targetPerson.summary;
  character.biography.value = targetPerson.biography;
  character.national_identity.value = targetPerson.national_identity;
  character.contact_details.value = targetPerson.contact_details;
  character.links.value = targetPerson.links;
};

// name: character.name.value,
// alternative: character.alternative.value,
// other_names: character.other_names.value,
// identifiers: character.identifiers.value,
// classification: character.classification.value,
// area: character.area.value,
// abstract: character.abstract.value,
// description: character.description.value,
// founding_date: character.founding_date.value.length
//   ? founding_date.value
//   : null,
// dissolution_date: character.dissolution_date.value
//   ? dissolution_date.value
//   : null,
// image: character.image.value,
// contact_details: character.contact_details.value,
// links: character.links.value,
// address: character.address.value,
// source: character.source.value,
