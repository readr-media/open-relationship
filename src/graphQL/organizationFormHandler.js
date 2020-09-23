export const moveFormToGqlVariable = (organization) => {
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
  } = organization;

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

export const moveGqlToForm = (organization, targetPerson) => {
  organization.name.value = targetPerson.name;
  organization.alternative.value = targetPerson.alternative;
  organization.other_names.value = targetPerson.other_names;
  organization.identifiers.value = targetPerson.identifiers;
  organization.gender.value = targetPerson.gender;
  organization.email.value = targetPerson.email;
  organization.birth_date.value = targetPerson.birth_date;
  organization.death_date.value = targetPerson.death_date;
  organization.image.value = targetPerson.image;
  organization.summary.value = targetPerson.summary;
  organization.biography.value = targetPerson.biography;
  organization.national_identity.value = targetPerson.national_identity;
  organization.contact_details.value = targetPerson.contact_details;
  organization.links.value = targetPerson.links;
};

// name: organization.name.value,
// alternative: organization.alternative.value,
// other_names: organization.other_names.value,
// identifiers: organization.identifiers.value,
// classification: organization.classification.value,
// area: organization.area.value,
// abstract: organization.abstract.value,
// description: organization.description.value,
// founding_date: organization.founding_date.value.length
//   ? founding_date.value
//   : null,
// dissolution_date: organization.dissolution_date.value
//   ? dissolution_date.value
//   : null,
// image: organization.image.value,
// contact_details: organization.contact_details.value,
// links: organization.links.value,
// address: organization.address.value,
// source: organization.source.value,
