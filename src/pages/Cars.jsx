
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  SlidersHorizontal,
  ArrowUpDown,
  RotateCcw,
  CarFront,
  Fuel,
  Settings2,
  MapPin,
  ChevronRight,
  X,
  Sparkles,
} from "lucide-react";

import CarCard from "../components/CarCard";
import { cars } from "../data/cars";

export default function Cars() {
  const priceLimit = Math.max(
    200,
    ...cars.map((car) => Number(car.price) || 0)
  );

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [gearbox, setGearbox] = useState("All");
  const [maxPrice, setMaxPrice] = useState(priceLimit);
  const [sortBy, setSortBy] = useState("recommended");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const categories = [
    "All",
    ...new Set(cars.map((car) => car.type).filter(Boolean)),
  ];

  const brands = [
    "All",
    ...new Set(cars.map((car) => car.brand).filter(Boolean)),
  ];

  const gearboxes = [
    "All",
    ...new Set(cars.map((car) => car.transmission).filter(Boolean)),
  ];

  const filteredCars = useMemo(() => {
    const result = cars.filter((car) => {
      const keyword = `${car.name} ${car.brand} ${car.type}`.toLowerCase();

      return (
        keyword.includes(search.trim().toLowerCase()) &&
        (category === "All" || car.type === category) &&
        (selectedBrand === "All" || car.brand === selectedBrand) &&
        (gearbox === "All" || car.transmission === gearbox) &&
        Number(car.price) <= maxPrice
      );
    });

    if (sortBy === "low") {
      result.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (sortBy === "high") {
      result.sort((a, b) => Number(b.price) - Number(a.price));
    } else if (sortBy === "rating") {
      result.sort((a, b) => Number(b.rating) - Number(a.rating));
    }

    return result;
  }, [search, category, selectedBrand, gearbox, maxPrice, sortBy]);

  const resetFilters = () => {
    setSearch("");
    setCategory("All");
    setSelectedBrand("All");
    setGearbox("All");
    setMaxPrice(priceLimit);
    setSortBy("recommended");
  };

  const activeFilters = [
    category !== "All",
    selectedBrand !== "All",
    gearbox !== "All",
    maxPrice < priceLimit,
  ].filter(Boolean).length;

  const SelectFilter = ({ label, value, onChange, options }) => (
    <div>
      <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-gray-500">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-gray-200 bg-white px-3 py-3 text-sm font-medium text-gray-700 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option === "All" ? `All ${label}s` : option}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <main className="min-h-screen bg-[#f7f8fa]">

      {/* HEADER */}
      <section className="bg-white border-b border-gray-100">
        <div className="mx-auto max-w-full px-5 py-8 lg:px-8">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <Link to="/" className="hover:text-orange-500">
              Home
            </Link>
            <ChevronRight size={14} />
            <span className="font-semibold text-gray-800">Explore Cars</span>
          </div>

          <div className="mt-8 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <div className="mb-3 flex items-center gap-2 text-sm font-bold text-orange-600">
                <Sparkles size={17} />
                YOUR JOURNEY STARTS HERE
              </div>

              <h1 className="text-4xl font-black tracking-tight text-gray-900 sm:text-5xl">
                Find your next
                <span className="text-orange-500"> ride.</span>
              </h1>

              <p className="mt-3 max-w-lg text-sm leading-7 text-gray-500">
                Discover a collection of comfortable, reliable and premium
                vehicles for every kind of journey.
              </p>
            </div>

            <div className="flex items-center gap-4 rounded-2xl bg-orange-50 px-5 py-4">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-orange-500 text-white">
                <CarFront size={25} />
              </div>
              <div>
                <p className="text-2xl font-black text-gray-900">
                  {filteredCars.length}
                </p>
                <p className="text-xs font-semibold text-gray-500">
                  Cars available
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORY SHORTCUTS */}
      <section className="mx-auto max-w-full px-5 pt-8 lg:px-8">
        <div className="flex gap-2 overflow-x-auto pb-3">
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-bold transition ${
                category === item
                  ? "bg-gray-900 text-white shadow-md"
                  : "border border-gray-200 bg-white text-gray-600 hover:border-orange-400 hover:text-orange-600"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </section>

      {/* SEARCH AND SORT */}
      <section className="mx-auto max-w-full px-5 py-5 lg:px-8">
        <div className="flex flex-col gap-3 rounded-2xl border border-gray-100 bg-white p-3 shadow-sm sm:flex-row">
          <div className="relative flex-1">
            <Search
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by car name, brand or category..."
              className="w-full rounded-xl bg-gray-50 py-4 pl-12 pr-4 text-sm outline-none transition focus:bg-white focus:ring-2 focus:ring-orange-100"
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setFiltersOpen(!filtersOpen)}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-gray-200 px-5 py-3 text-sm font-bold text-gray-700 hover:border-orange-400 sm:flex-none lg:hidden"
            >
              <SlidersHorizontal size={17} />
              Filters
              {activeFilters > 0 && (
                <span className="rounded-full bg-orange-500 px-2 py-0.5 text-xs text-white">
                  {activeFilters}
                </span>
              )}
            </button>

            <div className="flex items-center gap-2 rounded-xl border border-gray-200 px-3">
              <ArrowUpDown size={17} className="text-orange-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent py-3 text-sm font-semibold text-gray-700 outline-none"
              >
                <option value="recommended">Recommended</option>
                <option value="low">Price: Low to High</option>
                <option value="high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* LISTING */}
      <section className="mx-auto max-w-full px-5 pb-16 lg:px-8">
        <div className="grid items-start gap-7 lg:grid-cols-[250px_1fr]">

          {/* FILTER PANEL */}
          <aside
            className={`${
              filtersOpen ? "block" : "hidden"
            } rounded-2xl border border-gray-100 bg-white p-5 shadow-sm lg:sticky lg:top-24 lg:block`}
          >
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-black text-gray-900">
                  Refine search
                </h2>
                <p className="mt-1 text-xs text-gray-400">
                  Customize your preferences
                </p>
              </div>

              <button
                onClick={() => setFiltersOpen(false)}
                className="text-gray-400 hover:text-gray-900 lg:hidden"
                aria-label="Close filters"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-5">
              <SelectFilter
                label="Car category"
                value={category}
                onChange={setCategory}
                options={categories}
              />

              <SelectFilter
                label="Brand"
                value={selectedBrand}
                onChange={setSelectedBrand}
                options={brands}
              />

              <SelectFilter
                label="Transmission"
                value={gearbox}
                onChange={setGearbox}
                options={gearboxes}
              />
            </div>

            <div className="mt-7 border-t border-gray-100 pt-6">
              <div className="mb-4 flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  Daily budget
                </label>
                <span className="rounded-lg bg-orange-50 px-3 py-1.5 text-sm font-black text-orange-600">
                  ₹{maxPrice}
                </span>
              </div>

              <input
                type="range"
                min="40"
                max={priceLimit}
                step="5"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full cursor-pointer accent-orange-500"
                aria-label="Maximum daily price"
              />

              <div className="mt-2 flex justify-between text-xs text-gray-400">
                <span>₹40</span>
                <span>₹{priceLimit}+</span>
              </div>
            </div>

            <button
              onClick={resetFilters}
              className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 py-3 text-sm font-bold text-gray-600 transition hover:border-orange-400 hover:bg-orange-50 hover:text-orange-600"
            >
              <RotateCcw size={16} />
              Reset filters
            </button>
          </aside>

          {/* CAR RESULTS */}
          <div>
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-black text-gray-900">
                  Choose your car
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Showing {filteredCars.length} of {cars.length} vehicles
                </p>
              </div>

              <div className="flex items-center gap-2 rounded-full bg-green-50 px-3 py-2 text-xs font-bold text-green-700">
                <span className="h-2 w-2 rounded-full bg-green-500" />
                Ready to book
              </div>
            </div>

            {filteredCars.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {filteredCars.map((car) => (
                  <CarCard key={car.id} car={car} />
                ))}
              </div>
            ) : (
              <div className="rounded-3xl border border-gray-100 bg-white px-6 py-20 text-center">
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-orange-50 text-orange-500">
                  <CarFront size={32} />
                </div>
                <h3 className="mt-5 text-xl font-black text-gray-900">
                  No cars found
                </h3>
                <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-gray-500">
                  Try another search or remove some filters to see more
                  available vehicles.
                </p>
                <button
                  onClick={resetFilters}
                  className="mt-6 inline-flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3 text-sm font-bold text-white transition hover:bg-orange-600"
                >
                  <RotateCcw size={16} />
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="border-t border-gray-100 bg-white py-10">
        <div className="mx-auto grid max-w-full gap-7 px-5 sm:grid-cols-3 lg:px-8">
          <div className="flex items-center justify-center gap-3">
            <Fuel className="text-orange-500" size={22} />
            <div>
              <p className="text-sm font-bold text-gray-800">Fuel choices</p>
              <p className="text-xs text-gray-400">Petrol, diesel & electric</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3">
            <Settings2 className="text-orange-500" size={22} />
            <div>
              <p className="text-sm font-bold text-gray-800">Your choice</p>
              <p className="text-xs text-gray-400">Automatic & manual</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3">
            <MapPin className="text-orange-500" size={22} />
            <div>
              <p className="text-sm font-bold text-gray-800">Easy booking</p>
              <p className="text-xs text-gray-400">Book your next journey</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
