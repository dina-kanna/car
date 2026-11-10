
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MapPin,
  CalendarDays,
  Clock,
  Search,
  ArrowRight,
  CarFront,
  Navigation,
} from "lucide-react";

function getLocalDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function BookingSearch() {
  const navigate = useNavigate();
  const today = getLocalDate();

  const [form, setForm] = useState({
    pickup: "",
    dropoff: "",
    pickupDate: today,
    pickupTime: "10:00",
    returnDate: today,
    returnTime: "18:00",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.pickup.trim() ||
      !form.dropoff.trim() ||
      !form.pickupDate ||
      !form.returnDate ||
      !form.pickupTime ||
      !form.returnTime
    ) {
      alert("Please complete all booking details.");
      return;
    }

    const pickup = new Date(
      `${form.pickupDate}T${form.pickupTime}`
    );

    const returnDate = new Date(
      `${form.returnDate}T${form.returnTime}`
    );

    if (pickup < new Date()) {
      alert("Pickup date and time cannot be in the past.");
      return;
    }

    if (returnDate <= pickup) {
      alert("Return date and time must be after pickup.");
      return;
    }

    sessionStorage.setItem(
      "drivenow_search",
      JSON.stringify(form)
    );

    navigate("/cars");
  };

  const inputClass =
    "w-full bg-transparent text-sm font-semibold text-slate-800 outline-none placeholder:font-normal placeholder:text-slate-400";

  const fieldClass =
    "flex min-h-[76px] items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 transition focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-100";

  const iconClass =
    "shrink-0 text-orange-500";

  return (
    <section className="relative z-10 mx-auto w-full max-w-full px-4 sm:px-6 lg:px-8">

      <form
        onSubmit={handleSubmit}
        className="overflow-hidden rounded-3xl bg-slate-950 shadow-2xl shadow-slate-900/20"
      >

        {/* Booking Header */}
        <div className="flex flex-col gap-4 border-b border-white/10 px-6 py-6 md:flex-row md:items-center md:justify-between md:px-9">

          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500 text-white">
              <CarFront size={26} />
            </div>

            <div>
              <h2 className="text-xl font-extrabold text-white sm:text-2xl">
                Find Your Perfect Ride
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Choose your location, dates and travel time.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-orange-400">
            <span className="h-2 w-2 rounded-full bg-green-400" />
            EASY ONLINE BOOKING
          </div>
        </div>

        {/* Booking Fields */}
        <div className="grid gap-5 p-6 md:grid-cols-2 md:p-9 lg:grid-cols-4">

          {/* Pickup Location */}
          <div className="lg:col-span-2">
            <label
              htmlFor="pickup"
              className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-400"
            >
              Pickup Location
            </label>

            <div className={fieldClass}>
              <MapPin size={22} className={iconClass} />

              <div className="min-w-0 flex-1">
                <input
                  id="pickup"
                  type="text"
                  name="pickup"
                  value={form.pickup}
                  onChange={handleChange}
                  placeholder="Where do you want your car?"
                  className={inputClass}
                  required
                />
              </div>
            </div>
          </div>

          {/* Dropoff Location */}
          <div className="lg:col-span-2">
            <label
              htmlFor="dropoff"
              className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-400"
            >
              Drop-off Location
            </label>

            <div className={fieldClass}>
              <Navigation size={21} className={iconClass} />

              <div className="min-w-0 flex-1">
                <input
                  id="dropoff"
                  type="text"
                  name="dropoff"
                  value={form.dropoff}
                  onChange={handleChange}
                  placeholder="Where will you return the car?"
                  className={inputClass}
                  required
                />
              </div>
            </div>
          </div>

          {/* Pickup Date */}
          <div>
            <label
              htmlFor="pickupDate"
              className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-400"
            >
              Pickup Date
            </label>

            <div className={fieldClass}>
              <CalendarDays size={21} className={iconClass} />

              <div className="min-w-0 flex-1">
                <input
                  id="pickupDate"
                  type="date"
                  name="pickupDate"
                  min={today}
                  value={form.pickupDate}
                  onChange={handleChange}
                  className={inputClass}
                  required
                />
              </div>
            </div>
          </div>

          {/* Pickup Time */}
          <div>
            <label
              htmlFor="pickupTime"
              className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-400"
            >
              Pickup Time
            </label>

            <div className={fieldClass}>
              <Clock size={21} className={iconClass} />

              <div className="min-w-0 flex-1">
                <input
                  id="pickupTime"
                  type="time"
                  name="pickupTime"
                  value={form.pickupTime}
                  onChange={handleChange}
                  className={inputClass}
                  required
                />
              </div>
            </div>
          </div>

          {/* Return Date */}
          <div>
            <label
              htmlFor="returnDate"
              className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-400"
            >
              Return Date
            </label>

            <div className={fieldClass}>
              <CalendarDays size={21} className={iconClass} />

              <div className="min-w-0 flex-1">
                <input
                  id="returnDate"
                  type="date"
                  name="returnDate"
                  min={form.pickupDate || today}
                  value={form.returnDate}
                  onChange={handleChange}
                  className={inputClass}
                  required
                />
              </div>
            </div>
          </div>

          {/* Return Time */}
          <div>
            <label
              htmlFor="returnTime"
              className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-400"
            >
              Return Time
            </label>

            <div className={fieldClass}>
              <Clock size={21} className={iconClass} />

              <div className="min-w-0 flex-1">
                <input
                  id="returnTime"
                  type="time"
                  name="returnTime"
                  value={form.returnTime}
                  onChange={handleChange}
                  className={inputClass}
                  required
                />
              </div>
            </div>
          </div>

          {/* Search Button */}
          <div className="flex items-end md:col-span-2 lg:col-span-4">
            <button
              type="submit"
              className="group flex min-h-[60px] w-full items-center justify-center gap-3 rounded-xl bg-orange-500 px-6 py-4 text-base font-extrabold text-white shadow-lg shadow-orange-500/20 transition duration-300 hover:-translate-y-1 hover:bg-orange-600 hover:shadow-orange-500/30"
            >
              <Search size={21} />
              Search Available Cars
              <ArrowRight
                size={20}
                className="transition-transform group-hover:translate-x-1"
              />
            </button>
          </div>

        </div>

        {/* Bottom Information */}
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 border-t border-white/10 px-6 py-5 text-xs font-medium text-slate-400 md:justify-start md:px-9">

          <span className="flex items-center gap-2">
            <span className="text-green-400">✓</span>
            Easy booking process
          </span>

          <span className="flex items-center gap-2">
            <span className="text-green-400">✓</span>
            Flexible rental dates
          </span>

          <span className="flex items-center gap-2">
            <span className="text-green-400">✓</span>
            Wide range of vehicles
          </span>

        </div>

      </form>
    </section>
  );
}

export default BookingSearch;
