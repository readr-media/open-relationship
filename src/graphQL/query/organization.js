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
