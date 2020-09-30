import gql from "graphql-tag";

export const ADD_COLLABORATE = gql`
  mutation createCollaborate($name: String, $email: String, $feedback: String) {
    createCollaborate(
      data: { name: $name, email: $email, feedback: $feedback }
    ) {
      name
      email
      feedback
    }
  }
`;
