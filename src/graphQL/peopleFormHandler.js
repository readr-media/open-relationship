import { devideDate, mergeDate } from "../components/fieldVerify";
export const moveFormToGqlVariable = (character) => {
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
  } = character;

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

export const moveGqlToForm = (character, targetPerson) => {
  character.name.value = targetPerson.name;
  character.alternative.value = targetPerson.alternative;
  character.other_names.value = targetPerson.other_names;
  character.gender.value = targetPerson.gender;
  character.email.value = targetPerson.email;
  character.birth_date.value = mergeDate(
    targetPerson.birth_date_year,
    targetPerson.birth_date_month,
    targetPerson.birth_date_day
  );
  character.death_date.value = mergeDate(
    targetPerson.death_date_year,
    targetPerson.death_date_month,
    targetPerson.death_date_day
  );
  character.image.value = targetPerson.image;
  character.summary.value = targetPerson.summary;
  character.biography.value = targetPerson.biography;
  character.national_identity.value = targetPerson.national_identity;
  character.contact_details.value = targetPerson.contact_details;
  character.links.value = targetPerson.links;
};
