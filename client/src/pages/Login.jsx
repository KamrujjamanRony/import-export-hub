import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FiEye, FiEyeOff } from "react-icons/fi";
import useAuth from "../hooks/useAuth.js";
import useTitle from "../hooks/useTitle.js";
import GoogleButton from "../components/GoogleButton.jsx";

export default function Login() {
  useTitle("Login");
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handle = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await login({ email, password });
      toast.success("Welcome back!");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.message || "Could not sign in");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container-page py-16">
      <div className="max-w-md mx-auto card p-8">
        <h1 className="font-display text-3xl font-bold text-center">
          Welcome back
        </h1>
        <p className="text-center text-slate-500 dark:text-slate-400 mt-2">
          Sign in to continue to Import Export Hub.
        </p>

        <form onSubmit={handle} className="mt-7 space-y-4">
          <label className="block">
            <span className="text-sm font-medium">Email</span>
            <input
              type="email"
              required
              autoComplete="email"
              className="input mt-1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium">Password</span>
            <div className="relative mt-1">
              <input
                type={show ? "text" : "password"}
                required
                autoComplete="current-password"
                className="input pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
          </label>

          <div className="flex justify-end">
            <button
              type="button"
              className="text-sm text-brand-600 hover:underline dark:text-brand-300"
            >
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="btn-primary w-full py-3"
          >
            {submitting ? "Signing in…" : "Login"}
          </button>
        </form>

        <div className="my-6 flex items-center gap-3">
          <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800" />
          <span className="text-xs uppercase tracking-wider text-slate-400">
            or
          </span>
          <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800" />
        </div>

        <GoogleButton />

        <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
          New here?{" "}
          <Link
            to="/register"
            className="text-brand-600 dark:text-brand-300 font-medium hover:underline"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
