const crudTypeDefs = `
type Donor {
  _id: ID!
  name: String!
  email: String!
  amount: Float!
  createdAt: Date
  updatedAt: Date
}
scalar Date


  type Response {
    success: Boolean!
    message: String
  }

  
  type Query {
    donors: [Donor]
    donor(id: ID!): Donor
  }
  type Mutation {
    createDonor(name: String!, email: String!, amount: Float!): Response
    updateDonor(id: ID!,  name: String, email: String, amount: Float): Response
    deleteDonor(id: ID!): Response
  }



  
`;

export default crudTypeDefs;
