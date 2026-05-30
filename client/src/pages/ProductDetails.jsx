import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  FiStar,
  FiMapPin,
  FiPackage,
  FiUser,
  FiShoppingBag,
} from "react-icons/fi";
import api from "../api/axios.js";
import useAuth from "../hooks/useAuth.js";
import useTitle from "../hooks/useTitle.js";
import Loader from "../components/Loader.jsx";
import Modal from "../components/Modal.jsx";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [open, setOpen] = useState(false);
  const [qty, setQty] = useState(1);
  const [submitting, setSubmitting] = useState(false);

  useTitle(product ? product.name : "Product Details");

  const load = async () => {
    setLoading(true);
    try {
      const { data } = await api.get(`/products/${id}`);
      setProduct(data);
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
  }, [id]);

  const handleImport = async (e) => {
    e.preventDefault();
    if (!product) return;
    const n = Number(qty);
    if (!Number.isFinite(n) || n < 1)
      return toast.error("Enter a valid quantity");
    if (n > product.quantity)
      return toast.error("Quantity exceeds available stock");

    setSubmitting(true);
    try {
      await api.post("/imports", {
        productId: product._id,
        importerEmail: user?.email,
        importerName: user?.displayName || "",
        importedQuantity: n,
      });
      toast.success("Imported successfully");
      setOpen(false);
      setQty(1);
      await load();
      navigate("/my-imports");
    } catch (e2) {
      toast.error(e2.message || "Import failed");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Loader />;
  if (err)
    return (
      <div className="container-page py-12">
        <p className="text-rose-500">{err}</p>
      </div>
    );
  if (!product) return null;

  const overLimit = Number(qty) > product.quantity;
  const tooLow = Number(qty) < 1;
  const submitDisabled =
    submitting || overLimit || tooLow || product.quantity === 0;

  return (
    <div className="container-page py-12">
      <div className="grid lg:grid-cols-2 gap-10">
        <div className="card overflow-hidden">
          <div className="aspect-square bg-slate-100 dark:bg-slate-800">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover"
              onError={(e) => {
                e.currentTarget.src =
                  "https://placehold.co/800x800/eef7ff/1640a1?text=Product";
              }}
            />
          </div>
        </div>

        <div>
          <span className="inline-flex px-3 py-1 text-xs font-medium rounded-full bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-300">
            {product.category || "General"}
          </span>
          <h1 className="mt-4 font-display text-3xl sm:text-4xl font-bold">
            {product.name}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
            <span className="inline-flex items-center gap-1">
              <FiMapPin /> {product.originCountry}
            </span>
            <span className="inline-flex items-center gap-1 text-amber-500">
              <FiStar /> {Number(product.rating).toFixed(1)} / 5
            </span>
            <span className="inline-flex items-center gap-1">
              <FiPackage /> {product.quantity} in stock
            </span>
            <span className="inline-flex items-center gap-1">
              <FiUser /> {product.exporterName || product.exporterEmail}
            </span>
          </div>
          <p className="mt-6 text-3xl font-display font-bold text-brand-600 dark:text-brand-300">
            ${Number(product.price).toFixed(2)}
          </p>
          <p className="mt-6 leading-relaxed text-slate-600 dark:text-slate-300">
            {product.description || "No description provided."}
          </p>

          <button
            onClick={() => setOpen(true)}
            disabled={product.quantity === 0}
            className="btn-primary mt-8 px-6 py-3"
          >
            <FiShoppingBag />{" "}
            {product.quantity === 0 ? "Out of stock" : "Import Now"}
          </button>
        </div>
      </div>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={`Import "${product.name}"`}
      >
        <form onSubmit={handleImport} className="space-y-4">
          <div>
            <label className="text-sm font-medium">Quantity</label>
            <input
              type="number"
              min="1"
              max={product.quantity}
              value={qty}
              onChange={(e) => setQty(e.target.value)}
              className="input mt-1"
              autoFocus
            />
            <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Available:{" "}
              <span className="font-semibold">{product.quantity}</span>
            </div>
            {overLimit && (
              <p className="mt-2 text-sm text-rose-500">
                Quantity cannot exceed available stock ({product.quantity}).
              </p>
            )}
            {tooLow && qty !== "" && (
              <p className="mt-2 text-sm text-rose-500">
                Quantity must be at least 1.
              </p>
            )}
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="btn-outline"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitDisabled}
              className="btn-primary"
            >
              {submitting ? "Importing…" : "Submit"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
