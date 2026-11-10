
import { useMemo, useState } from "react";

import {
  useNavigate,
  useParams,
  Link,
} from "react-router-dom";

import {
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  CalendarDays,
  MapPin,
  UserRound,
  Mail,
  Phone,
  CarFront,
  Clock,
  LockKeyhole,
  CreditCard,
  Sparkles,
} from "lucide-react";

import { cars } from "../data/cars";
import { useAuth } from "../context/AuthContext";

function getLocalDate() {
  const date = new Date();

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export default function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { user } = useAuth();

  const car = cars.find(
    (item) => item.id === Number(id)
  );

  const today = getLocalDate();

  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    pickup: "",
    dropoff: "",
    pickupDate: today,
    returnDate: today,
  });

  const [error, setError] = useState("");

  // Calculate rental duration
  const days = useMemo(() => {
    const start = new Date(`${form.pickupDate}T00:00:00`);
    const end = new Date(`${form.returnDate}T00:00:00`);

    const difference = Math.ceil(
      (end - start) / 86400000
    );

    return Math.max(1, difference + 1);
  }, [form.pickupDate, form.returnDate]);

  // Calculate total price
  const total = car ? days * car.price : 0;

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  };

  // Confirm booking and continue to payment
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!user) {
      setError("Please log in before continuing to payment.");
      return;
    }

    if (!car?.available) {
      setError("This vehicle is currently unavailable.");
      return;
    }

    if (!form.name.trim()) {
      setError("Please enter your full name.");
      return;
    }

    const pickupDate = new Date(
      `${form.pickupDate}T00:00:00`
    );

    const returnDate = new Date(
      `${form.returnDate}T00:00:00`
    );

    const currentDate = new Date(
      `${today}T00:00:00`
    );

    if (pickupDate < currentDate) {
      setError("Pickup date cannot be in the past.");
      return;
    }

    if (returnDate < pickupDate) {
      setError("Return date cannot be before pickup date.");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!/^[0-9+\-\s()]{7,20}$/.test(form.phone)) {
      setError("Please enter a valid phone number.");
      return;
    }

    if (!form.pickup.trim() || !form.dropoff.trim()) {
      setError("Please enter pickup and drop-off locations.");
      return;
    }

    // Prepare booking information for payment page
    const bookingDetails = {
      carName: car.name,
      carImage: car.image,
      carId: car.id,

      name: form.name,
      email: form.email,
      phone: form.phone,

      pickup: form.pickup,
      dropoff: form.dropoff,

      pickupDate: form.pickupDate,
      returnDate: form.returnDate,

      days,
      total,

      createdAt: new Date().toISOString(),
    };

    // Go to payment page
    navigate("/payment", {
      state: {
        booking: bookingDetails,
      },
    });
  };

  // Car not found
  if (!car) {
    return (
      <main className="flex min-h-[65vh] items-center justify-center bg-slate-50 px-5">
        <div className="max-w-md rounded-3xl bg-white p-10 text-center shadow-lg">

          <div className="mx-auto grid h-20 w-20 place-items-center rounded-3xl bg-orange-50 text-orange-500">
            <CarFront size={38} />
          </div>

          <h1 className="mt-6 text-2xl font-black text-slate-900">
            Vehicle Not Found
          </h1>

          <p className="mt-3 text-sm leading-7 text-slate-500">
            Sorry, this vehicle is not available in our collection.
            Please explore our other cars.
          </p>

          <Link
            to="/cars"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3 text-sm font-bold text-white transition hover:bg-orange-600"
          >
            Browse Cars
            <ArrowRight size={17} />
          </Link>

        </div>
      </main>
    );
  }

  const inputClass =
    "mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm font-medium text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-100";

  const labelClass =
    "block text-xs font-extrabold uppercase tracking-wider text-slate-500";

  return (
    <main className="min-h-screen bg-slate-50">

      {/* PAGE HEADER */}
      <section className="bg-slate-950 py-12">

        <div className="mx-auto max-w-full px-5 lg:px-8">

          <Link
            to={`/cars/${car.id}`}
            className="mb-7 inline-flex items-center gap-2 text-sm font-semibold text-slate-400 transition hover:text-orange-400"
          >
            <ArrowLeft size={17} />
            Back to vehicle details
          </Link>

          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">

            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[3px] text-orange-400">
                <Sparkles size={15} />
                Secure Reservation
              </div>

              <h1 className="mt-3 text-3xl font-black text-white sm:text-4xl">
                Complete Your Booking
              </h1>

              <p className="mt-3 text-sm text-slate-400">
                Just a few more details before your journey begins.
              </p>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-5 py-4">
              <ShieldCheck className="text-green-400" size={25} />

              <div>
                <p className="text-sm font-bold text-white">
                  Safe & Secure
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Protected demo checkout
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CHECKOUT CONTENT */}
      <section className="mx-auto max-w-full px-5 py-12 lg:px-8">

        <div className="grid items-start gap-8 lg:grid-cols-[1fr_390px]">

          {/* LEFT FORM */}
          <form onSubmit={handleSubmit}>

            {/* Booking Steps */}
            <div className="mb-7 flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-5">

              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-orange-500 text-sm font-black text-white">
                1
              </div>

              <div>
                <p className="text-sm font-extrabold text-slate-900">
                  Booking Information
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Customer and rental details
                </p>
              </div>

              <div className="ml-auto hidden h-px flex-1 bg-slate-200 sm:block" />

              <div className="hidden items-center gap-2 sm:flex">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-slate-100 text-sm font-black text-slate-500">
                  2
                </div>

                <span className="text-xs font-bold text-slate-400">
                  Payment
                </span>
              </div>

            </div>

            {/* CUSTOMER INFORMATION */}
            <div className="mb-7 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

              <div className="mb-7 flex items-center gap-4">

                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-orange-50 text-orange-500">
                  <UserRound size={24} />
                </div>

                <div>
                  <h2 className="text-xl font-black text-slate-900">
                    Personal Information
                  </h2>

                  <p className="mt-1 text-xs text-slate-400">
                    Tell us how we can contact you.
                  </p>
                </div>

              </div>

              <div className="grid gap-5 sm:grid-cols-2">

                <label className={labelClass}>
                  Full Name

                  <div className="relative">
                    <UserRound
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      required
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className={`${inputClass} pl-11`}
                    />
                  </div>
                </label>

                <label className={labelClass}>
                  Email Address

                  <div className="relative">
                    <Mail
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      required
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className={`${inputClass} pl-11`}
                    />
                  </div>
                </label>

                <label className={`${labelClass} sm:col-span-2`}>
                  Phone Number

                  <div className="relative">
                    <Phone
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      required
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className={`${inputClass} pl-11`}
                    />
                  </div>
                </label>

              </div>
            </div>

            {/* RENTAL DETAILS */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

              <div className="mb-7 flex items-center gap-4">

                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-orange-50 text-orange-500">
                  <CalendarDays size={24} />
                </div>

                <div>
                  <h2 className="text-xl font-black text-slate-900">
                    Rental Details
                  </h2>

                  <p className="mt-1 text-xs text-slate-400">
                    Select your pickup and return information.
                  </p>
                </div>

              </div>

              <div className="grid gap-5 sm:grid-cols-2">

                <label className={labelClass}>
                  Pickup Location

                  <div className="relative">
                    <MapPin
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-500"
                    />

                    <input
                      required
                      name="pickup"
                      value={form.pickup}
                      onChange={handleChange}
                      placeholder="Enter pickup location"
                      className={`${inputClass} pl-11`}
                    />
                  </div>
                </label>

                <label className={labelClass}>
                  Return Location

                  <div className="relative">
                    <MapPin
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-500"
                    />

                    <input
                      required
                      name="dropoff"
                      value={form.dropoff}
                      onChange={handleChange}
                      placeholder="Enter return location"
                      className={`${inputClass} pl-11`}
                    />
                  </div>
                </label>

                <label className={labelClass}>
                  Pickup Date

                  <div className="relative">
                    <CalendarDays
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-500"
                    />

                    <input
                      required
                      type="date"
                      min={today}
                      name="pickupDate"
                      value={form.pickupDate}
                      onChange={handleChange}
                      className={`${inputClass} pl-11`}
                    />
                  </div>
                </label>

                <label className={labelClass}>
                  Return Date

                  <div className="relative">
                    <Clock
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-500"
                    />

                    <input
                      required
                      type="date"
                      min={form.pickupDate}
                      name="returnDate"
                      value={form.returnDate}
                      onChange={handleChange}
                      className={`${inputClass} pl-11`}
                    />
                  </div>
                </label>

              </div>

              {/* LOGIN REMINDER */}
              {!user && (
                <div className="mt-6 rounded-xl border border-orange-200 bg-orange-50 p-4 text-sm text-orange-800">
                  Please{" "}
                  <Link
                    to="/login"
                    className="font-extrabold underline"
                  >
                    log in
                  </Link>{" "}
                  before continuing to payment.
                </div>
              )}

              {/* ERROR MESSAGE */}
              {error && (
                <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-600">
                  {error}
                </div>
              )}

              {/* CONTINUE TO PAYMENT */}
              <button
                type="submit"
                disabled={!car.available}
                className="mt-8 flex w-full items-center justify-center gap-3 rounded-xl bg-orange-500 px-6 py-4 text-sm font-extrabold text-white shadow-lg shadow-orange-500/20 transition hover:-translate-y-1 hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Confirm Booking & Continue to Payment
                <ArrowRight size={19} />
              </button>

              <p className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-400">
                <LockKeyhole size={14} />
                Your booking will be saved after payment.
              </p>

            </div>

          </form>

          {/* RIGHT BOOKING SUMMARY */}
          <aside className="space-y-5 lg:sticky lg:top-24">

            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

              <div className="bg-slate-950 px-6 py-5">
                <p className="text-xs font-bold uppercase tracking-[2px] text-orange-400">
                  Your Reservation
                </p>

                <h2 className="mt-2 text-xl font-black text-white">
                  Booking Summary
                </h2>
              </div>

              <div className="p-6">

                <img
                  src={car.image}
                  alt={car.name}
                  className="h-48 w-full rounded-2xl object-cover"
                />

                <div className="mt-5">

                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-xl font-black text-slate-900">
                        {car.name}
                      </h3>

                      <p className="mt-1 text-sm text-slate-500">
                        {car.model} · {car.type}
                      </p>
                    </div>

                    <span className="rounded-lg bg-green-50 px-3 py-1 text-xs font-bold text-green-600">
                      {car.available ? "Available" : "Unavailable"}
                    </span>
                  </div>

                  <div className="my-6 space-y-4 border-y border-slate-100 py-5">

                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">
                        Daily rental
                      </span>

                      <b className="text-slate-900">
                        ₹{car.price.toLocaleString("en-IN")}
                      </b>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">
                        Rental duration
                      </span>

                      <b className="text-slate-900">
                        {days} day(s)
                      </b>
                    </div>

                    <div className="flex justify-between gap-3 text-sm">
                      <span className="text-slate-500">
                        Pickup
                      </span>

                      <b className="max-w-40 break-words text-right text-slate-900">
                        {form.pickup || "Not selected"}
                      </b>
                    </div>

                    <div className="flex justify-between gap-3 text-sm">
                      <span className="text-slate-500">
                        Return
                      </span>

                      <b className="max-w-40 break-words text-right text-slate-900">
                        {form.dropoff || "Not selected"}
                      </b>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">
                        Pickup date
                      </span>

                      <b className="text-slate-900">
                        {form.pickupDate}
                      </b>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">
                        Return date
                      </span>

                      <b className="text-slate-900">
                        {form.returnDate}
                      </b>
                    </div>

                  </div>

                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-slate-900">
                      Estimated Total
                    </span>

                    <span className="text-2xl font-black text-orange-500">
                      ₹{total.toLocaleString("en-IN")}
                    </span>
                  </div>

                  <p className="mt-3 text-xs leading-5 text-slate-400">
                    Estimated rental amount. Taxes and optional
                    extras are not included.
                  </p>

                </div>
              </div>
            </div>

            {/* SECURITY CARD */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5">

              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-green-50 text-green-600">
                  <ShieldCheck size={23} />
                </div>

                <div>
                  <h3 className="text-sm font-extrabold text-slate-900">
                    Safe Booking Experience
                  </h3>

                  <p className="mt-1 text-xs text-slate-500">
                    Review your details before making payment.
                  </p>
                </div>
              </div>

              <div className="mt-5 flex items-center gap-2 border-t border-slate-100 pt-4 text-xs font-semibold text-slate-500">
                <CreditCard size={16} className="text-orange-500" />
                Secure demo payment process
              </div>

            </div>

          </aside>

        </div>
      </section>

    </main>
  );
}
