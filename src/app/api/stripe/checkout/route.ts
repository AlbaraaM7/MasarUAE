import { NextResponse } from "next/server";
import { stripe, PLANS } from "@/lib/stripe";
import { StripeCheckoutSchema } from "@/lib/validations";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parseResult = StripeCheckoutSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parseResult.error.format() },
        { status: 400 }
      );
    }

    const { planTier, customerEmail, successUrl, cancelUrl } = parseResult.data;
    const plan = PLANS[planTier];

    if (!plan) {
      return NextResponse.json({ error: "Invalid plan tier" }, { status: 400 });
    }

    // Check if live Stripe secret key is present
    const isMock =
      !process.env.STRIPE_SECRET_KEY ||
      process.env.STRIPE_SECRET_KEY.includes("mock") ||
      process.env.STRIPE_SECRET_KEY.includes("placeholder");

    if (isMock) {
      return NextResponse.json({
        success: true,
        mode: "sandbox_mock",
        checkoutUrl: `${successUrl}?session_id=mock_session_${Date.now()}&plan=${planTier}`,
        plan,
        message: "Stripe sandbox simulated. Add live STRIPE_SECRET_KEY to .env.local to enable live card payments.",
      });
    }

    // Real Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: plan.currency,
            product_data: {
              name: plan.name,
              description: "Full access to AI Past Paper Coach, University Matcher, and Academic CV Builder",
            },
            unit_amount: plan.amountCents,
            recurring: {
              interval: plan.interval,
            },
          },
          quantity: 1,
        },
      ],
      mode: "subscription",
      customer_email: customerEmail,
      success_url: `${successUrl}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl,
    });

    return NextResponse.json({
      success: true,
      checkoutUrl: session.url,
      sessionId: session.id,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to create checkout session" }, { status: 500 });
  }
}
