import gql from "graphql-tag";

export const FETCH_ORGANIZATIONS = gql`
  query {
    allOrganizations {
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

export const ADD_ORGANIZATION = gql`
  mutation createOrganization(
    $name: String!
    $alternative: String
    $other_names: String
    $identifiers: String
    $classification: String
    $area: String
    $abstract: String
    $description: String
    $founding_date_year: Int
    $founding_date_month: Int
    $founding_date_day: Int
    $dissolution_date_year: Int
    $dissolution_date_month: Int
    $dissolution_date_day: Int
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
        founding_date_year: $founding_date_year
        founding_date_month: $founding_date_month
        founding_date_day: $founding_date_day
        dissolution_date_year: $dissolution_date_year
        dissolution_date_month: $dissolution_date_month
        dissolution_date_day: $dissolution_date_day
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
      founding_date_year
      founding_date_month
      founding_date_day
      dissolution_date_year
      dissolution_date_month
      dissolution_date_day
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
