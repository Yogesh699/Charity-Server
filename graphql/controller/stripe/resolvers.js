import stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

const stripeInstance = stripe(process.env.STRIPE);
const stripeResolvers = {
  Mutation: {
    createCheckoutSession: async (_, { name, email, lineItems }) => {
      try {
        const line_items = lineItems;
        const session = await stripeInstance.checkout.sessions.create({
          customer_email: email,
          line_items,
          mode: "payment",
          success_url: process.env.FRONTEND_DOMAIN ,
          cancel_url: process.env.FRONTEND_DOMAIN ,
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
