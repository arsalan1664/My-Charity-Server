import authTypeDefs from "./auth/typeDefs.js";
import crudTypeDefs from "./crud/typeDefs.js";
import stripeTypeDefs from "./stripe/typeDefs.js";
import authResolvers from "./auth/resolvers.js";
import crudResolvers from "./crud/resolvers.js";
import stripeResolvers from "./stripe/resolvers.js";

// Combining all the types
const typeDefs = authTypeDefs + crudTypeDefs + stripeTypeDefs;

// Combining all the resolvers
const resolvers = {
  Mutation: {
    ...authResolvers.Mutation,
    ...crudResolvers.Mutation,
    ...stripeResolvers.Mutation,
  },
  Query: {
    ...crudResolvers.Query,
    // ...stripeResolvers.Query,
  },
};

export { typeDefs, resolvers };

////////// error///////////
