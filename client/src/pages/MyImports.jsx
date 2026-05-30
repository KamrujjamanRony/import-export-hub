import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { FiTrash2, FiStar, FiMapPin, FiPackage } from "react-icons/fi";
import api from "../api/axios.js";
import useAuth from "../hooks/useAuth.js";
import useTitle from "../hooks/useTitle.js";
import Loader from "../components/Loader.jsx";

export default function MyImports() {
  useTitle("My Imports");
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const load = async () => {
    if (!user?.email) return;
    setLoading(true);
    try {
      const { data } = await api.get("/imports", {
        params: { email: user.email },
      });
      setItems(data);
      setErr("");
    } catch (e) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.email]);

  const handleRemove = async (id) => {
    const prev = items;
    setItems((cur) => cur.filter((i) => i._id !== id));
    try {
      await api.delete(`/imports/${id}`);
      toast.success("Import removed");
    } catch (e) {
      setItems(prev);
      toast.error(e.message || "Could not remove");
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="container-page py-12">
      <h1 className="section-title">My Imports</h1>
      <p className="section-sub">
        Everything you've imported through the platform.
      </p>

      {err && <p className="text-rose-500 mt-4">{err}</p>}

      {items.length === 0 ? (
        <div className="card p-10 mt-8 text-center">
          <p className="text-lg font-medium">
            You haven't imported anything yet.
          </p>
          <p className="text-slate-500 mt-1">
            Browse the catalog and click "Import Now" on a product to get
            started.
          </p>
          <Link to="/all-products" className="btn-primary mt-5 inline-flex">
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((imp) => {
            const p = imp.productSnapshot || {};
            return (
              <div key={imp._id} className="card overflow-hidden flex flex-col">
                <div className="aspect-[4/3] bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://placehold.co/600x450/eef7ff/1640a1?text=Product";
                    }}
                  />
                </div>
                <div className="p-5 flex flex-col flex-1 gap-3">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display font-semibold text-lg leading-tight line-clamp-2">
                      {p.name}
                    </h3>
                    <span className="text-brand-600 dark:text-brand-300 font-bold whitespace-nowrap">
                      ${Number(p.price || 0).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-500 dark:text-slate-400">
                    <span className="inline-flex items-center gap-1">
                      <FiMapPin /> {p.originCountry}
                    </span>
                    <span className="inline-flex items-center gap-1 text-amber-500">
                      <FiStar /> {Number(p.rating || 0).toFixed(1)}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <FiPackage /> Imported: {imp.importedQuantity}
                    </span>
                  </div>
                  <div className="mt-auto pt-2 flex gap-2">
                    <Link
                      to={`/products/${imp.productId}`}
                      className="btn-primary flex-1 !py-2 text-sm"
                    >
                      See Details
                    </Link>
                    <button
                      onClick={() => handleRemove(imp._id)}
                      className="btn-danger !py-2 !px-3 text-sm"
                      aria-label="Remove import"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
