import { devideDate, mergeDate } from "../components/fieldVerify";
export const moveFormToGqlVariable = (person) => {
  const {
    person_id,
    related_person_id,
    relative,
    start_date,
    end_date,
    source,
  } = person;

  return {
    // put form data to graphql's field
    person_id: person_id.value,
    related_person_id: related_person_id.value,
    relative: relative.value,

    start_date_year: devideDate(start_date.value, "year"),
    start_date_month: devideDate(start_date.value, "month"),
    start_date_day: devideDate(start_date.value, "day"),
    end_date_year: devideDate(end_date.value, "year"),
    end_date_month: devideDate(end_date.value, "month"),
    end_date_day: devideDate(end_date.value, "day"),

    source: source.value,
  };
};

export const moveGqlToForm = (person, targetPerson) => {
  person.person_id.value = targetPerson.person_id;
  person.related_person_id.value = targetPerson.related_person_id;
  person.relative.value = targetPerson.relative;

  person.start_date.value = mergeDate(
    targetPerson.start_date_year,
    targetPerson.start_date_month,
    targetPerson.start_date_day
  );
  person.end_date.value = mergeDate(
    targetPerson.end_date_year,
    targetPerson.end_date_month,
    targetPerson.end_date_day
  );
  person.source.value = targetPerson.source;
};
