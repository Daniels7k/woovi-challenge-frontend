import graphql from "babel-plugin-relay/macro";

export const UpdateDespesaMutation = graphql`
  mutation UpdateDespesaMutation(
    $id: ID!
    $name: String!
    $releaseDate: String!
    $category: String!
    $value: Int!
  ) @raw_response_type {
    updateDespesa(
      id: $id
      name: $name
      releaseDate: $releaseDate
      category: $category
      value: $value
    ) {
      id
      name
      releaseDate
      category
      value
    }
  }
`;
