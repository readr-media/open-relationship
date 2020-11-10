import gql from 'graphql-tag'

export const ADD_ORGANIZATION_RELATION = gql`
  mutation createOrganizationRelation(
    $organization_id: ID!
    $related_organization_id: ID!
    $relative: String
    $start_date_year: Int
    $start_date_month: Int
    $start_date_day: Int
    $end_date_year: Int
    $end_date_month: Int
    $end_date_day: Int
    $source: String
    $tags: TagRelateToManyInput
  ) {
    createOrganizationRelation(
      data: {
        organization_id: { connect: { id: $organization_id } }
        related_organization_id: { connect: { id: $related_organization_id } }
        relative: $relative
        start_date_year: $start_date_year
        start_date_month: $start_date_month
        start_date_day: $start_date_day
        end_date_year: $end_date_year
        end_date_month: $end_date_month
        end_date_day: $end_date_day
        source: $source
        tags: $tags
      }
    ) {
      id
    }
  }
`

export const UPDATE_ORGANIZATION_RELATION = gql`
  mutation(
    $id: ID!
    $organization_id: ID!
    $related_organization_id: ID!
    $relative: String
    $start_date_year: Int
    $start_date_month: Int
    $start_date_day: Int
    $end_date_year: Int
    $end_date_month: Int
    $end_date_day: Int
    $source: String
  ) {
    updateOrganizationRelation(
      id: $id
      data: {
        organization_id: { connect: { id: $organization_id } }
        related_organization_id: { connect: { id: $related_organization_id } }
        relative: $relative
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

// $parent:String,
// $children:String,
