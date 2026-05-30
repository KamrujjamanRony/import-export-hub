import { Link } from "react-router-dom";
import useTitle from "../hooks/useTitle.js";

export default function NotFound() {
  useTitle("Page Not Found");
  return (
    <div className="container-page py-24 text-center">
      <p className="text-7xl font-display font-bold text-brand-600 dark:text-brand-300">
        404
      </p>
      <h1 className="mt-4 text-3xl font-display font-bold">Page not found</h1>
      <p className="mt-3 text-slate-500 dark:text-slate-400">
        The page you’re looking for doesn’t exist or has been moved.
      </p>
      <Link to="/" className="btn-primary mt-7 inline-flex">
        Back to Home
      </Link>
    </div>
  );
}
