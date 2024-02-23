const stripeTypeDefs = `
  type Mutation {
    createCheckoutSession(name: String!, email: String!, lineItems: [LineItems]!): String
  }

  input LineItems {
    price: String
    quantity: Float
  }
`;

export default stripeTypeDefs;
