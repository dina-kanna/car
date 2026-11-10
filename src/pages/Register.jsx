
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  CarFront,
  UserRound,
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.name.trim().length < 2) {
      setError("Please enter your full name.");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    try {
      setLoading(true);

      const result = await register(
        form.name.trim(),
        form.email.trim(),
        form.password
      );

      if (!result.success) {
        setError(result.message || "Unable to create your account.");
        return;
      }

      navigate("/profile", { replace: true });
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f4f6fa] p-4 sm:p-8">
      <div className="mx-auto grid min-h-[700px] max-w-full overflow-hidden rounded-[30px] bg-white shadow-xl lg:grid-cols-2">

        {/* LEFT SIDE - IMAGE */}
        <section className="relative hidden overflow-hidden bg-slate-950 lg:block">
          <img
            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=85"
            alt="Luxury sports car"
            className="absolute inset-0 h-full w-full object-cover opacity-60"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-900/20" />

          <div className="relative z-10 flex h-full flex-col justify-between p-12">
            <Link
              to="/"
              className="flex w-fit items-center gap-3 text-2xl font-black text-white"
            >
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-orange-500">
                <CarFront size={27} />
              </span>
              DriveNow
            </Link>

            <div className="max-w-md pb-8">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[2px] text-orange-300 backdrop-blur">
                <CheckCircle2 size={15} />
                Your journey begins here
              </span>

              <h1 className="mt-7 text-5xl font-black leading-tight text-white">
                More freedom.
                <span className="block text-orange-400">
                  More adventures.
                </span>
              </h1>

              <p className="mt-5 text-sm leading-8 text-slate-300">
                Create your DriveNow account and discover a smarter,
                simpler way to rent your next car.
              </p>

              <div className="mt-10 flex items-center gap-4 border-t border-white/20 pt-7">
                <div className="flex -space-x-3">
                  <img
                    src="https://i.pravatar.cc/100?img=12"
                    alt="Customer"
                    className="h-10 w-10 rounded-full border-2 border-slate-900"
                  />
                  <img
                    src="https://i.pravatar.cc/100?img=32"
                    alt="Customer"
                    className="h-10 w-10 rounded-full border-2 border-slate-900"
                  />
                  <img
                    src="https://i.pravatar.cc/100?img=44"
                    alt="Customer"
                    className="h-10 w-10 rounded-full border-2 border-slate-900"
                  />
                </div>

                <div>
                  <p className="text-sm font-bold text-white">
                    Ready for your next trip?
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    Join the DriveNow community
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* RIGHT SIDE - FORM */}
        <section className="flex items-center justify-center px-6 py-12 sm:px-12 lg:px-14">
          <div className="w-full max-w-md">

            {/* MOBILE LOGO */}
            <Link
              to="/"
              className="mb-10 flex items-center gap-2 text-xl font-black text-slate-900 lg:hidden"
            >
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-orange-500 text-white">
                <CarFront size={23} />
              </span>
              DriveNow
            </Link>

            <div className="mb-8">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-orange-50 px-3 py-2 text-xs font-bold text-orange-600">
                <ShieldCheck size={15} />
                CREATE YOUR ACCOUNT
              </div>

              <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
                Let's get you
                <span className="text-orange-500"> started.</span>
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Enter your details below to create your account.
              </p>
            </div>

            <form onSubmit={submit} className="space-y-5">

              {/* NAME */}
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  Full name
                </label>

                <div className="group relative">
                  <UserRound
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition group-focus-within:text-orange-500"
                  />

                  <input
                    type="text"
                    name="name"
                    required
                    autoComplete="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-4 pl-12 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-100"
                  />
                </div>
              </div>

              {/* EMAIL */}
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  Email address
                </label>

                <div className="group relative">
                  <Mail
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition group-focus-within:text-orange-500"
                  />

                  <input
                    type="email"
                    name="email"
                    required
                    autoComplete="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-4 pl-12 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-100"
                  />
                </div>
              </div>

              {/* PASSWORD */}
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  Password
                </label>

                <div className="group relative">
                  <LockKeyhole
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition group-focus-within:text-orange-500"
                  />

                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    required
                    minLength={6}
                    autoComplete="new-password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Create a password"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-4 pl-12 pr-12 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-100"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-orange-500"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                  </button>
                </div>

                <p className="mt-2 text-xs text-slate-400">
                  Use at least 6 characters.
                </p>
              </div>

              {/* ERROR */}
              {error && (
                <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                  {error}
                </div>
              )}

              {/* SUBMIT */}
              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-3 rounded-xl bg-orange-500 py-4 text-sm font-extrabold text-white shadow-lg shadow-orange-500/20 transition hover:-translate-y-0.5 hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Creating account..." : "Create account"}
                {!loading && <ArrowRight size={19} />}
              </button>

            </form>

            <div className="my-7 flex items-center gap-4">
              <div className="h-px flex-1 bg-slate-200" />
              <span className="text-xs font-semibold text-slate-400">
                ALREADY A MEMBER?
              </span>
              <div className="h-px flex-1 bg-slate-200" />
            </div>

            <p className="text-center text-sm text-slate-500">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-extrabold text-orange-600 transition hover:text-orange-700"
              >
                Sign in
              </Link>
            </p>

            <p className="mt-10 text-center text-xs leading-6 text-slate-400">
              By creating an account, you agree to our Terms of Service
              and Privacy Policy.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
