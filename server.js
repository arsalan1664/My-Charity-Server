import dotenv from "dotenv";
import { ApolloServer } from "@apollo/server";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import connectDatabase from "./db/connectDatabase.js";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import http from "http";
import { typeDefs, resolvers } from "./graphql/controller/index.js";
import stripe from "stripe";

async function startServer() {
  dotenv.config();
  const app = express();
  const httpServer = http.createServer(app);
  const stripeIns = stripe(
    "sk_test_51Okn0DLJlLtKJ2rbnbFFxpajgDve6pQVBHAiuzJBrJdQSR8PHcdYwxViAzL9CjkFYzPBhUcaHbp5wwzxw1686d1600oa1UZRa9"
  );

  // Connecting to the database
  connectDatabase();

  // Use middleware
  app.use(morgan("dev"));
  app.use(cors());

  // Define a route for the root endpoint
  app.get("/", (req, res) => res.send("<h1>Charity App Api</h1>"));

  // server

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();

  // Define a route for the root endpoint

  app.use(
    "/graphql",

    cors({
      origin: [process.env.FRONTEND_DOMAIN, "https://studio.apollographql.com"],
    }),
    express.json(),
    expressMiddleware(server)
  );

  const endpointSecret =
    "whsec_578cf8fa7462a4f6e57c81d006847be022b78e1f0348f5a79292303b12924a8e";

  app.post(
    "/webhook",
    express.raw({ type: "application/json" }),
    async (req, res) => {
      const payload = req.body;

      try {
        const event = stripeIns.webhooks.constructEvent(
          payload,
          req.headers["stripe-signature"],
          endpointSecret
        );

        // Handle the webhook event here
        if (event.type === "checkout.session.completed") {
          const session = event.data.object;
          console.log(session.customer_details.name);
          console.log(session.customer_details.email);
          console.log(session.amount_total);
          // Trigger the GraphQL mutation to add payment details to the database
          await server.executeOperation({
            query: `
            mutation ($name: String!, $email: String!, $amount: Float!) {
              createDonor(name: $name, email: $email, amount: $amount) {
                message
                success
              }
            }
          `,
            variables: {
              name: session.customer_details.name,
              email: session.customer_details.email,
              amount: session.amount_total / 100,
            },
          });

          console.log("GraphQL mutation triggered successfully.");
        }

        res.json({ received: true });
      } catch (error) {
        console.error("Error handling webhook:", error.message);
        res.status(400).send(`Webhook Error: ${error.message}`);
      }
    }
  );
  await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));

  console.log(`🚀 Server ready at http://localhost:4000/graphql`);
}

startServer();
