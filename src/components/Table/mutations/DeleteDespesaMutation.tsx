import graphql from "babel-plugin-relay/macro";

export const DeleteDespesaMutation = graphql`
  mutation DeleteDespesaMutation($id: ID!) {
    deleteDespesa(id: $id) {
      id @deleteRecord
    }
  }
`;
