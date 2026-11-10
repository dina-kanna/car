import { useState } from "react";
import {
  useParams,
  Link,
  useNavigate,
} from "react-router-dom";

import {
  ArrowLeft,
  Check,
  Users,
  Fuel,
  Settings2,
  Gauge,
  CalendarDays,
  Star,
} from "lucide-react";

import { cars } from "../data/cars";

export default function CarDetails() {
  const { id } = useParams();

  const car = cars.find(
    (item) => item.id === Number(id)
  );

  const [image, setImage] = useState(0);
  const navigate = useNavigate();

  if (!car) {
    return (
      <div className="container-x py-24 text-center">
        <h1 className="text-2xl font-bold">Car not found</h1>

        <Link className="btn-primary mt-5" to="/cars">
          Browse cars
        </Link>
      </div>
    );
  }

  const gallery = car.gallery?.length
    ? car.gallery
    : [car.image];

  return (
    <main className="container-x py-10">
      <Link
        to="/cars"
        className="mb-7 inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-orange-500"
      >
        <ArrowLeft size={17} />
        Back to cars
      </Link>

      <div className="grid gap-9 lg:grid-cols-[1.25fr_.75fr]">
        {/* Image Gallery */}
        <section>
          <div className="overflow-hidden rounded-3xl bg-slate-100">
            <img
              src={gallery[image]}
              alt={car.name}
              className="h-[360px] w-full object-cover sm:h-[470px]"
            />
          </div>

          <div className="mt-3 grid grid-cols-3 gap-3">
            {gallery.map((src, index) => (
              <button
                key={src}
                onClick={() => setImage(index)}
                className={`overflow-hidden rounded-xl border-2 ${
                  image === index
                    ? "border-orange-500"
                    : "border-transparent"
                }`}
              >
                <img
                  src={src}
                  alt={`${car.name} view ${index + 1}`}
                  className="h-24 w-full object-cover"
                />
              </button>
            ))}
          </div>

          {/* Description */}
          <div className="mt-9">
            <h2 className="text-2xl font-black">
              About this car
            </h2>

            <p className="mt-3 leading-7 text-slate-500">
              {car.description}
            </p>

            <h3 className="mt-8 text-lg font-extrabold">
              Features included
            </h3>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {car.features.map((feature) => (
                <span
                  key={feature}
                  className="flex items-center gap-2 text-sm text-slate-600"
                >
                  <Check size={17} className="text-emerald-500" />
                  {feature}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Booking Summary */}
        <aside>
          <div className="sticky top-24 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-bold text-orange-600">
                {car.type}
              </span>

              <span className="flex items-center gap-1 text-sm font-bold">
                <Star
                  size={15}
                  className="fill-amber-400 text-amber-400"
                />

                {car.rating}

                <span className="font-normal text-slate-400">
                  ({car.reviews} reviews)
                </span>
              </span>
            </div>

            <h1 className="mt-4 text-3xl font-black">
              {car.name}
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              {car.model}
            </p>

            <div className="my-6 grid grid-cols-2 gap-4 border-y border-slate-100 py-5 text-sm">
              {[
                [Users, `${car.seats} seats`],
                [Settings2, car.transmission],
                [Fuel, car.fuel],
                [Gauge, car.mileage],
              ].map(([Icon, value]) => (
                <span
                  key={value}
                  className="flex items-center gap-2 text-slate-600"
                >
                  <Icon size={17} className="text-orange-500" />
                  {value}
                </span>
              ))}
            </div>

            <h3 className="font-extrabold">Rental rates</h3>

            <div className="mt-3 space-y-3">
              {[
                ["Daily", car.price],
                ["Weekly", car.week],
                ["Monthly", car.month],
              ].map(([label, price]) => (
                <div
                  key={label}
                  className="flex justify-between rounded-xl bg-slate-50 px-4 py-3"
                >
                  <span className="text-sm text-slate-500">
                    {label}
                  </span>

                  <b>${price.toLocaleString()}</b>
                </div>
              ))}
            </div>

            <button
              disabled={!car.available}
              onClick={() => navigate(`/booking/${car.id}`)}
              className="btn-primary mt-6 w-full disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              {car.available
                ? "Book this car"
                : "Currently unavailable"}

              <CalendarDays size={17} />
            </button>

            <p className="mt-3 text-center text-xs text-slate-400">
              No payment is collected in this demo.
            </p>
          </div>
        </aside>
      </div>
    </main>
  );
}