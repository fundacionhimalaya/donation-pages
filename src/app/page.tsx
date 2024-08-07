"use client";
//
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string
);

export default function Checkout() {
  const [amount, setAmount] = useState(1000);
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async () => {
    setIsLoading(true);
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
    setIsLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAmount = parseFloat(e.target.value) * 100;
    setAmount(newAmount);
  };

  return (
    <>
      {isLoading ? (
        <div className="w-full h-screen flex items-center justify-center">
          <div className="lds-facebook">
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      ) : (
        <div>
          <form className="px-40 pt-20">
            <div className="space-y-12">
              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                  Himalaya US Foundation Donations
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Enter the amount you wish to donate to generate your payment
                  link
                </p>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-4">
                    <label
                      htmlFor="amount"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Amount (USD)
                    </label>
                    <div className="mt-2 w-48">
                      <input
                        id="amount"
                        name="amount"
                        type="number"
                        value={amount / 100}
                        onChange={handleChange}
                        className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button
                type="button"
                onClick={handleCheckout}
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Generate Link
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
