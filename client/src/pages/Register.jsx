import { useMemo, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { FiEye, FiEyeOff, FiCheck, FiX } from "react-icons/fi";
import useAuth from "../hooks/useAuth.js";
import useTitle from "../hooks/useTitle.js";
import GoogleButton from "../components/GoogleButton.jsx";

function validatePassword(pw) {
  return {
    upper: /[A-Z]/.test(pw),
    lower: /[a-z]/.test(pw),
    length: pw.length >= 6,
  };
}

export default function Register() {
  useTitle("Register");
  const { register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [form, setForm] = useState({
    name: "",
    email: "",
    photoURL: "",
    password: "",
  });
  const [show, setShow] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const checks = useMemo(
    () => validatePassword(form.password),
    [form.password],
  );
  const allOk = checks.upper && checks.lower && checks.length;

  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const handle = async (e) => {
    e.preventDefault();
    if (!allOk) return toast.error("Password does not meet the requirements.");
    setSubmitting(true);
    try {
      await register(form);
      toast.success("Account created!");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.message || "Registration failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container-page py-16">
      <div className="max-w-md mx-auto card p-8">
        <h1 className="font-display text-3xl font-bold text-center">
          Create your account
        </h1>
        <p className="text-center text-slate-500 dark:text-slate-400 mt-2">
          Join Import Export Hub and start trading.
        </p>

        <form onSubmit={handle} className="mt-7 space-y-4" noValidate>
          <Field label="Full Name">
            <input
              required
              className="input"
              value={form.name}
              onChange={update("name")}
            />
          </Field>
          <Field label="Email">
            <input
              type="email"
              required
              autoComplete="email"
              className="input"
              value={form.email}
              onChange={update("email")}
            />
          </Field>
          <Field label="Photo URL">
            <input
              type="url"
              className="input"
              value={form.photoURL}
              onChange={update("photoURL")}
              placeholder="https://..."
            />
          </Field>
          <Field label="Password">
            <div className="relative">
              <input
                type={show ? "text" : "password"}
                required
                autoComplete="new-password"
                className="input pr-10"
                value={form.password}
                onChange={update("password")}
              />
              <button
                type="button"
                onClick={() => setShow((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                aria-label="Toggle password"
              >
                {show ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            <ul className="mt-3 space-y-1 text-sm">
              <Rule ok={checks.upper}>Must contain an uppercase letter</Rule>
              <Rule ok={checks.lower}>Must contain a lowercase letter</Rule>
              <Rule ok={checks.length}>At least 6 characters long</Rule>
            </ul>
          </Field>

          <button
            type="submit"
            disabled={submitting || !allOk}
            className="btn-primary w-full py-3"
          >
            {submitting ? "Creating account…" : "Register"}
          </button>
        </form>

        <div className="my-6 flex items-center gap-3">
          <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800" />
          <span className="text-xs uppercase tracking-wider text-slate-400">
            or
          </span>
          <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800" />
        </div>

        <GoogleButton label="Sign up with Google" />

        <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-brand-600 dark:text-brand-300 font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="text-sm font-medium">{label}</span>
      <div className="mt-1">{children}</div>
    </label>
  );
}

function Rule({ ok, children }) {
  return (
    <li
      className={`flex items-center gap-2 ${ok ? "text-emerald-600 dark:text-emerald-400" : "text-rose-500"}`}
    >
      {ok ? <FiCheck /> : <FiX />} {children}
    </li>
  );
}
