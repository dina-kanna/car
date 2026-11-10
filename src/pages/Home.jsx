
import { useState } from "react";
import { Link } from "react-router-dom";

import {
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  Headphones,
  Wallet,
  MapPin,
  CarFront,
  Star,
  CheckCircle2,
  KeyRound,
  CalendarCheck,
  Sparkles,
  Gauge,
  Fuel,
  Users,
  Quote,
  ChevronDown,
  Clock,
  BadgeCheck,
  Zap,
} from "lucide-react";

import BookingSearch from "../components/BookingSearch";
import CarCard from "../components/CarCard";
import { cars } from "../data/cars";

export default function Home() {
  const [activeFaq, setActiveFaq] = useState(0);

  const benefits = [
    {
      icon: ShieldCheck,
      title: "Safe & Reliable",
      description: "Every vehicle is carefully maintained for a comfortable journey.",
    },
    {
      icon: Wallet,
      title: "Affordable Pricing",
      description: "Enjoy transparent rental prices without hidden charges.",
    },
    {
      icon: Headphones,
      title: "24/7 Assistance",
      description: "Our support team is ready whenever you need help.",
    },
    {
      icon: MapPin,
      title: "Easy Pickup",
      description: "Convenient pickup and return arrangements.",
    },
  ];

  const steps = [
    {
      number: "01",
      icon: CarFront,
      title: "Choose Your Car",
      description: "Explore our collection and find the perfect vehicle for your trip.",
    },
    {
      number: "02",
      icon: CalendarCheck,
      title: "Book Your Dates",
      description: "Select your pickup location and rental dates in a few clicks.",
    },
    {
      number: "03",
      icon: KeyRound,
      title: "Enjoy Your Ride",
      description: "Collect your keys, start your engine and enjoy the journey.",
    },
  ];

  const categories = [
    {
      name: "Sedan",
      description: "Comfortable everyday journeys",
      image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=85",
    },
    {
      name: "SUV",
      description: "Space for every adventure",
      image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=800&q=85",
    },
    {
      name: "Luxury",
      description: "Travel in premium style",
      image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=85",
    },
    {
      name: "Electric",
      description: "A smarter way to travel",
      image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=800&q=85",
    },
  ];

  const testimonials = [
    {
      name: "Arun Kumar",
      location: "Chennai",
      review: "The booking process was simple and quick. The car was clean, comfortable and ready on time. Great experience!",
      rating: 5,
      initials: "AK",
    },
    {
      name: "Priya Sharma",
      location: "Bangalore",
      review: "Excellent service and transparent pricing. I really enjoyed my weekend trip. I will definitely book again.",
      rating: 5,
      initials: "PS",
    },
    {
      name: "Rahul Verma",
      location: "Coimbatore",
      review: "A smooth rental experience from start to finish. The support team was helpful and the vehicle was excellent.",
      rating: 5,
      initials: "RV",
    },
  ];

  const faqs = [
    {
      question: "How can I book a rental car?",
      answer: "Choose your preferred car, select your pickup and return dates, and follow the booking steps to complete your reservation.",
    },
    {
      question: "Can I cancel my booking?",
      answer: "Cancellation depends on the booking policy. Please check your reservation details or contact our support team for assistance.",
    },
    {
      question: "What documents are required?",
      answer: "You generally need a valid driving licence and an accepted identity document. Requirements may vary depending on the rental vehicle and location.",
    },
    {
      question: "Are there any hidden charges?",
      answer: "DriveNow displays rental pricing clearly. Review your booking summary for any applicable additional charges before confirming.",
    },
  ];

  const stats = [
    { value: "18+", label: "Cars Available", icon: CarFront },
    { value: "24/7", label: "Customer Support", icon: Headphones },
    { value: "100%", label: "Easy Booking", icon: BadgeCheck },
    { value: "4.9/5", label: "Customer Rating", icon: Star },
  ];

  return (
    <main className="overflow-hidden bg-white">

      {/* HERO SECTION */}
      <section className="relative bg-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_40%,rgba(249,115,22,0.18),transparent_35%)]" />

        <div className="relative mx-auto grid min-h-[650px] max-w-full items-center gap-14 px-5 py-20 lg:grid-cols-2 lg:px-8">

          <div className="relative z-10">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-400/10 px-4 py-2 text-xs font-bold uppercase tracking-[2px] text-orange-400">
              <Sparkles size={15} />
              Premium Car Rental Experience
            </div>

            <h1 className="max-w-xl text-5xl font-black leading-[1.08] tracking-tight text-white sm:text-6xl lg:text-7xl">
              Your journey.
              <br />
              Your rules.
              <br />
              <span className="text-orange-500">Your Drive.</span>
            </h1>

            <p className="mt-7 max-w-lg text-base leading-8 text-slate-400">
              Discover the freedom of the open road with DriveNow.
              Choose from our collection of quality vehicles and
              make every journey memorable.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                to="/cars"
                className="inline-flex items-center gap-3 rounded-xl bg-orange-500 px-7 py-4 text-sm font-extrabold text-white shadow-lg shadow-orange-500/20 transition hover:-translate-y-1 hover:bg-orange-600"
              >
                Explore Our Fleet
                <ArrowRight size={19} />
              </Link>

              <a
                href="#how-it-works"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-7 py-4 text-sm font-bold text-white transition hover:border-orange-500 hover:text-orange-400"
              >
                How It Works
              </a>
            </div>

            <div className="mt-12 flex flex-wrap gap-8 border-t border-white/10 pt-7">
              <div>
                <h3 className="text-2xl font-black text-white">18+</h3>
                <p className="mt-1 text-xs text-slate-400">Available Cars</p>
              </div>

              <div>
                <h3 className="text-2xl font-black text-white">24/7</h3>
                <p className="mt-1 text-xs text-slate-400">Customer Support</p>
              </div>

              <div>
                <h3 className="text-2xl font-black text-white">Easy</h3>
                <p className="mt-1 text-xs text-slate-400">Online Booking</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -right-10 -top-10 h-72 w-72 rounded-full bg-orange-500/20 blur-[100px]" />

            <div className="relative overflow-hidden rounded-[35px] border border-white/10 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=90"
                alt="Premium sports car"
                className="h-[350px] w-full object-cover sm:h-[470px]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

              <div className="absolute bottom-7 left-7 right-7 flex items-end justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[2px] text-orange-400">
                    Drive Your Dreams
                  </p>
                  <h3 className="mt-2 text-2xl font-black text-white">
                    Experience More.
                  </h3>
                </div>

                <div className="grid h-12 w-12 place-items-center rounded-full bg-orange-500 text-white">
                  <ArrowUpRight size={23} />
                </div>
              </div>
            </div>

            <div className="absolute -bottom-8 -left-3 flex items-center gap-4 rounded-2xl bg-white p-5 shadow-xl sm:-left-8">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-orange-100 text-orange-500">
                <CarFront size={26} />
              </div>

              <div>
                <p className="text-sm font-extrabold text-slate-900">
                  Find Your Perfect Car
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Ready for your next adventure?
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BOOKING SEARCH */}
      <section className="relative z-20 mx-auto -mt-1 max-w-full px-4 py-14 sm:px-6 lg:px-8">
        <BookingSearch />
      </section>

      {/* STATISTICS */}
      <section className="border-y border-slate-100 bg-white py-10">
        <div className="mx-auto grid max-w-full grid-cols-2 gap-8 px-5 md:grid-cols-4 lg:px-8">
          {stats.map((item) => (
            <div key={item.label} className="flex items-center gap-4">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-orange-50 text-orange-500">
                <item.icon size={24} />
              </div>

              <div>
                <h3 className="text-2xl font-black text-slate-900">
                  {item.value}
                </h3>
                <p className="mt-1 text-xs font-semibold text-slate-500">
                  {item.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BENEFITS */}
      <section className="border-y border-slate-100 bg-slate-50 py-20">
        <div className="mx-auto max-w-full px-5 lg:px-8">
          <div className="mb-12 text-center">
            <p className="text-xs font-black uppercase tracking-[3px] text-orange-500">
              The DriveNow Difference
            </p>

            <h2 className="mt-3 text-3xl font-black text-slate-900 sm:text-4xl">
              More Than Just a Rental
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-500">
              We make every part of your rental experience simple,
              convenient and reliable.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((item) => (
              <div
                key={item.title}
                className="group rounded-2xl border border-slate-100 bg-white p-7 transition duration-300 hover:-translate-y-2 hover:border-orange-200 hover:shadow-xl"
              >
                <div className="mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-orange-50 text-orange-500 transition group-hover:bg-orange-500 group-hover:text-white">
                  <item.icon size={26} />
                </div>

                <h3 className="text-lg font-extrabold text-slate-900">
                  {item.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CAR CATEGORIES */}
      <section className="py-24">
        <div className="mx-auto max-w-full px-5 lg:px-8">
          <div className="mb-12 text-center">
            <p className="text-xs font-black uppercase tracking-[3px] text-orange-500">
              Explore By Category
            </p>

            <h2 className="mt-3 text-3xl font-black text-slate-900 sm:text-4xl">
              Find a Car for Every Journey
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-500">
              From comfortable sedans to powerful SUVs, discover
              the vehicle that matches your travel style.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <Link
                key={category.name}
                to="/cars"
                className="group relative h-72 overflow-hidden rounded-3xl"
              >
                <img
                  src={category.image}
                  alt={`${category.name} rental cars`}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/10 to-transparent" />

                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-2xl font-black text-white">
                    {category.name}
                  </h3>

                  <p className="mt-1 text-sm text-slate-300">
                    {category.description}
                  </p>

                  <div className="mt-4 flex items-center gap-2 text-sm font-bold text-orange-400">
                    Explore Cars
                    <ArrowUpRight size={17} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* POPULAR CARS */}
      <section className="bg-slate-50 py-24">
        <div className="mx-auto max-w-full px-5 lg:px-8">
          <div className="mb-12 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[3px] text-orange-500">
                <Star size={15} fill="currentColor" />
                Customer Favorites
              </div>

              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
                Find Your Perfect Ride
              </h2>

              <p className="mt-3 max-w-lg text-sm leading-7 text-slate-500">
                Explore our handpicked collection of vehicles
                designed for comfort, style and performance.
              </p>
            </div>

            <Link
              to="/cars"
              className="inline-flex items-center gap-2 self-start rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-800 transition hover:border-orange-500 hover:bg-orange-500 hover:text-white sm:self-auto"
            >
              View All Cars
              <ArrowUpRight size={18} />
            </Link>
          </div>

          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {cars.slice(0, 6).map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section
        id="how-it-works"
        className="relative overflow-hidden bg-slate-900 py-24"
      >
        <div className="absolute -left-40 top-20 h-80 w-80 rounded-full bg-orange-500/10 blur-[100px]" />

        <div className="relative mx-auto max-w-full px-5 lg:px-8">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <p className="text-xs font-black uppercase tracking-[3px] text-orange-400">
              Simple & Convenient
            </p>

            <h2 className="mt-4 text-3xl font-black text-white sm:text-4xl">
              Get on the Road in 3 Easy Steps
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-400">
              Renting your next car has never been easier.
              Follow these three simple steps.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {steps.map((step) => (
              <div
                key={step.number}
                className="group rounded-3xl border border-white/10 bg-white/[0.04] p-8 transition hover:-translate-y-2 hover:border-orange-500/50 hover:bg-white/[0.07]"
              >
                <div className="flex items-center justify-between">
                  <span className="text-4xl font-black text-white/10">
                    {step.number}
                  </span>

                  <div className="grid h-14 w-14 place-items-center rounded-2xl bg-orange-500 text-white transition group-hover:rotate-6">
                    <step.icon size={27} />
                  </div>
                </div>

                <h3 className="mt-8 text-xl font-extrabold text-white">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-400">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-24">
        <div className="mx-auto grid max-w-full items-center gap-14 px-5 md:grid-cols-2 lg:px-8">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=85"
              alt="Premium car"
              className="h-[380px] w-full rounded-[30px] object-cover shadow-xl"
            />

            <div className="absolute -bottom-6 -right-3 rounded-2xl bg-orange-500 p-6 text-white shadow-xl sm:-right-6">
              <p className="text-3xl font-black">DriveNow</p>
              <p className="mt-1 text-xs font-bold uppercase tracking-wider">
                Your Journey Starts Here
              </p>
            </div>
          </div>

          <div className="pt-5 md:pt-0">
            <p className="text-xs font-black uppercase tracking-[3px] text-orange-500">
              About DriveNow
            </p>

            <h2 className="mt-4 text-3xl font-black leading-tight text-slate-900 sm:text-4xl">
              Every Journey Deserves a Better Ride.
            </h2>

            <p className="mt-5 text-sm leading-8 text-slate-500">
              At DriveNow, we believe renting a car should be
              simple, convenient and enjoyable. Our goal is to
              help you find the right vehicle for every occasion,
              from everyday travel to unforgettable road trips.
            </p>

            <div className="mt-8 space-y-4">
              {[
                "Quality vehicle selection",
                "Simple online booking",
                "Transparent rental pricing",
                "Customer-focused support",
              ].map((feature) => (
                <div key={feature} className="flex items-center gap-3">
                  <CheckCircle2
                    size={20}
                    className="shrink-0 text-orange-500"
                  />

                  <span className="text-sm font-bold text-slate-700">
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            <Link
              to="/cars"
              className="mt-9 inline-flex items-center gap-3 rounded-xl bg-slate-950 px-7 py-4 text-sm font-bold text-white transition hover:bg-orange-500"
            >
              Start Exploring
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* EXTRA FEATURES */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-full px-5 lg:px-8">
          <div className="mb-12 text-center">
            <p className="text-xs font-black uppercase tracking-[3px] text-orange-500">
              Built Around Your Comfort
            </p>

            <h2 className="mt-3 text-3xl font-black text-slate-900 sm:text-4xl">
              A Better Way to Travel
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: Gauge,
                title: "Well-Maintained Cars",
                description: "Choose from vehicles selected for comfort and dependable performance.",
              },
              {
                icon: Zap,
                title: "Quick Reservations",
                description: "Find your vehicle and make your reservation with a simple process.",
              },
              {
                icon: Clock,
                title: "Flexible Travel",
                description: "Plan your trips with rental options that suit your schedule.",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-orange-100 text-orange-500">
                  <feature.icon size={27} />
                </div>

                <h3 className="text-lg font-extrabold text-slate-900">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-500">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CUSTOMER REVIEWS */}
      <section className="py-24">
        <div className="mx-auto max-w-full px-5 lg:px-8">
          <div className="mb-12 text-center">
            <p className="text-xs font-black uppercase tracking-[3px] text-orange-500">
              Customer Experiences
            </p>

            <h2 className="mt-3 text-3xl font-black text-slate-900 sm:text-4xl">
              What Our Customers Say
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-500">
              Discover why customers choose DriveNow for their journeys.
            </p>
          </div>

          <div className="grid gap-7 md:grid-cols-3">
            {testimonials.map((review) => (
              <div
                key={review.name}
                className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm transition hover:-translate-y-2 hover:shadow-xl"
              >
                <Quote size={30} className="text-orange-300" />

                <div className="mt-5 flex gap-1 text-orange-400">
                  {Array.from({ length: review.rating }).map((_, index) => (
                    <Star key={index} size={17} fill="currentColor" />
                  ))}
                </div>

                <p className="mt-5 min-h-28 text-sm leading-7 text-slate-600">
                  "{review.review}"
                </p>

                <div className="mt-7 flex items-center gap-3 border-t border-slate-100 pt-5">
                  <div className="grid h-12 w-12 place-items-center rounded-full bg-orange-100 font-black text-orange-600">
                    {review.initials}
                  </div>

                  <div>
                    <h3 className="text-sm font-extrabold text-slate-900">
                      {review.name}
                    </h3>

                    <p className="mt-1 text-xs text-slate-500">
                      {review.location}
                    </p>
                  </div>

                  <CheckCircle2
                    size={18}
                    className="ml-auto text-green-500"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="bg-slate-50 py-24">
        <div className="mx-auto grid max-w-full gap-14 px-5 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="text-xs font-black uppercase tracking-[3px] text-orange-500">
              Frequently Asked Questions
            </p>

            <h2 className="mt-4 text-3xl font-black leading-tight text-slate-900 sm:text-4xl">
              Got Questions?
              <br />
              We've Got Answers.
            </h2>

            <p className="mt-5 max-w-md text-sm leading-8 text-slate-500">
              Find answers to common questions about bookings,
              rentals and our services.
            </p>

            <Link
              to="/cars"
              className="mt-8 inline-flex items-center gap-2 font-bold text-orange-500 transition hover:text-slate-900"
            >
              Explore Our Cars
              <ArrowRight size={18} />
            </Link>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={faq.question}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
              >
                <button
                  onClick={() =>
                    setActiveFaq(activeFaq === index ? -1 : index)
                  }
                  className="flex w-full items-center justify-between gap-4 p-5 text-left"
                  aria-expanded={activeFaq === index}
                >
                  <span className="text-sm font-extrabold text-slate-900">
                    {faq.question}
                  </span>

                  <ChevronDown
                    size={20}
                    className={`shrink-0 text-orange-500 transition-transform ${
                      activeFaq === index ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {activeFaq === index && (
                  <div className="border-t border-slate-100 px-5 pb-5 pt-4">
                    <p className="text-sm leading-7 text-slate-500">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-5 py-24 lg:px-8">
        <div className="relative mx-auto max-w-full overflow-hidden rounded-[32px] bg-orange-500 px-7 py-16 text-center sm:px-12">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border-[35px] border-white/10" />
          <div className="absolute -bottom-32 -left-20 h-72 w-72 rounded-full border-[35px] border-white/10" />

          <div className="relative">
            <div className="mx-auto mb-6 grid h-16 w-16 place-items-center rounded-2xl bg-white/20 text-white">
              <CarFront size={34} />
            </div>

            <p className="text-xs font-black uppercase tracking-[3px] text-white/80">
              Your Next Adventure Awaits
            </p>

            <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-black text-white sm:text-5xl">
              Ready to Find the Car That Moves You?
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/85">
              Explore our fleet, choose your dates and make
              your next journey unforgettable with DriveNow.
            </p>

            <Link
              to="/cars"
              className="mt-8 inline-flex items-center gap-3 rounded-xl bg-slate-950 px-8 py-4 text-sm font-extrabold text-white transition hover:bg-white hover:text-slate-950"
            >
              Browse Available Cars
              <ArrowRight size={19} />
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
