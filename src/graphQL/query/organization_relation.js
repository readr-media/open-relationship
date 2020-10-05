import gql from "graphql-tag";

export const ADD_ORGANIZATION_RELATION = gql`
  mutation createOrganizationRelation(
    $organization_id: String!
    $related_organization_id: String!
    $relative: String
    $start_date_year: Int
    $start_date_month: Int
    $start_date_day: Int
    $end_date_year: Int
    $end_date_month: Int
    $end_date_day: Int
    $source: String
  ) {
    createOrganizationRelation(
      data: {
        organization_id: $organization_id
        related_organization_id: $related_organization_id
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
      organization_id
      related_organization_id
      relative
      start_date_year
      start_date_month
      start_date_day
      end_date_year
      end_date_month
      end_date_day
      source
    }
  }
`;

export const UPDATE_ORGANIZATION_RELATION = gql`
  mutation(
    $id: ID!
    $organization_id: String!
    $related_organization_id: String!
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
        organization_id: $organization_id
        related_organization_id: $related_organization_id
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
      organization_id
      related_organization_id
      relative
      start_date_year
      start_date_month
      start_date_day
      end_date_year
      end_date_month
      end_date_day
      source
    }
  }
`;

export const FETCH_ORGANIZATION_RELATIONS_COUNT = gql`
  query {
    _allOrganizationRelationsMeta {
      count
    }
  }
`;
// $parent:String,
// $children:String,

export const FETCH_RANDOM_ORGANIZATION_RELATION = gql`
  query getRandomOrganizationRelation($id: ID!) {
    OrganizationRelation(where: { id: $id }) {
      id
      organization_id
      related_organization_id
      relative
      start_date_year
      start_date_month
      start_date_day
      end_date_year
      end_date_month
      end_date_day
      source
    }
  }
`;
