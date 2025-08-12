// App.jsx
import "./App.css";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import Cart from "./Pages/Cart";
import Payment from "./Pages/Payment";
import Confirmation from "./Pages/Confirmation";
import {
  useGetCartTotalQuery,
  useGetUserCartQuery,
  useGetUserProfileQuery,
} from "./Service/api";
import ProtectedRoute from "./Pages/ProtectedRoute";

function ProgressBar() {
  const location = useLocation();

  const steps = [
    { name: "Cart", path: "/" },
    { name: "Payment", path: "/payment" },
    { name: "Confirmation", path: "/confirmation" },
  ];

  const currentStepIndex = steps.findIndex(
    (step) => location.pathname === step.path
  );

  return (
    <div className="w-full py-8 bg-gradient-to-r from-white via-slate-50 to-gray-100 shadow-sm border-b border-gray-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between relative">
          {steps.map((step, idx) => {
            const isActive = idx === currentStepIndex;
            const isCompleted = idx < currentStepIndex;

            const StepCircle = (
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white
                ${
                  isCompleted
                    ? "bg-green-600"
                    : isActive
                    ? "bg-green-500"
                    : "bg-gray-300"
                }
                transition-all duration-300`}
              >
                {idx + 1}
              </div>
            );

            const StepLabel = (
              <div
                className={`mt-2 text-sm font-medium tracking-wide 
                ${
                  isCompleted
                    ? "text-green-600"
                    : isActive
                    ? "text-green-500"
                    : "text-gray-400"
                }`}
              >
                {step.name}
              </div>
            );

            return (
              <div
                key={step.name}
                className="flex-1 flex flex-col items-center relative z-10"
              >
                {/* ✅ Step 1 clickable ONLY when on Step 2 */}
                {idx === 0 && currentStepIndex === 1 ? (
                  <Link
                    to={step.path}
                    className="flex flex-col items-center cursor-pointer"
                  >
                    {StepCircle}
                    {StepLabel}
                  </Link>
                ) : (
                  <div className="flex flex-col items-center cursor-default">
                    {StepCircle}
                    {StepLabel}
                  </div>
                )}

                {/* Connector Line */}
                {idx !== steps.length - 1 && (
                  <div className="absolute top-6 left-1/2 w-full h-1 z-[-1]">
                    <div
                      className={`h-1 w-full transition-all duration-300 
                        ${
                          idx < currentStepIndex
                            ? "bg-gradient-to-r from-green-500 to-green-600"
                            : "bg-gray-300"
                        }`}
                      style={{ marginLeft: "24px", marginRight: "-24px" }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const { data: userData, isLoading: userLoading } = useGetUserProfileQuery();
  const userId = userData?.user?._id;

  const { data: cartData, isLoading: cartLoading } = useGetUserCartQuery(
    userId,
    { skip: !userId, pollingInterval: 500 }
  );

  console.log(cartData);
  const { data: cartTotalData } = useGetCartTotalQuery(userId, {
    skip: !userId,
    pollingInterval: 500,
  });

  // 3️⃣ Loading state
  if (userLoading || cartLoading) {
    return <div className="p-6 text-gray-500">Loading...</div>;
  }

  // 4️⃣ Safety fallbacks
  const items = cartData?.cart?.items || [];
  const total = cartTotalData?.total || 0;

  // 5️⃣ For payment page
  const itemName = items.map((item) => item.name).join(", ");
  const totalItemsCount = items.reduce(
    (sum, item) => sum + (item.quantity || 0),
    0
  );

  return (
    <>
      <ProgressBar />
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <Cart
                cart={items}
                userId={userId}
                user={userData?.user}
                total={total}
              />
            }
          />

          <Route
            path="/payment"
            element={
              <ProtectedRoute
                isAllowed={!!userId && totalItemsCount > 0} // must be logged in & have items
                redirectTo="/"
              >
                <Payment
                  total={total}
                  itemsCount={totalItemsCount}
                  itemName={itemName}
                  userId={userId}
                />
              </ProtectedRoute>
            }
          />

          <Route
            path="/confirmation"
            element={
              <ProtectedRoute
                isAllowed={!!userId && totalItemsCount >= 0}
                redirectTo="/"
              >
                <Confirmation />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </>
  );
}
