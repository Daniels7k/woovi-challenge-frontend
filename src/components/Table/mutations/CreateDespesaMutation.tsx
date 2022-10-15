import graphql from "babel-plugin-relay/macro";

export const CreateDespesaMutation = graphql`
  mutation CreateDespesaMutation(
    $name: String!
    $releaseDate: String!
    $category: String!
    $value: Float!
  ) {
    createDespesa(
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
