
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import {
  CarFront,
  Mail,
  LockKeyhole,
  ArrowRight,
  ShieldCheck,
  Eye,
  EyeOff,
  ArrowLeft,
  Sparkles,
  Copy,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

const DEMO_USER = {
  name: "Demo User",
  email: "demo@drivenow.com",
  password: "Demo@123",
};

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Create demo account if it does not already exist
  useEffect(() => {
    try {
      const users = JSON.parse(
        localStorage.getItem("drivenow_users") || "[]"
      );

      const demoExists = users.some(
        (user) =>
          user.email.toLowerCase() === DEMO_USER.email.toLowerCase()
      );

      if (!demoExists) {
        users.push(DEMO_USER);

        localStorage.setItem(
          "drivenow_users",
          JSON.stringify(users)
        );
      }
    } catch (err) {
      console.error("Could not initialize demo account:", err);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  };

  // Fill demo credentials
  const useDemoAccount = () => {
    setForm({
      email: DEMO_USER.email,
      password: DEMO_USER.password,
    });

    setError("");
    setShowPassword(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!form.email.trim() || !form.password) {
      setError("Please enter your email and password.");
      return;
    }

    setLoading(true);

    try {
      const result = login(
        form.email.trim(),
        form.password
      );

      if (!result?.success) {
        setError(
          result?.message || "Invalid email or password."
        );
        return;
      }

      const redirectPath =
        location.state?.from?.pathname ||
        location.state?.from ||
        "/profile";

      navigate(redirectPath, {
        replace: true,
      });
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto grid min-h-[680px] max-w-full overflow-hidden rounded-[30px] bg-white shadow-2xl shadow-slate-200/70 lg:grid-cols-2">

        {/* LEFT BRAND SECTION */}
        <section className="relative hidden flex-col justify-between overflow-hidden bg-slate-950 p-10 text-white lg:flex xl:p-14">

          <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-orange-500/20 blur-3xl" />

          <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />

          <Link to="/" className="relative z-10 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500">
              <CarFront size={28} />
            </div>

            <span className="text-2xl font-black tracking-tight">
              Drive<span className="text-orange-500">Now.</span>
            </span>
          </Link>

          <div className="relative z-10 my-12">

            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-orange-300">
              <span className="h-2 w-2 rounded-full bg-orange-500" />
              Your journey starts here
            </span>

            <h1 className="max-w-lg text-5xl font-black leading-tight xl:text-6xl">
              Find your
              <span className="block text-orange-500">
                freedom.
              </span>
              Drive anywhere.
            </h1>

            <p className="mt-6 max-w-md text-base leading-8 text-slate-400">
              Get behind the wheel of your perfect ride.
              Explore our collection of premium, comfortable
              and affordable cars.
            </p>

            <div className="mt-10 overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-3">

              <img
                src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=85"
                alt="Premium rental car"
                className="h-52 w-full rounded-2xl object-cover xl:h-64"
              />

              <div className="flex items-center justify-between gap-4 px-3 py-4">
                <div>
                  <p className="font-bold">
                    The road is calling.
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Choose your ride and enjoy the journey.
                  </p>
                </div>

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-orange-500">
                  <ArrowRight size={20} />
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 flex items-center gap-3 text-sm text-slate-400">
            <ShieldCheck size={19} className="text-orange-500" />
            Simple booking. Comfortable journeys.
          </div>
        </section>

        {/* RIGHT LOGIN SECTION */}
        <section className="flex items-center justify-center px-6 py-12 sm:px-12 lg:px-14">

          <div className="w-full max-w-md">

            <Link
              to="/"
              className="mb-10 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-orange-600"
            >
              <ArrowLeft size={17} />
              Back to home
            </Link>

            {/* MOBILE LOGO */}
            <Link
              to="/"
              className="mb-9 flex items-center gap-2 lg:hidden"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500 text-white">
                <CarFront size={25} />
              </div>

              <span className="text-2xl font-black text-slate-900">
                Drive<span className="text-orange-500">Now.</span>
              </span>
            </Link>

            {/* HEADING */}
            <div className="mb-8">
              <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-orange-600">
                Welcome Back
              </span>

              <h2 className="mt-3 text-4xl font-black tracking-tight text-slate-900">
                Sign in to
                <span className="block">your account.</span>
              </h2>

              <p className="mt-4 text-sm leading-6 text-slate-500">
                Enter your details below to access your account
                and manage your bookings.
              </p>
            </div>

            {/* DEMO ACCOUNT */}
            <div className="mb-7 rounded-2xl border border-orange-200 bg-orange-50 p-4">

              <div className="flex items-center gap-2 text-orange-600">
                <Sparkles size={19} />

                <h3 className="text-sm font-extrabold">
                  Try Demo Account
                </h3>
              </div>

              <div className="mt-4 space-y-2 text-sm text-slate-700">
                <p>
                  <span className="font-bold">Email:</span>{" "}
                  demo@drivenow.com
                </p>

                <p>
                  <span className="font-bold">Password:</span>{" "}
                  Demo@123
                </p>
              </div>

              <button
                type="button"
                onClick={useDemoAccount}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 py-3 text-sm font-extrabold text-white transition hover:bg-slate-900"
              >
                <Copy size={16} />
                Use Demo Credentials
              </button>
            </div>

            {/* LOGIN FORM */}
            <form onSubmit={handleSubmit} className="space-y-5">

              {/* EMAIL */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-bold text-slate-700"
                >
                  Email Address
                </label>

                <div className="group relative">
                  <Mail
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition group-focus-within:text-orange-500"
                  />

                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="name@example.com"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-4 pl-12 pr-4 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/10"
                  />
                </div>
              </div>

              {/* PASSWORD */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-bold text-slate-700"
                >
                  Password
                </label>

                <div className="group relative">
                  <LockKeyhole
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition group-focus-within:text-orange-500"
                  />

                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-4 pl-12 pr-12 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/10"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-orange-600"
                  >
                    {showPassword ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </button>
                </div>
              </div>

              {/* ERROR */}
              {error && (
                <div
                  role="alert"
                  className="rounded-xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-600"
                >
                  {error}
                </div>
              )}

              {/* LOGIN BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-3 rounded-2xl bg-orange-500 py-4 text-sm font-extrabold text-white shadow-lg shadow-orange-500/20 transition hover:-translate-y-0.5 hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Signing in..." : "Sign in to DriveNow"}

                {!loading && <ArrowRight size={19} />}
              </button>
            </form>

            {/* REGISTER */}
            <div className="mt-8 rounded-2xl border border-slate-100 bg-slate-50 p-5 text-center">
              <p className="text-sm text-slate-600">
                Don't have an account yet?
              </p>

              <Link
                to="/register"
                className="mt-2 inline-flex items-center gap-1 text-sm font-extrabold text-orange-600 transition hover:text-orange-700"
              >
                Create Your Free Account
                <ArrowRight size={16} />
              </Link>
            </div>

            <p className="mt-8 text-center text-xs leading-5 text-slate-400">
              Demo credentials are provided for testing this
              frontend application.
            </p>

          </div>
        </section>
      </div>
    </main>
  );
}
