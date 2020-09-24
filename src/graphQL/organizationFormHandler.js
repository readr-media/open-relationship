export const moveFormToGqlVariable = (organization) => {
  const {
    name,
    alternative,
    other_names,
    identifiers,
    classification,
    area,
    abstract,
    description,
    founding_date,
    dissolution_date,
    image,
    contact_details,
    links,
    address,
    source,
  } = organization;

  return {
    // put form data to graphql's field
    name: name.value,
    alternative: alternative.value,
    other_names: other_names.value,
    identifiers: other_names.identifiers,
    classification: classification.value,
    area: area.value,
    abstract: abstract.value,
    description: description.value,
    founding_date: founding_date.value ? founding_date.value : null,
    dissolution_date: dissolution_date.value ? dissolution_date.value : null,
    image: image.value,
    contact_details: contact_details.value,
    links: links.value,
    address: address.value,
    source: source.value,
  };
};

export const moveGqlToForm = (organization, target) => {
  organization.name.value = target.name;
  organization.alternative.value = target.alternative;
  organization.other_names.value = target.other_names;
  organization.identifiers.value = target.identifiers;
  organization.classification.value = target.classification;
  organization.area.value = target.area;
  organization.abstract.value = target.abstract;
  organization.description.value = target.description;
  organization.founding_date.value = target.founding_date;
  organization.dissolution_date.value = target.dissolution_date;
  organization.image.value = target.image;
  organization.contact_details.value = target.contact_details;
  organization.death_date.value = target.death_date;
  organization.links.value = target.links;
  organization.address.value = target.address;
  organization.source.value = target.source;
};
