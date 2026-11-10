
import { Link } from "react-router-dom";
import {
  CarFront,
  MapPin,
  Phone,
  Mail,
  ArrowUpRight,
  Globe,
  Share2,
  MessageCircle,
  ChevronRight,
} from "lucide-react";

function Footer() {
  const socialIcons = [Globe, Share2, MessageCircle];

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Explore Cars", path: "/cars" },
    { name: "Login", path: "/login" },
    { name: "Create Account", path: "/register" },
  ];

  return (
    <footer className="relative mt-20 overflow-hidden bg-slate-950 text-slate-300">

      {/* Decorative Background */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-orange-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-full px-5 lg:px-8">

        {/* Top CTA Section */}
        <div className="flex flex-col gap-6 rounded-3xl bg-orange-500 p-8 shadow-xl shadow-orange-950/20 md:flex-row md:items-center md:justify-between md:p-10">

          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[3px] text-white/80">
              Drive Your Dreams
            </p>

            <h2 className="text-2xl font-black text-white md:text-3xl">
              Ready for your next journey?
            </h2>

            <p className="mt-2 text-sm text-white/85">
              Find your perfect car and start exploring today.
            </p>
          </div>

          <Link
            to="/cars"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-slate-950 px-7 py-4 text-sm font-bold text-white transition hover:bg-white hover:text-slate-950"
          >
            Explore Cars
            <ArrowUpRight size={18} />
          </Link>
        </div>

        {/* Main Footer */}
        <div className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div>
            <Link to="/" className="mb-6 inline-flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500 text-white">
                <CarFront size={28} />
              </div>

              <div>
                <h2 className="text-2xl font-black text-white">
                  Drive<span className="text-orange-500">Now</span>
                </h2>

                <p className="text-[10px] font-bold uppercase tracking-[2px] text-slate-500">
                  Premium Car Rentals
                </p>
              </div>
            </Link>

            <p className="max-w-xs text-sm leading-7 text-slate-400">
              Your journey starts here. Discover comfortable,
              affordable and reliable rental cars for every
              adventure.
            </p>

            {/* Social Icons */}
            <div className="mt-7 flex items-center gap-3">
              {socialIcons.map((Icon, index) => (
                <div
                  key={index}
                  className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-slate-800 text-slate-400 transition hover:border-orange-500 hover:bg-orange-500 hover:text-white"
                >
                  <Icon size={18} />
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-6 text-sm font-extrabold uppercase tracking-[2px] text-white">
              Quick Links
            </h3>

            <div className="space-y-4">
              {quickLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="group flex items-center gap-2 text-sm text-slate-400 transition hover:translate-x-1 hover:text-orange-500"
                >
                  <ChevronRight
                    size={15}
                    className="text-orange-500"
                  />
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-6 text-sm font-extrabold uppercase tracking-[2px] text-white">
              Our Services
            </h3>

            <div className="space-y-4 text-sm text-slate-400">
              <p className="transition hover:text-orange-500">
                Luxury Car Rental
              </p>
              <p className="transition hover:text-orange-500">
                Economy Car Rental
              </p>
              <p className="transition hover:text-orange-500">
                Business Travel
              </p>
              <p className="transition hover:text-orange-500">
                Long Term Rental
              </p>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-6 text-sm font-extrabold uppercase tracking-[2px] text-white">
              Get In Touch
            </h3>

            <div className="space-y-5">

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-orange-500">
                  <MapPin size={19} />
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Our Location
                  </p>
                  <p className="mt-1 text-sm text-slate-300">
                    Madurai, Tamil Nadu, India
                  </p>
                </div>
              </div>

              <a
                href="tel:+919876543210"
                className="flex items-start gap-4"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-orange-500">
                  <Phone size={19} />
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Call Us
                  </p>
                  <p className="mt-1 text-sm text-slate-300 transition hover:text-orange-500">
                    +91 98765 43210
                  </p>
                </div>
              </a>

              <a
                href="mailto:support@drivenow.com"
                className="flex items-start gap-4"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-orange-500">
                  <Mail size={19} />
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Email Us
                  </p>
                  <p className="mt-1 break-all text-sm text-slate-300 transition hover:text-orange-500">
                    support@drivenow.com
                  </p>
                </div>
              </a>

            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-800 py-7 text-center md:flex-row md:text-left">

          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} DriveNow. All rights reserved.
          </p>

          <div className="flex items-center gap-6 text-xs font-medium text-slate-500">
            <Link to="/" className="transition hover:text-orange-500">
              Home
            </Link>

            <Link to="/cars" className="transition hover:text-orange-500">
              Browse Cars
            </Link>

            <a
              href="mailto:support@drivenow.com"
              className="transition hover:text-orange-500"
            >
              Support
            </a>
          </div>

          <p className="text-xs font-semibold text-slate-500">
            Made with <span className="text-orange-500">♥</span> for every journey
          </p>

        </div>
      </div>
    </footer>
  );
}

export default Footer;
