import { gql } from "@apollo/client"

export const GET_USER = gql`
  query userById($_id: MongoID!) {
    userById(_id: $_id) {
      username
      password
      email
    }
  }
`
