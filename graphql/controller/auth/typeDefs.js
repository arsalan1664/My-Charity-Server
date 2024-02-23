const authTypeDefs = `
  type User {
    _id: ID!
    username: String
    password: String!
  }
  type Query {
    users: User
  }
  type Token {
    token: String,
    message: String,
    success: Boolean,
  }
  type Mutation {
    register(username: String!, password: String!): Response
    login(username: String!, password: String!): Token
    editUser(token: String!, newUsername: String!, newPassword: String!): Response!
  }
  type Response{
    message: String,
    success: Boolean,
  }

`;

export default authTypeDefs;
