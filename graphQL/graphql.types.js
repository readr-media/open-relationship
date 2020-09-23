import gql from "graphql-tag";

export const FETCH_PERSONS = `
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

export const ADD_PERSON = `
  mutation createPerson(
    $id: String
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
        id: $id
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

// $birth_date:String,$death_date:String,$image:String,$summary:String,$biography:String,$national_identity:String,
// birth_date:$birth_date,death_date:$death_date,image:$image,summary:$summary,biography:$biography,national_identity:$national_identity

// death_date
// image
// summary
// biography
// national_identity

export const ADD_ORGANIZATION = `
  mutation createOrganization(
    $name: String!
    $alternative: String
    $other_names: String
    $identifiers: String
    $classification: String
    $area: String
    $abstract: String
    $description: String
    $founding_date: String
    $dissolution_date: String
    $image: String
    $contact_details: String
    $links: String
    $address: String
    $source: String
  ) {
    createOrganization(
      data: {
        name: $name
        alternative: $alternative
        other_names: $other_names
        identifiers: $identifiers
        classification: $classification
        area: $area
        abstract: $abstract
        description: $description
        founding_date: $founding_date
        dissolution_date: $dissolution_date
        image: $image
        contact_details: $contact_details
        links: $links
        address: $address
        source: $source
      }
    ) {
      name
      alternative
      other_names
      identifiers
      classification
      abstract
      description
      founding_date
      dissolution_date
      image
      contact_details
      links
      address
      source
    }
  }
`;
// $parent:String,
// $children:String,
