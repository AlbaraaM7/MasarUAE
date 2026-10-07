import Stripe from "stripe";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY || "sk_test_placeholder_key_for_dev";

export const stripe = new Stripe(stripeSecretKey, {
  apiVersion: "2025-02-24.acacia" as any,
  typescript: true,
});

export const PLANS = {
  pro_monthly: {
    name: "Masar Pro Monthly",
    priceAED: 39,
    amountCents: 3900,
    currency: "aed",
    interval: "month" as const,
  },
  pro_annual: {
    name: "Masar Pro Annual",
    priceAED: 299,
    amountCents: 29900,
    currency: "aed",
    interval: "year" as const,
  },
  counselor_monthly: {
    name: "Counselor & School Pass Monthly",
    priceAED: 149,
    amountCents: 14900,
    currency: "aed",
    interval: "month" as const,
  },
  counselor_annual: {
    name: "Counselor & School Pass Annual",
    priceAED: 1190,
    amountCents: 119000,
    currency: "aed",
    interval: "year" as const,
  },
};
