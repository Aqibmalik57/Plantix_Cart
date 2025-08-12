import React from "react";
import {
  FaTrash,
  FaCreditCard,
  FaShoppingCart,
  FaPlus,
  FaMinus,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import {
  useIncrementCartItemMutation,
  useDecrementCartItemMutation,
  useRemoveItemMutation,
  useClearCartMutation,
} from "../Service/api";

export default function Cart({ cart, userId }) {
  const navigate = useNavigate();

  // RTK Query mutations
  const [incrementCartItem] = useIncrementCartItemMutation();
  const [decrementCartItem] = useDecrementCartItemMutation();
  const [removeItem] = useRemoveItemMutation();
  const [clearCartApi] = useClearCartMutation();

  // Increment
  const increment = async (productId) => {
    await incrementCartItem({ userId, productId });
  };

  // Decrement
  const decrement = async (productId) => {
    await decrementCartItem({ userId, productId });
  };

  // Remove
  const removeFromCart = async (productId) => {
    await removeItem({ userId, productId });
  };

  // Clear all
  const clearCart = async () => {
    await clearCartApi(userId);
  };

  // Calculate total
  const total = cart
    .reduce(
      (sum, item) =>
        sum + (Number(item?.productId?.price) || 0) * (item?.quantity || 0),
      0
    )
    .toFixed(2);

  const proceedToPayment = () => {
    if (cart.length > 0) {
      navigate("/payment");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-gray-200 py-10 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Cart Section */}
        <div className="lg:col-span-2 bg-white rounded-3xl shadow-lg p-8 border border-gray-200">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-3">
              <FaShoppingCart className="text-green-600 text-3xl" />
              <h2 className="text-3xl font-bold text-gray-800">
                Shopping Cart
              </h2>
            </div>
            <button
              onClick={clearCart}
              disabled={cart.length === 0}
              className={`px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all
                ${
                  cart.length === 0
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-red-500 hover:bg-red-600"
                }`}
            >
              Clear All
            </button>
          </div>

          {/* Cart Items */}
          <div className="space-y-5">
            {cart.length > 0 ? (
              cart.map((item, index) => (
                <div
                  key={item._id || index}
                  className="flex flex-col sm:flex-row items-center justify-between bg-gray-50 p-4 rounded-2xl border border-gray-200 shadow transition-all duration-200 hover:shadow-xl hover:scale-[1.01]"
                >
                  {/* Product Info */}
                  <div className="flex items-center gap-5 w-full sm:w-[50%]">
                    <img
                      src={item.productId?.images?.[0]}
                      alt={item.productId?.title || "Product"}
                      className="w-20 h-20 rounded-xl object-cover border"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {item.productId?.title || "Unnamed Product"}
                      </h3>
                      <p className="text-green-600 font-bold text-sm">
                        ${Number(item.productId?.price || 0).toFixed(2)}
                      </p>
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-3 bg-white px-3 py-1 rounded-full mt-4 sm:mt-0">
                    <button
                      onClick={() => decrement(item.productId?._id)}
                      className="text-gray-700 hover:text-red-600 transition"
                    >
                      <FaMinus />
                    </button>
                    <span className="text-lg font-medium">{item.quantity}</span>
                    <button
                      onClick={() => increment(item.productId?._id)}
                      className="text-gray-700 hover:text-green-600 transition"
                    >
                      <FaPlus />
                    </button>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.productId?._id)}
                    className="text-red-500 hover:text-red-700 mt-4 sm:mt-0 transition"
                    title={`Remove ${item.productId?.title}`}
                  >
                    <FaTrash size={18} />
                  </button>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 text-lg mt-10">
                🛒 Your cart is empty.
              </p>
            )}
          </div>
        </div>

        {/* Summary Section */}
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-200 h-fit">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">
            Order Summary
          </h3>

          <div className="space-y-4 text-gray-700 font-medium text-sm">
            <div className="flex justify-between border-b pb-2">
              <span>Items</span>
              <span>
                {cart.reduce((acc, item) => acc + (item.quantity || 0), 0)}
              </span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span>Subtotal</span>
              <span>${total}</span>
            </div>
            <div className="flex justify-between text-green-600 font-bold text-lg pt-3 border-t">
              <span>Total</span>
              <span>${total}</span>
            </div>
          </div>

          {cart.length > 0 ? (
            <Link
              to="/payment"
              onClick={proceedToPayment}
              className="mt-6 block w-full text-center px-6 py-3 rounded-full font-bold text-white text-sm bg-green-600 hover:bg-green-700 hover:scale-105 shadow-md transition transform"
            >
              <FaCreditCard className="inline mr-2" />
              Proceed to Payment
            </Link>
          ) : (
            <button
              disabled
              className="mt-6 block w-full text-center px-6 py-3 rounded-full font-bold text-white text-sm bg-gray-400 cursor-not-allowed"
            >
              <FaCreditCard className="inline mr-2" />
              Proceed to Payment
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
