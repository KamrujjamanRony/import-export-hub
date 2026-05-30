import { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FiSun, FiMoon, FiMenu, FiX, FiLogOut } from "react-icons/fi";
import useAuth from "../hooks/useAuth.js";
import { ThemeContext } from "../context/ThemeProvider.jsx";

const navLinks = [
  { to: "/", label: "Home", end: true },
  { to: "/all-products", label: "All Products" },
  { to: "/my-exports", label: "My Exports" },
  { to: "/my-imports", label: "My Imports" },
  { to: "/add-export", label: "Add Export" },
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const { theme, toggle } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Signed out");
      navigate("/");
    } catch (e) {
      toast.error(e.message || "Could not sign out");
    }
  };

  const navItemClass = ({ isActive }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive
        ? "text-brand-600 dark:text-brand-300 bg-brand-50 dark:bg-brand-500/10"
        : "text-slate-600 hover:text-brand-600 dark:text-slate-300 dark:hover:text-brand-300"
    }`;

  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-white/80 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800">
      <div className="container-page flex items-center justify-between h-16">
        <Link
          to="/"
          className="flex items-center gap-2 font-display font-bold text-lg"
        >
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-brand-800 text-white shadow-md">
            IE
          </span>
          <span className="hidden sm:block">Import Export Hub</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} className={navItemClass}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggle}
            aria-label="Toggle theme"
            className="p-2 rounded-md text-slate-500 hover:text-brand-600 dark:text-slate-300 dark:hover:text-brand-300"
          >
            {theme === "dark" ? <FiSun /> : <FiMoon />}
          </button>

          {user ? (
            <div className="hidden md:flex items-center gap-3">
              <div
                className="h-9 w-9 rounded-full bg-slate-200 dark:bg-slate-800 bg-cover bg-center ring-2 ring-brand-200 dark:ring-brand-500/40"
                title={user.displayName || user.email}
                style={{
                  backgroundImage: user.photoURL
                    ? `url(${user.photoURL})`
                    : undefined,
                }}
              />
              <button
                onClick={handleLogout}
                className="btn-outline !py-2 !px-3 text-sm"
              >
                <FiLogOut /> Logout
              </button>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Link to="/login" className="btn-outline !py-2 !px-4 text-sm">
                Login
              </Link>
              <Link to="/register" className="btn-primary !py-2 !px-4 text-sm">
                Register
              </Link>
            </div>
          )}

          <button
            type="button"
            onClick={() => setOpen((s) => !s)}
            className="lg:hidden p-2 rounded-md text-slate-500 hover:text-brand-600 dark:text-slate-300 dark:hover:text-brand-300"
            aria-label="Toggle menu"
          >
            {open ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
          <div className="container-page py-3 flex flex-col gap-1">
            {navLinks.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.end}
                onClick={() => setOpen(false)}
                className={navItemClass}
              >
                {l.label}
              </NavLink>
            ))}
            <div className="pt-3 mt-2 border-t border-slate-200 dark:border-slate-800 flex flex-wrap gap-2">
              {user ? (
                <button onClick={handleLogout} className="btn-outline w-full">
                  <FiLogOut /> Logout
                </button>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setOpen(false)}
                    className="btn-outline flex-1"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setOpen(false)}
                    className="btn-primary flex-1"
                  >
                    Register
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
