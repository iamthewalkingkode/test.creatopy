const { gql } = require('apollo-server');

const typeDefs = gql`
  type User {
      id: Int
      name: String!
      email: String!
      password: String!
      createdAt: String!
      updatedAt: String!
  }
  type Item {
    id: Int
    title: String!
    user: User!
    userId: Int!
    createdAt: String!
    updatedAt: String!
  }

  type Authenticate {
    user: User!
    token: String!
  }

  # Queries
  type Query {
    users: [User!]!
  }
  type Query {
    GetItems: [Item!]!
  }

  # Mutations
  type Mutation {
    Login(email: String!, password: String!): Authenticate!
    Signup(name: String!, email: String!, password: String!): Authenticate!
    Reset(email: String!): String!
    ResetConfirm(code: String! password: String!): String!
    CreateItem(title: String!, userId: Int!): Item!
  }
`;

module.exports = typeDefs;