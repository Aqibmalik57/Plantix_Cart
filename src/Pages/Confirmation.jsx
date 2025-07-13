import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaCheckCircle, FaFileInvoiceDollar, FaShieldAlt } from "react-icons/fa";

export default function Confirmation() {
  const location = useLocation();
  const navigate = useNavigate();

  const { total = "0.00", itemsCount = 0 } = location.state || {};

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-green-100 to-green-200 flex flex-col items-center justify-center py-20 px-6">
      <div className="bg-white rounded-3xl shadow-lg max-w-4xl w-full p-14 border border-green-200">
        {/* Animated Success Icon */}
        <div className="flex justify-center mb-10">
          <FaCheckCircle
            className="text-green-600"
            style={{
              fontSize: "9rem",
              filter: "drop-shadow(0 0 10px rgba(34,197,94,0.7))",
              animation: "bounceGlow 3s ease-in-out infinite",
              transformOrigin: "center",
            }}
          />
        </div>

        {/* Animation Keyframes */}
        <style>
          {`
            @keyframes bounceGlow {
              0%, 100% {
                transform: translateY(0) rotate(0deg);
                filter: drop-shadow(0 0 10px rgba(34,197,94,0.7));
                opacity: 1;
              }
              25% {
                transform: translateY(-20px) rotate(7deg);
                filter: drop-shadow(0 0 20px rgba(34,197,94,0.9));
                opacity: 0.9;
              }
              50% {
                transform: translateY(-35px) rotate(-7deg);
                filter: drop-shadow(0 0 25px rgba(34,197,94,1));
                opacity: 1;
              }
              75% {
                transform: translateY(-20px) rotate(7deg);
                filter: drop-shadow(0 0 20px rgba(34,197,94,0.9));
                opacity: 0.9;
              }
            }
          `}
        </style>

        {/* Heading */}
        <h1 className="text-center text-5xl font-extrabold text-green-700 mb-8 tracking-wide drop-shadow-sm">
          Thank You for Your Purchase!
        </h1>

        {/* Message */}
        <p className="text-center text-lg text-green-900 max-w-3xl mx-auto mb-16 leading-relaxed tracking-wide">
          Your payment was successful. We appreciate your business. Below is a summary of your order.
        </p>

        {/* Summary Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          {/* Order Summary */}
          <section className="p-8 bg-green-50 rounded-2xl shadow-inner border border-green-200 hover:shadow-lg transition-shadow duration-500">
            <h2 className="text-3xl font-semibold mb-6 text-green-800 border-b border-green-300 pb-3 tracking-wide">
              Order Summary
            </h2>
            <div className="space-y-6 text-green-900 font-semibold text-lg">
              <div className="flex justify-between">
                <span>Total Items:</span>
                <span>{itemsCount}</span>
              </div>
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>${total}</span>
              </div>
              <div className="flex justify-between border-t border-green-300 pt-5 text-2xl font-extrabold">
                <span>Total Paid:</span>
                <span>${total}</span>
              </div>
            </div>
          </section>

          {/* Payment Info */}
          <section className="p-8 bg-green-50 rounded-2xl shadow-inner border border-green-200 hover:shadow-lg transition-shadow duration-500">
            <h2 className="text-3xl font-semibold mb-6 text-green-800 border-b border-green-300 pb-3 flex items-center gap-3 tracking-wide">
              <FaFileInvoiceDollar className="text-green-600 text-2xl" />
              Payment Info
            </h2>
            <p className="text-green-900 text-base font-medium leading-relaxed tracking-wide">
              Payment was processed securely through our gateway. Your card statement will show a charge from <strong>PlantixAG</strong>. Thank you for your trust.
            </p>
          </section>
        </div>

        {/* Security Section */}
        <div className="flex items-center justify-center gap-6 mb-12 px-4 md:px-0">
          <FaShieldAlt className="text-green-700 text-4xl drop-shadow-md" />
          <p className="text-green-900 font-medium text-center max-w-3xl tracking-wide leading-relaxed">
            All transactions are secured and encrypted. We value your privacy and protect your data with industry-standard security measures.
          </p>
        </div>

        {/* Back to Home Button */}
        <div className="flex justify-center">
          <button
            onClick={() => navigate("/")}
            className="px-14 py-4 bg-gradient-to-r from-green-600 to-green-800 text-white font-extrabold rounded-full shadow-lg hover:from-green-700 hover:to-green-900 active:scale-95 transition-transform duration-300 tracking-wide text-lg"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
