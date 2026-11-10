
import { Link, Navigate, useNavigate } from "react-router-dom";
import {
  UserRound,
  Mail,
  CalendarDays,
  ArrowUpRight,
  CarFront,
  LogOut,
  MapPin,
  Clock3,
  Wallet,
  ChevronRight,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user, bookings = [], logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const totalSpent = bookings.reduce(
    (total, booking) => total + Number(booking.total || 0),
    0
  );

  return (
    <main className="min-h-screen bg-slate-50 pb-16">

      {/* PAGE HEADER */}
      <section className="bg-slate-950 px-5 pb-24 pt-12 text-white sm:px-8">
        <div className="mx-auto max-w-full">

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-orange-400">
                DriveNow Dashboard
              </p>

              <h1 className="mt-3 text-3xl font-black sm:text-4xl">
                Welcome back, {user.name?.split(" ")[0] || "Driver"}!
              </h1>

              <p className="mt-2 text-sm text-slate-400">
                Manage your account and keep track of your journeys.
              </p>
            </div>

            <Link
              to="/cars"
              className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-orange-600"
            >
              Book a car
              <ArrowUpRight size={17} />
            </Link>
          </div>

        </div>
      </section>

      {/* DASHBOARD CONTENT */}
      <div className="mx-auto -mt-12 max-w-full px-5 sm:px-8">

        {/* STATISTICS */}
        <div className="mb-8 grid gap-4 sm:grid-cols-3">

          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-lg shadow-slate-200/40">
            <div className="flex items-center justify-between">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-orange-50 text-orange-600">
                <CarFront size={23} />
              </div>

              <span className="text-xs font-semibold text-slate-400">
                All time
              </span>
            </div>

            <p className="mt-5 text-3xl font-black text-slate-900">
              {bookings.length}
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Total bookings
            </p>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-lg shadow-slate-200/40">
            <div className="flex items-center justify-between">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-blue-50 text-blue-600">
                <CalendarDays size={23} />
              </div>

              <span className="text-xs font-semibold text-slate-400">
                Your trips
              </span>
            </div>

            <p className="mt-5 text-3xl font-black text-slate-900">
              {bookings.reduce(
                (total, booking) => total + Number(booking.days || 0),
                0
              )}
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Rental days
            </p>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-lg shadow-slate-200/40">
            <div className="flex items-center justify-between">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-emerald-50 text-emerald-600">
                <Wallet size={23} />
              </div>

              <span className="text-xs font-semibold text-slate-400">
                All time
              </span>
            </div>

            <p className="mt-5 text-3xl font-black text-slate-900">
              ${totalSpent.toLocaleString()}
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Total booking value
            </p>
          </div>

        </div>

        {/* MAIN GRID */}
        <div className="grid items-start gap-8 lg:grid-cols-[340px_1fr]">

          {/* PROFILE CARD */}
          <aside className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm">

            <div className="relative bg-gradient-to-br from-orange-500 to-orange-600 px-6 pb-12 pt-7 text-white">
              <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full border-[20px] border-white/10" />

              <p className="relative text-xs font-bold uppercase tracking-widest text-orange-100">
                Personal account
              </p>

              <div className="relative mt-6 grid h-20 w-20 place-items-center rounded-2xl border-4 border-white/30 bg-white text-orange-600 shadow-lg">
                <UserRound size={38} />
              </div>
            </div>

            <div className="-mt-4 rounded-t-3xl bg-white px-6 pb-7 pt-6">

              <h2 className="text-2xl font-black text-slate-900">
                {user.name}
              </h2>

              <div className="mt-3 flex items-center gap-2 text-sm text-slate-500">
                <Mail size={16} className="text-orange-500" />
                <span className="break-all">{user.email}</span>
              </div>

              <div className="my-6 border-t border-slate-100" />

              <div className="space-y-4">

                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-slate-100 text-slate-600">
                    <ShieldCheck size={19} />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-slate-800">
                      DriveNow member
                    </p>
                    <p className="text-xs text-slate-400">
                      Account active
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-slate-100 text-slate-600">
                    <Sparkles size={19} />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-slate-800">
                      Your journey awaits
                    </p>
                    <p className="text-xs text-slate-400">
                      Explore available vehicles
                    </p>
                  </div>
                </div>

              </div>

              <button
                onClick={handleLogout}
                className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm font-bold text-rose-600 transition hover:bg-rose-100"
              >
                <LogOut size={17} />
                Sign out
              </button>

            </div>
          </aside>

          {/* BOOKING HISTORY */}
          <section>

            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-orange-500">
                  Your activity
                </p>

                <h2 className="mt-2 text-2xl font-black text-slate-900">
                  Booking history
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  View and manage your rental journeys.
                </p>
              </div>

              <span className="rounded-full bg-orange-100 px-4 py-2 text-xs font-extrabold text-orange-700">
                {bookings.length} bookings
              </span>
            </div>

            {bookings.length > 0 ? (
              <div className="space-y-5">

                {bookings.map((booking) => (
                  <article
                    key={booking.id}
                    className="group overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/50"
                  >

                    <div className="grid md:grid-cols-[220px_1fr]">

                      {/* CAR IMAGE */}
                      <div className="relative h-48 overflow-hidden bg-slate-100 md:h-full">
                        <img
                          src={
                            booking.carImage ||
                            "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=900&q=85"
                          }
                          alt={booking.carName || "Rental car"}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />

                        <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-slate-800 shadow-sm">
                          #{booking.id}
                        </span>
                      </div>

                      {/* BOOKING DETAILS */}
                      <div className="p-5 sm:p-6">

                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div>
                            <p className="text-xs font-bold uppercase tracking-widest text-orange-500">
                              Rental vehicle
                            </p>

                            <h3 className="mt-1 text-xl font-black text-slate-900">
                              {booking.carName || "Rental car"}
                            </h3>
                          </div>

                          <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700">
                            {booking.status || "Confirmed"}
                          </span>
                        </div>

                        <div className="mt-5 grid gap-4 sm:grid-cols-2">

                          <div className="flex items-start gap-3">
                            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-orange-50 text-orange-600">
                              <CalendarDays size={17} />
                            </div>

                            <div>
                              <p className="text-xs font-semibold text-slate-400">
                                Pickup date
                              </p>
                              <p className="mt-1 text-sm font-bold text-slate-800">
                                {booking.pickupDate || "Not specified"}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-blue-50 text-blue-600">
                              <Clock3 size={17} />
                            </div>

                            <div>
                              <p className="text-xs font-semibold text-slate-400">
                                Return date
                              </p>
                              <p className="mt-1 text-sm font-bold text-slate-800">
                                {booking.returnDate || "Not specified"}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-purple-50 text-purple-600">
                              <MapPin size={17} />
                            </div>

                            <div>
                              <p className="text-xs font-semibold text-slate-400">
                                Pickup location
                              </p>
                              <p className="mt-1 text-sm font-bold text-slate-800">
                                {booking.pickup || "Not specified"}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-emerald-50 text-emerald-600">
                              <CarFront size={17} />
                            </div>

                            <div>
                              <p className="text-xs font-semibold text-slate-400">
                                Rental duration
                              </p>
                              <p className="mt-1 text-sm font-bold text-slate-800">
                                {booking.days || 1} day(s)
                              </p>
                            </div>
                          </div>

                        </div>

                        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
                          <div>
                            <p className="text-xs font-semibold text-slate-400">
                              Drop-off location
                            </p>
                            <p className="mt-1 text-sm font-bold text-slate-700">
                              {booking.dropoff || "Not specified"}
                            </p>
                          </div>

                          <div className="text-right">
                            <p className="text-xs font-semibold text-slate-400">
                              Total amount
                            </p>
                            <p className="mt-1 text-2xl font-black text-orange-600">
                              ${Number(booking.total || 0).toLocaleString()}
                            </p>
                          </div>
                        </div>

                      </div>
                    </div>
                  </article>
                ))}

              </div>
            ) : (

              /* EMPTY BOOKING STATE */
              <div className="rounded-3xl border border-dashed border-slate-200 bg-white px-6 py-16 text-center">

                <div className="mx-auto grid h-20 w-20 place-items-center rounded-3xl bg-orange-50 text-orange-500">
                  <CarFront size={38} />
                </div>

                <h3 className="mt-6 text-2xl font-black text-slate-900">
                  No journeys yet
                </h3>

                <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-500">
                  Your booking history will appear here. Find your perfect
                  vehicle and start planning your next journey.
                </p>

                <Link
                  to="/cars"
                  className="mt-7 inline-flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-orange-600"
                >
                  Explore available cars
                  <ChevronRight size={18} />
                </Link>

              </div>
            )}

          </section>
        </div>
      </div>
    </main>
  );
}
