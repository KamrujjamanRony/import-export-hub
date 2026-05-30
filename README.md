# Import Export Hub — Assignment A-10 (MERN)

A modern web platform where users can manage exports, browse global products, and import any product into their personal "My Imports" section with one click. Built with the MERN stack.

> **Live Site:** https://import-export-hub.example.com _(replace with your live URL)_

## ✨ Highlights

- 🌍 **Global catalog** — browse curated products from 30+ origin countries with rich detail pages.
- 🛒 **One-click import** — stock-aware import flow with hard limits, server-side `$inc` decrement, and instant UI sync.
- 📦 **Full export management** — create, update, delete, and download your listings as CSV.
- 🔐 **Firebase auth** — email/password + Google sign-in, persistent sessions, protected private routes.
- 🌗 **Polished UX** — responsive layouts, dark/light mode, dynamic page titles, toast notifications, search.

## 🧱 Stack

| Layer   | Tech                                                                                                      |
| ------- | --------------------------------------------------------------------------------------------------------- |
| Client  | React 18 + Vite, React Router 6, Tailwind CSS, Firebase Auth, Axios, Swiper, react-hot-toast, react-icons |
| Server  | Node.js, Express, Mongoose (MongoDB), CORS, Morgan, dotenv                                                |
| Tooling | ESM, Nodemon, autoprefixer                                                                                |

## 📁 Project Structure

```
.
├── client/   # React frontend (Vite)
└── server/   # Express + Mongoose API
```

## 🚀 Getting Started

### 1. Server

```bash
cd server
cp .env.example .env       # already pre-filled with localhost defaults
npm install
npm run dev                # http://localhost:5000
```

Dummy products are auto-seeded the first time the database is empty. To force a reseed:

```bash
npm run seed
```

### 2. Client

```bash
cd client
cp .env.example .env       # replace Firebase keys with your project's values
npm install
npm run dev                # http://localhost:5173
```

> The client uses Firebase Authentication for email/password and Google sign-in.
> Add your hosting domain (Netlify / Surge / Firebase Hosting) to Firebase Auth **Authorized Domains** before deploying.

## 🔑 Environment Variables

### `server/.env`

```
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/import_export_hub
CLIENT_ORIGIN=http://localhost:5173
```

### `client/.env`

```
VITE_API_BASE_URL=http://localhost:5000/api
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

## 🌐 API Endpoints

| Method | Path                  | Description                                                               |
| ------ | --------------------- | ------------------------------------------------------------------------- |
| GET    | `/api/products`       | List products. Supports `search`, `limit`, `sort=recent`, `exporterEmail` |
| GET    | `/api/products/:id`   | Get single product                                                        |
| POST   | `/api/products`       | Create product                                                            |
| PATCH  | `/api/products/:id`   | Update product                                                            |
| DELETE | `/api/products/:id`   | Delete product                                                            |
| GET    | `/api/imports?email=` | List imports for a user                                                   |
| POST   | `/api/imports`        | Import a product (auto-decrements stock via `$inc`)                       |
| DELETE | `/api/imports/:id`    | Remove an import                                                          |

## 🧭 Routes

| Path            | Access  | Page                                     |
| --------------- | ------- | ---------------------------------------- |
| `/`             | Public  | Home (slider + latest products + extras) |
| `/all-products` | Public  | All products + search                    |
| `/products/:id` | Private | Product details + Import modal           |
| `/my-imports`   | Private | User's imports                           |
| `/my-exports`   | Private | User's listings (update/delete + CSV)    |
| `/add-export`   | Private | Add a new product                        |
| `/login`        | Public  | Email + Google login                     |
| `/register`     | Public  | Registration with password validation    |

## ✅ Requirements Coverage

- [x] Layout structure: Header (logo + nav + auth controls), Footer (copyright, social, contact)
- [x] Home: banner/slider + latest 6 products (sorted by `createdAt: -1`) + 2 extra sections (Why-us, Testimonials, CTA)
- [x] Authentication: email/password + Google, with password validation (uppercase + lowercase + min 6 chars)
- [x] Product Details (private) with **Import Now** modal, **Import Limit Rule**, disabled submit when over stock, server-side `$inc` stock decrement
- [x] All Products page (3-col grid) with image, name, price, origin, rating, quantity, "See Details"
- [x] My Imports (private) with Remove button
- [x] Add Export (private) — form posts to DB and shows on All Products
- [x] My Exports (private) — Update modal (prefilled) + Delete
- [x] Responsive (mobile / tablet / desktop)
- [x] Challenges: search on All Products • dark/light toggle • dynamic page titles
- [x] Optional: CSV export of My Exports
- [x] No `alert()` / no Lorem ipsum used
- [x] Logged-in users stay logged in across reloads on private routes
