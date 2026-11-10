
import { useEffect, useState } from "react";

import {
  Link,
  NavLink,
  useNavigate,
  useLocation,
} from "react-router-dom";

import {
  Menu,
  X,
  CarFront,
  UserCircle,
  LogOut,
  ChevronDown,
  ClipboardList,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const { user, logout, bookings } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  // Scroll to top and close mobile menu after navigation
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });

    setMenuOpen(false);
  }, [location.pathname]);

  // Navigation links
  const navLinks = [
    {
      name: "Home",
      path: "/",
      icon: null,
    },
    {
      name: "Explore Cars",
      path: "/cars",
      icon: null,
    },
    {
      name: "Booking",
      path: user ? "/profile" : "/login",
      icon: ClipboardList,
    },
  ];

  // Logout
  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate("/");
  };

  // Link styling
  const linkStyle = ({ isActive }) =>
    `relative py-2 text-sm font-semibold transition-colors duration-200 ${
      isActive
        ? "text-orange-500"
        : "text-slate-600 hover:text-orange-500"
    }`;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/95 backdrop-blur-lg">

      <nav className="mx-auto flex h-[82px] max-w-full items-center justify-between px-5 lg:px-8">

        {/* LOGO */}
        <Link
          to="/"
          className="group flex items-center gap-3"
          onClick={() => setMenuOpen(false)}
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-orange-500 shadow-lg transition group-hover:bg-orange-500 group-hover:text-white">
            <CarFront size={28} />
          </div>

          <div>
            <h1 className="text-2xl font-black tracking-tight text-slate-900">
              Drive<span className="text-orange-500">Now</span>
            </h1>

            <p className="text-[10px] font-bold uppercase tracking-[2px] text-slate-400">
              Premium Car Rentals
            </p>
          </div>
        </Link>

        {/* DESKTOP NAVIGATION */}
        <div className="hidden items-center gap-10 md:flex">

          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              end={link.path === "/"}
              className={linkStyle}
            >
              {({ isActive }) => (
                <>
                  {link.name}

                  {link.name === "Booking" && user && (
                    <span className="ml-1 rounded-full bg-orange-100 px-1.5 py-0.5 text-[10px] text-orange-600">
                      {bookings.length}
                    </span>
                  )}

                  <span
                    className={`absolute -bottom-1 left-0 h-[2px] rounded-full bg-orange-500 transition-all duration-300 ${
                      isActive ? "w-full" : "w-0"
                    }`}
                  />
                </>
              )}
            </NavLink>
          ))}

        </div>

        {/* DESKTOP ACCOUNT */}
        <div className="hidden items-center gap-5 md:flex">

          {user ? (
            <>
              <Link
                to="/profile"
                className="flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-orange-400 hover:text-orange-500"
              >
                <UserCircle size={20} />

                <span>{user.name}</span>

                <ChevronDown size={15} />
              </Link>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-bold text-white transition hover:bg-orange-500"
              >
                <LogOut size={17} />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm font-bold text-slate-700 transition hover:text-orange-500"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="rounded-full bg-orange-500 px-6 py-3 text-sm font-bold text-white shadow-md shadow-orange-200 transition hover:bg-slate-900"
              >
                Get Started
              </Link>
            </>
          )}

        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setMenuOpen((previous) => !previous)}
          className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-900 transition hover:bg-orange-500 hover:text-white md:hidden"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={25} /> : <Menu size={25} />}
        </button>

      </nav>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="border-t border-slate-100 bg-white px-5 py-6 shadow-xl md:hidden">

          <div className="mx-auto max-w-full space-y-3">

            {/* MOBILE LINKS */}
            {navLinks.map((link) => {
              const Icon = link.icon;

              return (
                <NavLink
                  key={link.name}
                  to={link.path}
                  end={link.path === "/"}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center justify-between rounded-xl px-4 py-3 text-sm font-bold transition ${
                      isActive
                        ? "bg-orange-50 text-orange-500"
                        : "text-slate-700 hover:bg-slate-50"
                    }`
                  }
                >
                  <span className="flex items-center gap-3">
                    {Icon && <Icon size={19} />}
                    {link.name}
                  </span>

                  {link.name === "Booking" && user && (
                    <span className="rounded-full bg-orange-100 px-2 py-1 text-xs font-bold text-orange-600">
                      {bookings.length}
                    </span>
                  )}
                </NavLink>
              );
            })}

            {/* MOBILE ACCOUNT */}
            <div className="space-y-3 border-t border-slate-100 pt-4">

              {user ? (
                <>
                  <Link
                    to="/profile"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-3 rounded-xl px-4 py-3 font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    <UserCircle size={20} />
                    My Profile
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-xl px-4 py-3 font-bold text-red-500 hover:bg-red-50"
                  >
                    <LogOut size={19} />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setMenuOpen(false)}
                    className="block rounded-xl px-4 py-3 text-center font-bold text-slate-700 hover:bg-slate-50"
                  >
                    Login
                  </Link>

                  <Link
                    to="/register"
                    onClick={() => setMenuOpen(false)}
                    className="block rounded-xl bg-orange-500 px-4 py-3 text-center font-bold text-white hover:bg-slate-900"
                  >
                    Create Account
                  </Link>
                </>
              )}

            </div>

          </div>
        </div>
      )}

    </header>
  );
}

export default Navbar;
