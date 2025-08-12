import React from "react";
import { useNavigate } from "react-router-dom";

export default function Payment({ total = "0.00", itemsCount = 0, userId }) {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/confirmation", {
      state: {
        total,
        itemsCount,
        userId,
      },
    });
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 flex items-center justify-center py-20 px-6">
      <div className="max-w-6xl w-full grid lg:grid-cols-3 gap-16">
        {/* Left: Payment Form */}
        <div className="bg-white rounded-3xl shadow-2xl p-12 border border-gray-300 col-span-2">
          <h2 className="text-4xl font-extrabold text-green-800 mb-12 tracking-wide text-center lg:text-left">
            💳 Secure Payment
          </h2>

          <form onSubmit={handleSubmit} className="space-y-14">
            {/* Cardholder & Email Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="flex flex-col relative">
                <label className="mb-2 text-xs uppercase font-semibold tracking-wide text-gray-700">
                  Cardholder Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={"jb"}
                  required
                  className="rounded-3xl px-6 py-5 border border-gray-300 shadow-md placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-green-400 focus:shadow-lg transition duration-300"
                />
              </div>
              <div className="flex flex-col relative">
                <label className="mb-2 text-xs uppercase font-semibold tracking-wide text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="john.doe@example.com"
                  value={"jb@doe.com"}
                  required
                  className="rounded-3xl px-6 py-5 border border-gray-300 shadow-md placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-green-400 focus:shadow-lg transition duration-300"
                />
              </div>
            </div>

            {/* Card Number */}
            <div className="flex flex-col relative">
              <label className="mb-2 text-xs uppercase font-semibold tracking-wide text-gray-700">
                Card Number
              </label>
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                value={"1234 5678 9012 3456"}
                maxLength={19}
                required
                className="w-full rounded-3xl px-6 py-5 border border-gray-300 shadow-md placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-green-400 focus:shadow-lg transition duration-300"
              />
            </div>

            {/* Expiry & CVV */}
            <div className="grid grid-cols-2 gap-10">
              <div className="flex flex-col relative">
                <label className="mb-2 text-xs uppercase font-semibold tracking-wide text-gray-700">
                  Expiry Date
                </label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  maxLength={5}
                  value={"12/25"}
                  required
                  className="rounded-3xl px-6 py-5 border border-gray-300 shadow-md placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-green-400 focus:shadow-lg transition duration-300"
                />
              </div>
              <div className="flex flex-col relative">
                <label className="mb-2 text-xs uppercase font-semibold tracking-wide text-gray-700">
                  CVV
                </label>
                <input
                  type="password"
                  placeholder="•••"
                  value={"123"}
                  maxLength={4}
                  required
                  className="rounded-3xl px-6 py-5 border border-gray-300 shadow-md placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-green-400 focus:shadow-lg transition duration-300"
                />
              </div>
            </div>

            {/* Billing Address */}
            <div className="flex flex-col relative">
              <label className="mb-2 text-xs uppercase font-semibold tracking-wide text-gray-700">
                Billing Address
              </label>
              <input
                type="text"
                placeholder="123 Main St, Apt 4B"
                value={"123 Main St, Apt 4B"}
                required
                className="w-full rounded-3xl px-6 py-5 border border-gray-300 shadow-md placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-green-400 focus:shadow-lg transition duration-300"
              />
            </div>

            {/* City, State, ZIP */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
              <input
                type="text"
                placeholder="City"
                required
                value={"New York"}
                className="rounded-3xl px-6 py-5 border border-gray-300 shadow-md placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-green-400 focus:shadow-lg transition duration-300"
              />
              <input
                type="text"
                placeholder="State"
                value={"NY"}
                required
                className="rounded-3xl px-6 py-5 border border-gray-300 shadow-md placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-green-400 focus:shadow-lg transition duration-300"
              />
              <input
                type="text"
                placeholder="ZIP Code"
                maxLength={10}
                value={"10001"}
                required
                className="rounded-3xl px-6 py-5 border border-gray-300 shadow-md placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-green-400 focus:shadow-lg transition duration-300"
              />
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full py-5 rounded-3xl bg-gradient-to-r from-green-600 to-green-800 text-white text-xl font-extrabold shadow-xl hover:scale-105 active:scale-95 transition-transform duration-300"
              >
                Pay ${total}
              </button>
            </div>
          </form>
        </div>

        {/* Right: Summary Sidebar */}
        <aside className="bg-white rounded-3xl shadow-xl p-10 border border-gray-300 sticky top-20 h-fit">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 tracking-wide">
            Order Summary
          </h3>

          <div className="space-y-5 text-gray-700 text-lg font-semibold">
            <div className="flex justify-between border-b pb-3 border-gray-300">
              <span>Items</span>
              <span>{itemsCount}</span>
            </div>
            <div className="flex justify-between border-b pb-3 border-gray-300">
              <span>Subtotal</span>
              <span>${total}</span>
            </div>
            <div className="flex justify-between pt-5 text-green-700 text-2xl font-extrabold border-t border-gray-300">
              <span>Total</span>
              <span>${total}</span>
            </div>
          </div>

          <p className="mt-12 text-sm text-gray-500">
            🔒 Payments are secured and encrypted. Your card details are never
            stored on our servers.
          </p>
        </aside>
      </div>
    </div>
  );
}
