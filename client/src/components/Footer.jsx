import { Link } from "react-router-dom";
import {
  FaGithub,
  FaLinkedin,
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
} from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="mt-20 bg-slate-900 text-slate-200 dark:bg-slate-950">
      <div className="container-page py-12 grid gap-10 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 font-display font-bold text-lg">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-brand-400 to-brand-700 text-white">
              IE
            </span>
            Import Export Hub
          </div>
          <p className="mt-3 text-sm text-slate-400 leading-relaxed">
            A modern web platform to manage global exports and curate your
            personal imports — secure, fast, and elegant.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
            Explore
          </h4>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link to="/all-products" className="hover:text-brand-300">
                All Products
              </Link>
            </li>
            <li>
              <Link to="/add-export" className="hover:text-brand-300">
                Add Export
              </Link>
            </li>
            <li>
              <Link to="/my-exports" className="hover:text-brand-300">
                My Exports
              </Link>
            </li>
            <li>
              <Link to="/my-imports" className="hover:text-brand-300">
                My Imports
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
            Contact
          </h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-300">
            <li>support@import-export-hub.dev</li>
            <li>+1 (555) 010-2030</li>
            <li>123 Global Trade Plaza, NY</li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
            Follow us
          </h4>
          <div className="mt-3 flex gap-3">
            <a
              aria-label="GitHub"
              href="#"
              className="h-9 w-9 rounded-full bg-slate-800 hover:bg-brand-600 flex items-center justify-center"
            >
              <FaGithub />
            </a>
            <a
              aria-label="LinkedIn"
              href="#"
              className="h-9 w-9 rounded-full bg-slate-800 hover:bg-brand-600 flex items-center justify-center"
            >
              <FaLinkedin />
            </a>
            <a
              aria-label="X"
              href="#"
              className="h-9 w-9 rounded-full bg-slate-800 hover:bg-brand-600 flex items-center justify-center"
            >
              <FaXTwitter />
            </a>
            <a
              aria-label="Facebook"
              href="#"
              className="h-9 w-9 rounded-full bg-slate-800 hover:bg-brand-600 flex items-center justify-center"
            >
              <FaFacebookF />
            </a>
            <a
              aria-label="Instagram"
              href="#"
              className="h-9 w-9 rounded-full bg-slate-800 hover:bg-brand-600 flex items-center justify-center"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-800">
        <div className="container-page py-5 text-center text-sm text-slate-400">
          © {new Date().getFullYear()} Import Export Hub. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
