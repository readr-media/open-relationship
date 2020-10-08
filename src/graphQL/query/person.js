import gql from 'graphql-tag'

export const ADD_PERSON = gql`
  mutation createPerson(
    $name: String!
    $alternative: String
    $other_names: String
    $email: String
    $gender: String
    $birth_date_year: Int
    $birth_date_month: Int
    $birth_date_day: Int
    $death_date_year: Int
    $death_date_month: Int
    $death_date_day: Int
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
        email: $email
        gender: $gender
        birth_date_year: $birth_date_year
        birth_date_month: $birth_date_month
        birth_date_day: $birth_date_day
        death_date_year: $death_date_year
        death_date_month: $death_date_month
        death_date_day: $death_date_day
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
      email
      gender
      birth_date_year
      birth_date_month
      birth_date_day
      death_date_year
      death_date_month
      death_date_day
      image
      summary
      biography
      national_identity
      contact_details
      links
      source
    }
  }
`

export const UPDATE_PERSON = gql`
  mutation(
    $id: ID!
    $name: String!
    $alternative: String
    $other_names: String
    $email: String
    $gender: String
    $birth_date_year: Int
    $birth_date_month: Int
    $birth_date_day: Int
    $death_date_year: Int
    $death_date_month: Int
    $death_date_day: Int
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
        email: $email
        gender: $gender
        birth_date_year: $birth_date_year
        birth_date_month: $birth_date_month
        birth_date_day: $birth_date_day
        death_date_year: $death_date_year
        death_date_month: $death_date_month
        death_date_day: $death_date_day
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
      email
      gender
      birth_date_year
      birth_date_month
      birth_date_day
      death_date_year
      death_date_month
      death_date_day
      image
      summary
      biography
      national_identity
      contact_details
      links
      source
    }
  }
`

export const FETCH_PERSONS_COUNT = gql`
  query {
    _allPersonsMeta {
      count
    }
  }
`

export const FETCH_RANDOM_PERSON = gql`
  query Person($id: ID!) {
    Person(where: { id: $id }) {
      id
      name
      alternative
      other_names
      email
      gender
      birth_date_year
      birth_date_month
      birth_date_day
      death_date_year
      death_date_month
      death_date_day
      image
      summary
      biography
      national_identity
      contact_details
      links
      source
    }
  }
`
// $birth_date:String,$death_date:String,$image:String,$summary:String,$biography:String,$national_identity:String,
// birth_date:$birth_date,death_date:$death_date,image:$image,summary:$summary,biography:$biography,national_identity:$national_identity

// death_date
// image
// summary
// biography
// national_identity
