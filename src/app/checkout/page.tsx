// app/checkout/page.tsx
"use client";

import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import { useRouter } from "next/navigation";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string
);

export default function Checkout() {
  const [amount, setAmount] = useState(1000); // Monto en centavos
  const router = useRouter();

  const handleCheckout = async () => {
    const stripe = await stripePromise;
    if (stripe) {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount }),
      });
      const { sessionId } = await response.json();

      const { error } = await stripe.redirectToCheckout({ sessionId });
      if (error) {
        console.error("Error:", error);
      }
    } else {
      console.error("Error: stripe null");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAmount = parseFloat(e.target.value) * 100;
    setAmount(newAmount);
  };

  return (
    <div>
      <h1>Donate</h1>
      <input type="number" value={amount / 100} onChange={handleChange} />
      <button onClick={handleCheckout}>Donate</button>
    </div>
  );
}
