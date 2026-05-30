import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import api from "../api/axios.js";
import useTitle from "../hooks/useTitle.js";
import ProductCard from "../components/ProductCard.jsx";
import Loader from "../components/Loader.jsx";

export default function AllProducts() {
  useTitle("All Products");
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [debounced, setDebounced] = useState("");
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    const t = setTimeout(() => setDebounced(search.trim()), 350);
    return () => clearTimeout(t);
  }, [search]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const { data } = await api.get("/products", {
          params: { search: debounced },
        });
        if (!cancelled) {
          setProducts(data);
          setErr("");
        }
      } catch (e) {
        if (!cancelled) setErr(e.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [debounced]);

  return (
    <div className="container-page py-12">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="section-title">All Products</h1>
          <p className="section-sub">
            Discover premium products from exporters around the world.
          </p>
        </div>
        <div className="relative w-full sm:w-80">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by product name…"
            className="input pl-10"
          />
        </div>
      </div>

      {loading ? (
        <Loader />
      ) : err ? (
        <p className="text-rose-500">{err}</p>
      ) : products.length === 0 ? (
        <div className="card p-10 text-center">
          <p className="text-lg font-medium">No products match your search.</p>
          <p className="text-slate-500 mt-1">
            Try a different keyword or clear the search.
          </p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
