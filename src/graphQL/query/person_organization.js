import gql from 'graphql-tag'

export const ADD_PERSON_ORGANIZATION = gql`
  mutation createPersonOrganization(
    $person_id: ID!
    $organization_id: ID!
    $role: String
    $start_date_year: Int
    $start_date_month: Int
    $start_date_day: Int
    $end_date_year: Int
    $end_date_month: Int
    $end_date_day: Int
    $source: String
  ) {
    createPersonOrganization(
      data: {
        person_id: { connect: { id: $person_id } }
        organization_id: { connect: { id: $organization_id } }
        role: $role
        start_date_year: $start_date_year
        start_date_month: $start_date_month
        start_date_day: $start_date_day
        end_date_year: $end_date_year
        end_date_month: $end_date_month
        end_date_day: $end_date_day
        source: $source
      }
    ) {
      id
    }
  }
`

export const UPDATE_PERSON_ORGANIZATION = gql`
  mutation(
    $id: ID!
    $person_id: ID!
    $organization_id: ID!
    $role: String
    $start_date_year: Int
    $start_date_month: Int
    $start_date_day: Int
    $end_date_year: Int
    $end_date_month: Int
    $end_date_day: Int
    $source: String
  ) {
    updatePersonOrganization(
      id: $id
      data: {
        person_id: { connect: { id: $person_id } }
        organization_id: { connect: { id: $organization_id } }
        role: $role
        start_date_year: $start_date_year
        start_date_month: $start_date_month
        start_date_day: $start_date_day
        end_date_year: $end_date_year
        end_date_month: $end_date_month
        end_date_day: $end_date_day
        source: $source
      }
    ) {
      id
    }
  }
`

export const FETCH_PERSON_ORGANIZATIONS_COUNT = gql`
  query {
    _allPersonOrganizationsMeta {
      count
    }
  }
`

export const FETCH_RANDOM_PERSON_ORGANIZATION = gql`
  query getRandomPersonOrganization($id: ID!) {
    PersonOrganization(where: { id: $id }) {
      id
      person_id {
        id
        name
      }
      organization_id {
        id
        name
      }
      role
      start_date_year
      start_date_month
      start_date_day
      end_date_year
      end_date_month
      end_date_day
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
