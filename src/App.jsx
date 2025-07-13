import React, { useState } from 'react';
import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import Cart from './Pages/Cart';
import Payment from './Pages/Payment';
import Confirmation from './Pages/Confirmation';

function ProgressBar() {
  const location = useLocation();

  const steps = [
    { name: 'Cart', path: '/' },
    { name: 'Payment', path: '/payment' },
    { name: 'Confirmation', path: '/confirmation' },
  ];

  const currentStepIndex = steps.findIndex(step => location.pathname === step.path);

  return (
    <div className="w-full py-8 bg-gradient-to-r from-white via-slate-50 to-gray-100 shadow-sm border-b border-gray-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between relative">
          {steps.map((step, idx) => {
            const isActive = idx === currentStepIndex;
            const isCompleted = idx < currentStepIndex;

            return (
              <div key={step.name} className="flex-1 flex flex-col items-center relative z-10">
                {/* Step Circle */}
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white
                  ${isCompleted ? 'bg-green-600' : isActive ? 'bg-green-500' : 'bg-gray-300'}
                  transition-all duration-300`}
                >
                  {idx + 1}
                </div>

                {/* Step Label */}
                <div className={`mt-2 text-sm font-medium tracking-wide 
                  ${isCompleted ? 'text-green-600' : isActive ? 'text-green-500' : 'text-gray-400'}`}>
                  {step.name}
                </div>

                {/* Connector Line (except last) */}
                {idx !== steps.length - 1 && (
                  <div className="absolute top-6 left-1/2 w-full h-1 z-[-1]">
                    <div
                      className={`h-1 w-full transition-all duration-300 
                        ${idx < currentStepIndex
                          ? 'bg-gradient-to-r from-green-500 to-green-600'
                          : 'bg-gray-300'}`}
                      style={{ marginLeft: '24px', marginRight: '-24px' }}
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

function App() {
  const [cart, setCart] = useState([
    {
      name: 'Wireless Headphones',
      price: 59.99,
      quantity: 1,
      image: 'https://via.placeholder.com/100x100?text=🎧',
    },
    {
      name: 'Gaming Mouse',
      price: 29.99,
      quantity: 1,
      image: 'https://via.placeholder.com/100x100?text=🖱️',
    },
    {
      name: 'Mechanical Keyboard',
      price: 89.99,
      quantity: 1,
      image: 'https://via.placeholder.com/100x100?text=⌨️',
    },
  ]);

  // Calculate total dynamically
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

  return (
    <>
      <ProgressBar />
      <div className="App">
        <Routes>
          <Route path="/" element={<Cart cart={cart} setCart={setCart} />} />
          <Route path="/payment" element={<Payment total={total} itemsCount={cart.length} />} />
          <Route path="/confirmation" element={<Confirmation />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
