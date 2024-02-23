import stripe from "stripe";

const stripeInstance = stripe(
  "sk_test_51NlT6cE0bAsB0kCmlTmtq9InBp3QKK6gjA4WulUNSSd6dWBGjnlMZAvfP3JcrFm47Ngmbn6Qtx5Jj7TajBu1NYWW00BVN9ktTD"
); // env not work that why hard coding

const stripeResolvers = {
  Mutation: {
    createCheckoutSession: async (_, { name, email, lineItems }) => {
      try {
        const line_items = lineItems;
        const session = await stripeInstance.checkout.sessions.create({
          customer_email: email,
          line_items,
          mode: "payment",
          success_url: process.env.FRONTEND_DOMAIN + "/thankyou",
          cancel_url: process.env.FRONTEND_DOMAIN + "/",
        });

        return JSON.stringify(session.url);
      } catch (error) {
        console.error("Error creating checkout session:", error.message);
        throw new Error("Failed to create checkout session");
      }
    },
  },
};

export default stripeResolvers;
