
import { useState } from "react";
import {
  Link,
  Navigate,
  useLocation,
} from "react-router-dom";

import {
  Check,
  CheckCircle2,
  Copy,
  CalendarDays,
  MapPin,
  UserRound,
  CreditCard,
  CarFront,
  ArrowRight,
  Printer,
  ShieldCheck,
  Clock,
  Hash,
  Home,
} from "lucide-react";

const formatDate = (value) => {
  if (!value) return "Not provided";

  const date = new Date(`${value}T00:00:00`);

  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const formatMoney = (value) =>
  `₹${Number(value || 0).toLocaleString("en-IN")}`;

export default function BookingConfirmation() {
  const { state } = useLocation();

  const booking = state?.booking;

  const [copied, setCopied] = useState(false);

  if (!booking) {
    return <Navigate to="/profile" replace />;
  }

  const reference = booking.bookingReference || "DRIVENOW";

  const copyReference = async () => {
    try {
      await navigator.clipboard.writeText(reference);
      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      setCopied(false);
    }
  };

  const printBooking = () => {
    window.print();
  };

  const details = [
    {
      icon: UserRound,
      title: "Customer",
      value: booking.name || "Not provided",
      subtitle: booking.email || "",
    },
    {
      icon: CalendarDays,
      title: "Pickup Date",
      value: formatDate(booking.pickupDate),
      subtitle: `${booking.days || 1} rental day(s)`,
    },
    {
      icon: MapPin,
      title: "Pickup Location",
      value: booking.pickup || "Not provided",
      subtitle: "Starting location",
    },
    {
      icon: MapPin,
      title: "Return Location",
      value: booking.dropoff || "Not provided",
      subtitle: "Vehicle return point",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12">

      <div className="mx-auto max-w-full">

        {/* SUCCESS HEADER */}
        <section className="relative overflow-hidden rounded-t-3xl bg-slate-950 px-6 py-12 text-center sm:px-10">

          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-orange-500/10 blur-3xl" />

          <div className="absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-green-500/10 blur-3xl" />

          <div className="relative">

            <div className="mx-auto grid h-24 w-24 place-items-center rounded-full border border-green-400/30 bg-green-500/10 text-green-400 shadow-lg shadow-green-500/10">
              <CheckCircle2 size={55} strokeWidth={1.7} />
            </div>

            <p className="mt-7 text-xs font-extrabold uppercase tracking-[4px] text-green-400">
              Payment Completed
            </p>

            <h1 className="mt-3 text-3xl font-black text-white sm:text-4xl">
              Your booking is confirmed!
            </h1>

            <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-slate-400">
              Thank you for choosing DriveNow. Your reservation
              details are ready. Get ready for a wonderful journey!
            </p>

            <div className="mt-7 inline-flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/10 px-4 py-2 text-xs font-bold text-green-400">
              <Check size={15} />
              Reservation Successful
            </div>

          </div>
        </section>

        {/* MAIN CONTENT */}
        <section className="rounded-b-3xl border border-slate-200 bg-white p-6 shadow-xl sm:p-10">

          {/* BOOKING REFERENCE */}
          <div className="flex flex-col justify-between gap-4 rounded-2xl border border-orange-100 bg-orange-50 p-5 sm:flex-row sm:items-center">

            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-orange-600">
                <Hash size={15} />
                Booking Reference
              </div>

              <h2 className="mt-2 text-2xl font-black tracking-wider text-slate-900">
                {reference}
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Save this number for future reference.
              </p>
            </div>

            <button
              type="button"
              onClick={copyReference}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-orange-200 bg-white px-5 py-3 text-sm font-bold text-orange-600 transition hover:bg-orange-100"
            >
              {copied ? <Check size={17} /> : <Copy size={17} />}
              {copied ? "Copied!" : "Copy Reference"}
            </button>

          </div>

          {/* CAR INFORMATION */}
          <div className="mt-8">

            <div className="mb-5 flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-orange-50 text-orange-500">
                <CarFront size={24} />
              </div>

              <div>
                <h2 className="text-lg font-black text-slate-900">
                  Your Rental Vehicle
                </h2>

                <p className="text-xs text-slate-400">
                  Vehicle reservation details
                </p>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200">

              <div className="grid md:grid-cols-[240px_1fr]">

                {booking.carImage ? (
                  <img
                    src={booking.carImage}
                    alt={booking.carName || "Rental vehicle"}
                    className="h-52 w-full object-cover md:h-full"
                  />
                ) : (
                  <div className="flex h-52 items-center justify-center bg-slate-100">
                    <CarFront size={55} className="text-slate-400" />
                  </div>
                )}

                <div className="flex flex-col justify-center p-6">

                  <span className="w-fit rounded-full bg-green-50 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-green-600">
                    Reservation Confirmed
                  </span>

                  <h3 className="mt-4 text-2xl font-black text-slate-900">
                    {booking.carName || "DriveNow Vehicle"}
                  </h3>

                  <p className="mt-2 text-sm text-slate-500">
                    Your selected vehicle is reserved.
                  </p>

                  <div className="mt-5 flex flex-wrap gap-3">

                    <div className="rounded-xl bg-slate-50 px-4 py-3">
                      <p className="text-[10px] font-bold uppercase text-slate-400">
                        Duration
                      </p>

                      <p className="mt-1 font-extrabold text-slate-900">
                        {booking.days || 1} Days
                      </p>
                    </div>

                    <div className="rounded-xl bg-slate-50 px-4 py-3">
                      <p className="text-[10px] font-bold uppercase text-slate-400">
                        Payment
                      </p>

                      <p className="mt-1 font-extrabold capitalize text-green-600">
                        {booking.paymentStatus || "Paid"}
                      </p>
                    </div>

                  </div>

                </div>
              </div>
            </div>
          </div>

          {/* RENTAL DETAILS */}
          <div className="mt-9">

            <h2 className="mb-5 text-lg font-black text-slate-900">
              Reservation Information
            </h2>

            <div className="grid gap-4 sm:grid-cols-2">

              {details.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="flex min-w-0 items-start gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-5"
                  >

                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white text-orange-500 shadow-sm">
                      <Icon size={21} />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-slate-400">
                        {item.title}
                      </p>

                      <p className="mt-1 break-words text-sm font-extrabold text-slate-900">
                        {item.value}
                      </p>

                      {item.subtitle && (
                        <p className="mt-1 break-words text-xs text-slate-500">
                          {item.subtitle}
                        </p>
                      )}
                    </div>

                  </div>
                );
              })}

            </div>
          </div>

          {/* PAYMENT DETAILS */}
          <div className="mt-9 rounded-2xl border border-slate-200 p-6">

            <div className="mb-5 flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-green-50 text-green-600">
                <CreditCard size={23} />
              </div>

              <div>
                <h2 className="text-lg font-black text-slate-900">
                  Payment Information
                </h2>

                <p className="text-xs text-slate-400">
                  Your transaction summary
                </p>
              </div>
            </div>

            <div className="space-y-4 text-sm">

              <div className="flex justify-between gap-4">
                <span className="text-slate-500">
                  Payment Method
                </span>

                <span className="font-bold capitalize text-slate-800">
                  {booking.paymentMethod || "Demo payment"}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-slate-500">
                  Payment Status
                </span>

                <span className="font-extrabold text-green-600">
                  {booking.paymentStatus || "Paid"}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-slate-500">
                  Transaction Date
                </span>

                <span className="text-right font-semibold text-slate-800">
                  {booking.paymentDate
                    ? new Date(booking.paymentDate).toLocaleDateString("en-IN")
                    : "Not available"}
                </span>
              </div>

              <div className="border-t border-dashed border-slate-200 pt-5">

                <div className="flex items-center justify-between gap-3">
                  <span className="font-extrabold text-slate-900">
                    Total Amount Paid
                  </span>

                  <span className="text-2xl font-black text-orange-500">
                    {formatMoney(booking.total)}
                  </span>
                </div>

              </div>

            </div>
          </div>

          {/* IMPORTANT NOTICE */}
          <div className="mt-7 flex gap-3 rounded-2xl border border-green-100 bg-green-50 p-5">

            <ShieldCheck
              size={23}
              className="shrink-0 text-green-600"
            />

            <div>
              <h3 className="text-sm font-extrabold text-green-800">
                Booking Successfully Saved
              </h3>

              <p className="mt-1 text-xs leading-6 text-green-700">
                Your reservation details have been saved to your
                DriveNow profile. You can view your booking anytime.
              </p>
            </div>

          </div>

          {/* ACTION BUTTONS */}
          <div className="mt-8 grid gap-3 sm:grid-cols-2">

            <button
              type="button"
              onClick={printBooking}
              className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-4 text-sm font-extrabold text-slate-700 transition hover:border-orange-400 hover:text-orange-500"
            >
              <Printer size={18} />
              Print Confirmation
            </button>

            <Link
              to="/profile"
              className="flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-4 text-sm font-extrabold text-white shadow-lg shadow-orange-500/20 transition hover:-translate-y-1 hover:bg-orange-600"
            >
              My Bookings
              <ArrowRight size={18} />
            </Link>

          </div>

          <div className="mt-5 flex flex-wrap justify-center gap-6 border-t border-slate-100 pt-6">

            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 transition hover:text-orange-500"
            >
              <Home size={16} />
              Home
            </Link>

            <Link
              to="/cars"
              className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 transition hover:text-orange-500"
            >
              <CarFront size={16} />
              Explore Cars
            </Link>

          </div>

          <p className="mt-8 text-center text-sm font-semibold text-slate-400">
            Thank you for travelling with DriveNow!
          </p>

        </section>

      </div>

      {/* PRINT STYLES */}
      <style>
        {`
          @media print {
            body {
              background: white !important;
            }

            header,
            nav,
            footer,
            button,
            a {
              display: none !important;
            }

            main {
              padding: 0 !important;
            }

            section {
              box-shadow: none !important;
            }
          }
        `}
      </style>

    </main>
  );
}
