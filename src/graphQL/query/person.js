import gql from "graphql-tag";

export const ADD_PERSON = gql`
  mutation createPerson(
    $name: String!
    $alternative: String
    $other_names: String
    $identifiers: String
    $email: String
    $gender: String
    $birth_date: String
    $death_date: String
    $image: String
    $summary: String
    $biography: String
    $national_identity: String
    $contact_details: String
    $links: String
    $source: String
  ) {
    createPerson(
      data: {
        name: $name
        alternative: $alternative
        other_names: $other_names
        identifiers: $identifiers
        email: $email
        gender: $gender
        birth_date: $birth_date
        death_date: $death_date
        image: $image
        summary: $summary
        biography: $biography
        national_identity: $national_identity
        contact_details: $contact_details
        links: $links
        source: $source
      }
    ) {
      name
      alternative
      other_names
      identifiers
      email
      gender
      birth_date
      death_date
      image
      summary
      biography
      national_identity
      contact_details
      links
      source
    }
  }
`;

export const UPDATE_PERSON = gql`
  mutation(
    $id: ID!
    $name: String!
    $alternative: String
    $other_names: String
    $identifiers: String
    $email: String
    $gender: String
    $birth_date: String
    $death_date: String
    $image: String
    $summary: String
    $biography: String
    $national_identity: String
    $contact_details: String
    $links: String
    $source: String
  ) {
    updatePerson(
      id: $id
      data: {
        name: $name
        alternative: $alternative
        other_names: $other_names
        identifiers: $identifiers
        email: $email
        gender: $gender
        birth_date: $birth_date
        death_date: $death_date
        image: $image
        summary: $summary
        biography: $biography
        national_identity: $national_identity
        contact_details: $contact_details
        links: $links
        source: $source
      }
    ) {
      id
      name
      alternative
      other_names
      identifiers
      email
      gender
      birth_date
      death_date
      image
      summary
      biography
      national_identity
      contact_details
      links
      source
    }
  }
`;

export const FETCH_PERSONS = gql`
  query {
    allPersons {
      id
      name
      alternative
      other_names
      identifiers
      email
      gender
      birth_date
      death_date
      image
      summary
      biography
      national_identity
      contact_details
      links
      source
    }
  }
`;
export const FETCH_PERSONS_COUNT = gql`
  query {
    _allPersonsMeta {
      count
    }
  }
`;

export const FETCH_RANDOM_PERSON = gql`
  query getRandomPerson($id: ID!) {
    Person(where: { id: $id }) {
      id
      name
      alternative
      other_names
      identifiers
      email
      gender
      birth_date
      death_date
      image
      summary
      biography
      national_identity
      contact_details
      links
      source
    }
  }
`;
// $birth_date:String,$death_date:String,$image:String,$summary:String,$biography:String,$national_identity:String,
// birth_date:$birth_date,death_date:$death_date,image:$image,summary:$summary,biography:$biography,national_identity:$national_identity

// death_date
// image
// summary
// biography
// national_identity