import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import {
  FiArrowRight,
  FiGlobe,
  FiShield,
  FiTruck,
  FiTrendingUp,
} from "react-icons/fi";
import api from "../api/axios.js";
import useTitle from "../hooks/useTitle.js";
import ProductCard from "../components/ProductCard.jsx";
import Loader from "../components/Loader.jsx";

const SLIDES = [
  {
    title: "Trade the World, From One Hub",
    subtitle:
      "Curate global exports and bring premium imports to your doorstep — all in one secure place.",
    image:
      "https://images.unsplash.com/photo-1494412651409-8963ce7935a7?w=1600",
  },
  {
    title: "Premium Products. Real Origins.",
    subtitle:
      "Discover authentic goods sourced from verified exporters across 30+ countries.",
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1600",
  },
  {
    title: "Built for Modern Merchants",
    subtitle:
      "Real-time stock sync, one-click imports, and a beautifully simple workflow.",
    image:
      "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1600",
  },
];

const FEATURES = [
  {
    icon: FiGlobe,
    title: "Global Reach",
    text: "Source goods from 30+ verified origin countries.",
  },
  {
    icon: FiShield,
    title: "Secure Imports",
    text: "Authenticated checkout with real-time stock locks.",
  },
  {
    icon: FiTruck,
    title: "Fast Fulfillment",
    text: "Streamlined import flow with one-click ordering.",
  },
  {
    icon: FiTrendingUp,
    title: "Live Analytics",
    text: "Always-on stock sync and instant updates.",
  },
];

const TESTIMONIALS = [
  {
    name: "Amara Okafor",
    role: "Boutique Owner, Lagos",
    quote:
      "The cleanest dashboard I have ever used for managing exports. Adding new products takes seconds.",
    avatar: "https://i.pravatar.cc/100?img=47",
  },
  {
    name: "Hiroshi Tanaka",
    role: "Coffee Importer, Tokyo",
    quote:
      "I switched all my sourcing here. The stock sync is flawless and the UI is a joy to navigate.",
    avatar: "https://i.pravatar.cc/100?img=12",
  },
  {
    name: "Sofia Martínez",
    role: "Foodtech Founder, Madrid",
    quote:
      "Import Export Hub helped us discover producers we never would have found otherwise.",
    avatar: "https://i.pravatar.cc/100?img=32",
  },
];

export default function Home() {
  useTitle("Home");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { data } = await api.get("/products", {
          params: { limit: 6, sort: "recent" },
        });
        if (!cancelled) setProducts(data);
      } catch (e) {
        if (!cancelled) setErr(e.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div>
      {/* Hero slider */}
      <section className="relative">
        <Swiper
          modules={[Autoplay, Pagination, EffectFade]}
          effect="fade"
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop
          className="h-[70vh] min-h-[480px]"
        >
          {SLIDES.map((s, i) => (
            <SwiperSlide key={i}>
              <div className="relative h-full w-full">
                <img
                  src={s.image}
                  alt={s.title}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-900/60 to-slate-900/20" />
                <div className="relative container-page h-full flex items-center">
                  <div className="max-w-2xl text-white">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-tight">
                      {s.title}
                    </h1>
                    <p className="mt-5 text-lg text-slate-200/90 leading-relaxed">
                      {s.subtitle}
                    </p>
                    <div className="mt-8 flex flex-wrap gap-3">
                      <Link to="/all-products" className="btn-primary">
                        Browse Products <FiArrowRight />
                      </Link>
                      <Link
                        to="/add-export"
                        className="btn-outline !text-white !border-white/40 hover:!border-white"
                      >
                        Become an Exporter
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Features */}
      <section className="container-page py-16">
        <div className="text-center mb-10">
          <h2 className="section-title">Why Import Export Hub</h2>
          <p className="section-sub">
            A toolkit designed for serious global merchants.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FEATURES.map((f) => (
            <div key={f.title} className="card p-6">
              <div className="h-11 w-11 rounded-lg bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-300 flex items-center justify-center">
                <f.icon size={22} />
              </div>
              <h3 className="mt-4 font-semibold text-lg">{f.title}</h3>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                {f.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Latest products */}
      <section className="container-page py-10">
        <div className="flex items-end justify-between mb-8 gap-4 flex-wrap">
          <div>
            <h2 className="section-title">Latest Products</h2>
            <p className="section-sub">
              The newest 6 products listed on the platform.
            </p>
          </div>
          <Link to="/all-products" className="btn-outline">
            View all <FiArrowRight />
          </Link>
        </div>
        {loading ? (
          <Loader />
        ) : err ? (
          <p className="text-rose-500">{err}</p>
        ) : products.length === 0 ? (
          <p className="text-slate-500">No products yet.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        )}
      </section>

      {/* Testimonials */}
      <section className="container-page py-16">
        <div className="text-center mb-10">
          <h2 className="section-title">Loved by Global Merchants</h2>
          <p className="section-sub">
            A few words from people building their businesses with us.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <figure key={t.name} className="card p-6">
              <blockquote className="text-slate-700 dark:text-slate-300 leading-relaxed">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt=""
                  className="h-11 w-11 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold">{t.name}</div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">
                    {t.role}
                  </div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container-page pb-20">
        <div className="card p-10 sm:p-14 bg-gradient-to-br from-brand-600 to-brand-800 text-white !border-transparent text-center">
          <h2 className="text-3xl sm:text-4xl font-display font-bold">
            Ready to grow your trade business?
          </h2>
          <p className="mt-3 text-brand-100">
            Join thousands of exporters and importers using Import Export Hub
            today.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link
              to="/register"
              className="btn bg-white text-brand-700 hover:bg-brand-50 px-6 py-3 font-semibold"
            >
              Create free account
            </Link>
            <Link
              to="/all-products"
              className="btn-outline !text-white !border-white/40 hover:!border-white"
            >
              Explore products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
