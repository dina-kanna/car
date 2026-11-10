
import { useState, useEffect, useCallback } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoadingScreen from "./components/LoadingScreen";

import Home from "./pages/Home";
import Cars from "./pages/Cars";
import CarDetails from "./pages/CarDetails";
import Booking from "./pages/Booking";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Payment from "./pages/Payment.jsx";
import BookingConfirmation from "./pages/BookingConfirmation.jsx";

function App() {
  const [loading, setLoading] = useState(true);

  const handleLoadingComplete = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">

      {loading && (
        <LoadingScreen onComplete={handleLoadingComplete} />
      )}

      <Navbar />

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cars" element={<Cars />} />
          <Route path="/cars/:id" element={<CarDetails />} />
          <Route path="/booking/:id" element={<Booking />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/payment" element={<Payment />} />
          <Route
            path="/booking-confirmation"
            element={<BookingConfirmation />}
          />

          <Route
            path="*"
            element={
              <div className="container-custom py-20 text-center">
                <h1 className="text-4xl font-bold">404</h1>
                <p className="mt-3">Page not found.</p>
              </div>
            }
          />
        </Routes>
      </main>

      <Footer />

    </div>
  );
}

export default App;
