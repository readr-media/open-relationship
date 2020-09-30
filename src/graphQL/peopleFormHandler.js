import { devideDate, mergeDate } from "../components/fieldVerify";
export const moveFormToGqlVariable = (person) => {
  const {
    name,
    alternative,
    other_names,
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
  } = person;

  return {
    // put form data to graphql's field
    name: name.value,
    alternative: alternative.value,
    other_names: other_names.value,
    email: email.value,
    gender: gender.value,
    birth_date_year: devideDate(birth_date.value, "year"),
    birth_date_month: devideDate(birth_date.value, "month"),
    birth_date_day: devideDate(birth_date.value, "day"),
    death_date_year: devideDate(death_date.value, "year"),
    death_date_month: devideDate(death_date.value, "month"),
    death_date_day: devideDate(death_date.value, "day"),
    // death_date: null,
    image: image.value,
    summary: summary.value,
    biography: biography.value,
    national_identity: national_identity.value,
    contact_details: contact_details.value,
    links: links.value,
    source: source.value,
  };
};

export const moveGqlToForm = (person, targetPerson) => {
  person.name.value = targetPerson.name;
  person.alternative.value = targetPerson.alternative;
  person.other_names.value = targetPerson.other_names;
  person.gender.value = targetPerson.gender;
  person.email.value = targetPerson.email;
  person.birth_date.value = mergeDate(
    targetPerson.birth_date_year,
    targetPerson.birth_date_month,
    targetPerson.birth_date_day
  );
  person.death_date.value = mergeDate(
    targetPerson.death_date_year,
    targetPerson.death_date_month,
    targetPerson.death_date_day
  );
  person.image.value = targetPerson.image;
  person.summary.value = targetPerson.summary;
  person.biography.value = targetPerson.biography;
  person.national_identity.value = targetPerson.national_identity;
  person.contact_details.value = targetPerson.contact_details;
  person.links.value = targetPerson.links;
  person.source.value = targetPerson.source;
};
