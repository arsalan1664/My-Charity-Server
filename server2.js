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

async function startServer() {
  dotenv.config();
  const app = express();
  const httpServer = http.createServer(app);

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
  app.post("/webhook", async (req, res) => {
    const payload = req.body;

    try {
      // Verify the webhook signature
      const event = stripe.webhooks.constructEvent(
        req.rawBody,
        req.headers["stripe-signature"],
        "your_stripe_webhook_secret"
      );

      if (event.type === "checkout.session.completed") {
        // Handle successful payment
        const session = event.data.object;

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
            name: session.payment_intent,
            email: session.customer,
            amount: session.customer,
          },
        });

        console.log("GraphQL mutation triggered successfully.");
      }

      res.json({ received: true });
    } catch (error) {
      console.error("Error handling webhook:", error.message);
      res.status(400).send(`Webhook Error: ${error.message}`);
    }
  });
  await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));

  console.log(`🚀 Server ready at http://localhost:4000/graphql`);
}

startServer();
