import { Link } from "react-router-dom";
import {
  Users,
  Fuel,
  Settings,
  Gauge,
  ArrowRight,
} from "lucide-react";

function CarCard({ car }) {
  return (
    <div className="car-card group">
      <div className="relative overflow-hidden rounded-t-2xl">
        <img
          src={car.image}
          alt={car.name}
          className="h-52 w-full object-cover transition duration-500 group-hover:scale-110"
        />

        <span
          className={`absolute top-4 left-4 rounded-full px-3 py-1 text-xs font-bold ${
            car.available
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {car.available ? "Available" : "Booked"}
        </span>

        <span className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-xs font-bold">
          {car.type}
        </span>
      </div>

      <div className="p-5">
        <div className="flex justify-between items-start gap-3">
          <div>
            <h3 className="text-xl font-bold">{car.name}</h3>
            <p className="text-sm text-gray-500 mt-1">{car.model}</p>
          </div>

          <span className="text-yellow-500 font-bold">
            ★ {car.rating}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 border-y my-5 py-4 text-sm text-gray-600">
          <span className="flex items-center gap-2">
            <Users size={17} /> {car.seats} Seats
          </span>

          <span className="flex items-center gap-2">
            <Fuel size={17} /> {car.fuel}
          </span>

          <span className="flex items-center gap-2">
            <Settings size={17} /> {car.transmission}
          </span>

          <span className="flex items-center gap-2">
            <Gauge size={17} /> {car.mileage}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <div>
            <p className="text-2xl font-extrabold text-primary">
              ₹{car.price.toLocaleString("en-IN")}
            </p>
            <span className="text-xs text-gray-500">/ day</span>
          </div>

          <Link
            to={`/cars/${car.id}`}
            className="btn-primary flex items-center gap-2"
          >
            View Details <ArrowRight size={17} />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CarCard;