
import { useRef, useState } from "react";
import {
  Link,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  ArrowLeft,
  ArrowRight,
  Smartphone,
  CreditCard,
  Wallet,
  ShieldCheck,
  CheckCircle2,
  Lock,
  CalendarDays,
  MapPin,
  CarFront,
  UserRound,
  BadgeCheck,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

const paymentOptions = [
  {
    value: "upi",
    title: "UPI",
    subtitle: "Google Pay, PhonePe, Paytm",
    icon: Smartphone,
    tag: "Popular",
  },
  {
    value: "card",
    title: "Credit / Debit Card",
    subtitle: "Visa, Mastercard, RuPay",
    icon: CreditCard,
    tag: "",
  },
  {
    value: "wallet",
    title: "Digital Wallet",
    subtitle: "Pay using your wallet",
    icon: Wallet,
    tag: "",
  },
];

const money = (amount) =>
  `₹${Number(amount || 0).toLocaleString("en-IN")}`;

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();

  const { user, addBooking } = useAuth();

  const booking = location.state?.booking;

  const [method, setMethod] = useState("upi");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Prevent multiple submissions before React re-renders.
  const paymentStarted = useRef(false);

  if (!booking) {
    return <Navigate to="/cars" replace />;
  }

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  const completePayment = async (event) => {
    event.preventDefault();

    if (paymentStarted.current || loading) return;

    paymentStarted.current = true;
    setLoading(true);
    setError("");

    try {
      // Demo payment delay. No actual payment is processed.
      await new Promise((resolve) => {
        window.setTimeout(resolve, 1000);
      });

      if (typeof addBooking !== "function") {
        throw new Error(
          "addBooking is missing from AuthContext. Check your AuthContext.jsx file."
        );
      }

      const reference = `DN${Date.now()
        .toString()
        .slice(-8)}`;

      const finalBooking = {
        ...booking,
        bookingReference: reference,
        paymentMethod: method,
        paymentStatus: "Paid",
        paymentDate: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      };

      // Wait for the booking to be saved.
      await Promise.resolve(addBooking(finalBooking));

      // Open confirmation only after saving succeeds.
      navigate("/booking-confirmation", {
        replace: true,
        state: {
          booking: finalBooking,
        },
      });
    } catch (paymentError) {
      console.error("Payment / booking save error:", paymentError);

      setError(
        paymentError?.message ||
          "Unable to complete payment. Please try again."
      );

      paymentStarted.current = false;
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50">

      {/* HEADER */}
      <section className="bg-slate-950 px-5 py-10">
        <div className="mx-auto max-w-full">

          <Link
            to={`/booking/${booking.carId}`}
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-400 transition hover:text-orange-400"
          >
            <ArrowLeft size={18} />
            Back to booking
          </Link>

          <div className="flex flex-col justify-between gap-7 md:flex-row md:items-end">

            <div>
              <span className="text-xs font-extrabold uppercase tracking-[3px] text-orange-400">
                DriveNow Checkout
              </span>

              <h1 className="mt-3 text-3xl font-black text-white sm:text-4xl">
                Secure Payment
              </h1>

              <p className="mt-3 max-w-lg text-sm leading-6 text-slate-400">
                You're one step away from your next journey.
                Review your booking and complete your payment.
              </p>
            </div>

            <div className="flex items-center gap-3">

              <div className="flex items-center gap-2">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-green-500 text-white">
                  <CheckCircle2 size={18} />
                </span>
                <span className="text-xs font-bold text-white">
                  Booking
                </span>
              </div>

              <div className="h-px w-8 bg-orange-500" />

              <div className="flex items-center gap-2">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-orange-500 text-white">
                  2
                </span>
                <span className="text-xs font-bold text-orange-400">
                  Payment
                </span>
              </div>

              <div className="h-px w-8 bg-slate-700" />

              <div className="flex items-center gap-2">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-slate-800 text-slate-400">
                  3
                </span>
                <span className="hidden text-xs font-bold text-slate-400 sm:block">
                  Success
                </span>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* PAYMENT CONTENT */}
      <section className="mx-auto max-w-full px-5 py-12">

        <div className="grid items-start gap-8 lg:grid-cols-[1fr_380px]">

          {/* PAYMENT FORM */}
          <div>

            <form onSubmit={completePayment}>

              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

                <div className="mb-8">
                  <div className="flex items-center gap-3">

                    <div className="grid h-12 w-12 place-items-center rounded-2xl bg-orange-50 text-orange-500">
                      <CreditCard size={25} />
                    </div>

                    <div>
                      <h2 className="text-xl font-black text-slate-900">
                        Choose Payment Method
                      </h2>

                      <p className="mt-1 text-sm text-slate-500">
                        Select your preferred payment option.
                      </p>
                    </div>

                  </div>
                </div>

                {/* PAYMENT OPTIONS */}
                <div className="space-y-4">

                  {paymentOptions.map((option) => {
                    const Icon = option.icon;
                    const selected = method === option.value;

                    return (
                      <label
                        key={option.value}
                        className={`relative flex cursor-pointer items-center gap-4 rounded-2xl border-2 p-5 transition-all ${
                          selected
                            ? "border-orange-500 bg-orange-50/70"
                            : "border-slate-100 bg-white hover:border-orange-200"
                        }`}
                      >

                        <input
                          type="radio"
                          name="payment"
                          value={option.value}
                          checked={selected}
                          onChange={() => setMethod(option.value)}
                          disabled={loading}
                          className="sr-only"
                        />

                        <div
                          className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl ${
                            selected
                              ? "bg-orange-500 text-white"
                              : "bg-slate-100 text-slate-500"
                          }`}
                        >
                          <Icon size={23} />
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">

                            <h3 className="font-extrabold text-slate-900">
                              {option.title}
                            </h3>

                            {option.tag && (
                              <span className="rounded-full bg-green-100 px-2 py-1 text-[10px] font-extrabold uppercase text-green-700">
                                {option.tag}
                              </span>
                            )}

                          </div>

                          <p className="mt-1 text-xs text-slate-500">
                            {option.subtitle}
                          </p>
                        </div>

                        <div
                          className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border-2 ${
                            selected
                              ? "border-orange-500 bg-orange-500 text-white"
                              : "border-slate-300"
                          }`}
                        >
                          {selected && <CheckCircle2 size={16} />}
                        </div>

                      </label>
                    );
                  })}

                </div>

                {/* DEMO NOTICE */}
                <div className="mt-7 rounded-2xl border border-blue-100 bg-blue-50 p-5">

                  <div className="flex items-center gap-3">
                    <ShieldCheck
                      size={22}
                      className="text-blue-600"
                    />

                    <h3 className="font-extrabold text-blue-900">
                      Secure Demo Checkout
                    </h3>
                  </div>

                  <p className="mt-2 text-sm leading-6 text-blue-800">
                    This is a demonstration payment process.
                    No actual money will be deducted from your
                    account.
                  </p>

                </div>

                {/* ERROR */}
                {error && (
                  <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-600">
                    {error}
                  </div>
                )}

                {/* PAY BUTTON */}
                <button
                  type="submit"
                  disabled={loading}
                  className="mt-8 flex w-full items-center justify-center gap-3 rounded-xl bg-orange-500 px-6 py-4 text-sm font-extrabold text-white shadow-lg shadow-orange-500/20 transition hover:-translate-y-1 hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                      Processing Payment...
                    </>
                  ) : (
                    <>
                      <Lock size={18} />
                      Pay {money(booking.total)}
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>

                <p className="mt-4 text-center text-xs text-slate-400">
                  By continuing, you agree to the DriveNow booking terms.
                </p>

              </div>
            </form>

            {/* SECURITY FEATURES */}
            <div className="mt-6 grid gap-4 sm:grid-cols-3">

              {[
                {
                  icon: ShieldCheck,
                  title: "Secure Checkout",
                  detail: "Protected demo flow",
                },
                {
                  icon: Lock,
                  title: "Private Details",
                  detail: "Booking information",
                },
                {
                  icon: BadgeCheck,
                  title: "Easy Booking",
                  detail: "Quick confirmation",
                },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4"
                  >
                    <Icon
                      size={22}
                      className="shrink-0 text-green-600"
                    />

                    <div>
                      <p className="text-xs font-extrabold text-slate-800">
                        {item.title}
                      </p>

                      <p className="mt-1 text-[11px] text-slate-400">
                        {item.detail}
                      </p>
                    </div>
                  </div>
                );
              })}

            </div>

          </div>

          {/* BOOKING SUMMARY */}
          <aside className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm lg:sticky lg:top-24">

            <div className="bg-slate-950 px-6 py-6">

              <p className="text-xs font-bold uppercase tracking-[2px] text-orange-400">
                Your Reservation
              </p>

              <h2 className="mt-2 text-xl font-black text-white">
                Order Summary
              </h2>

            </div>

            <div className="p-6">

              {booking.carImage ? (
                <img
                  src={booking.carImage}
                  alt={booking.carName || "Rental car"}
                  className="h-48 w-full rounded-2xl object-cover"
                />
              ) : (
                <div className="flex h-48 items-center justify-center rounded-2xl bg-slate-100">
                  <CarFront size={50} className="text-slate-400" />
                </div>
              )}

              <h3 className="mt-5 text-xl font-black text-slate-900">
                {booking.carName}
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                DriveNow Rental Vehicle
              </p>

              <div className="my-6 space-y-5 border-y border-slate-100 py-6">

                <div className="flex gap-3">
                  <UserRound
                    size={19}
                    className="shrink-0 text-orange-500"
                  />

                  <div className="min-w-0">
                    <p className="text-xs text-slate-400">
                      Customer
                    </p>

                    <p className="mt-1 break-words text-sm font-bold text-slate-800">
                      {booking.name}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <CalendarDays
                    size={19}
                    className="shrink-0 text-orange-500"
                  />

                  <div>
                    <p className="text-xs text-slate-400">
                      Rental Period
                    </p>

                    <p className="mt-1 text-sm font-bold text-slate-800">
                      {booking.pickupDate} to {booking.returnDate}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {booking.days} day(s)
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <MapPin
                    size={19}
                    className="shrink-0 text-orange-500"
                  />

                  <div className="min-w-0">
                    <p className="text-xs text-slate-400">
                      Pickup Location
                    </p>

                    <p className="mt-1 break-words text-sm font-bold text-slate-800">
                      {booking.pickup || "Not provided"}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <MapPin
                    size={19}
                    className="shrink-0 text-orange-500"
                  />

                  <div className="min-w-0">
                    <p className="text-xs text-slate-400">
                      Return Location
                    </p>

                    <p className="mt-1 break-words text-sm font-bold text-slate-800">
                      {booking.dropoff || "Not provided"}
                    </p>
                  </div>
                </div>

              </div>

              {/* PRICE */}
              <div className="space-y-3">

                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">
                    Rental Duration
                  </span>

                  <span className="font-bold text-slate-800">
                    {booking.days} days
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">
                    Payment Method
                  </span>

                  <span className="font-bold capitalize text-slate-800">
                    {method}
                  </span>
                </div>

              </div>

              <div className="my-5 border-t border-dashed border-slate-200" />

              <div className="flex items-center justify-between gap-3">

                <span className="font-extrabold text-slate-800">
                  Total Amount
                </span>

                <span className="text-2xl font-black text-orange-500">
                  {money(booking.total)}
                </span>

              </div>

              <div className="mt-5 flex items-center gap-2 rounded-xl bg-green-50 p-3 text-xs font-semibold text-green-700">
                <ShieldCheck size={17} />
                Your booking details are ready.
              </div>

            </div>
          </aside>

        </div>
      </section>

    </main>
  );
}
