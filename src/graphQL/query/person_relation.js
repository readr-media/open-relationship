import gql from "graphql-tag";

export const ADD_PERSON_RELATION = gql`
  mutation createPersonRelation(
    $person_id: String!
    $related_person_id: String!
    $relative: String
    $start_date_year: Int
    $start_date_month: Int
    $start_date_day: Int
    $end_date_year: Int
    $end_date_month: Int
    $end_date_day: Int
    $source: String
  ) {
    createPersonRelation(
      data: {
        person_id: { name: $person_id }
        related_person_id: $related_person_id
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
      person_id
      related_person_id
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

export const UPDATE_PERSON_RELATION = gql`
  mutation(
    $id: ID!
    $person_id: String!
    $related_person_id: String!
    $relative: String
    $start_date_year: Int
    $start_date_month: Int
    $start_date_day: Int
    $end_date_year: Int
    $end_date_month: Int
    $end_date_day: Int
    $source: String
  ) {
    updatePersonRelation(
      id: $id
      data: {
        name: $name
        related_person_id: $related_person_id
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
      person_id
      related_person_id
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

export const FETCH_PERSON_RELATIONS_COUNT = gql`
  query {
    _allPersonRelationsMeta {
      count
    }
  }
`;

export const FETCH_RANDOM_PERSON_RELATION = gql`
  query getRandomPersonRelation($id: ID!) {
    PersonRelation(where: { id: $id }) {
      id
      person_id
      related_person_id
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
// $birth_date:String,$death_date:String,$image:String,$summary:String,$biography:String,$national_identity:String,
// birth_date:$birth_date,death_date:$death_date,image:$image,summary:$summary,biography:$biography,national_identity:$national_identity

// death_date
// image
// summary
// biography
// national_identity
