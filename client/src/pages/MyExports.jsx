import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import {
  FiTrash2,
  FiEdit2,
  FiDownload,
  FiStar,
  FiMapPin,
  FiPackage,
} from "react-icons/fi";
import api from "../api/axios.js";
import useAuth from "../hooks/useAuth.js";
import useTitle from "../hooks/useTitle.js";
import Loader from "../components/Loader.jsx";
import Modal from "../components/Modal.jsx";

const EMPTY = {
  name: "",
  image: "",
  price: "",
  originCountry: "",
  rating: "",
  quantity: "",
  description: "",
  category: "",
};

export default function MyExports() {
  useTitle("My Exports");
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    if (!user?.email) return;
    setLoading(true);
    try {
      const { data } = await api.get("/products", {
        params: { exporterEmail: user.email },
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

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product? This cannot be undone.")) return;
    const prev = items;
    setItems((cur) => cur.filter((p) => p._id !== id));
    try {
      await api.delete(`/products/${id}`);
      toast.success("Product deleted");
    } catch (e) {
      setItems(prev);
      toast.error(e.message || "Could not delete");
    }
  };

  const startEdit = (item) => {
    setEditing(item);
    setForm({
      name: item.name,
      image: item.image,
      price: item.price,
      originCountry: item.originCountry,
      rating: item.rating,
      quantity: item.quantity,
      description: item.description || "",
      category: item.category || "",
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        ...form,
        price: Number(form.price),
        rating: Number(form.rating),
        quantity: Number(form.quantity),
      };
      const { data } = await api.patch(`/products/${editing._id}`, payload);
      setItems((cur) => cur.map((p) => (p._id === data._id ? data : p)));
      toast.success("Product updated");
      setEditing(null);
    } catch (e2) {
      toast.error(e2.message || "Could not update");
    } finally {
      setSaving(false);
    }
  };

  const downloadCsv = () => {
    if (items.length === 0) return toast.error("Nothing to export");
    const headers = [
      "Name",
      "Price",
      "OriginCountry",
      "Rating",
      "Quantity",
      "Category",
      "Image",
    ];
    const rows = items.map((p) =>
      [
        p.name,
        p.price,
        p.originCountry,
        p.rating,
        p.quantity,
        p.category || "",
        p.image,
      ]
        .map((v) => `"${String(v ?? "").replace(/"/g, '""')}"`)
        .join(","),
    );
    const csv = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `my-exports-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (loading) return <Loader />;

  return (
    <div className="container-page py-12">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="section-title">My Exports</h1>
          <p className="section-sub">Products you have listed for export.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={downloadCsv} className="btn-outline">
            <FiDownload /> Download CSV
          </button>
          <Link to="/add-export" className="btn-primary">
            + Add Export
          </Link>
        </div>
      </div>

      {err && <p className="text-rose-500 mt-4">{err}</p>}

      {items.length === 0 ? (
        <div className="card p-10 mt-8 text-center">
          <p className="text-lg font-medium">
            You haven't added any exports yet.
          </p>
          <Link to="/add-export" className="btn-primary mt-5 inline-flex">
            Add your first product
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((p) => (
            <div key={p._id} className="card overflow-hidden flex flex-col">
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
                    ${Number(p.price).toFixed(2)}
                  </span>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-500 dark:text-slate-400">
                  <span className="inline-flex items-center gap-1">
                    <FiMapPin /> {p.originCountry}
                  </span>
                  <span className="inline-flex items-center gap-1 text-amber-500">
                    <FiStar /> {Number(p.rating).toFixed(1)}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <FiPackage /> {p.quantity} in stock
                  </span>
                </div>
                <div className="mt-auto pt-2 flex gap-2">
                  <button
                    onClick={() => startEdit(p)}
                    className="btn-outline flex-1 !py-2 text-sm"
                  >
                    <FiEdit2 /> Update
                  </button>
                  <button
                    onClick={() => handleDelete(p._id)}
                    className="btn-danger !py-2 !px-3 text-sm"
                    aria-label="Delete"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal
        open={!!editing}
        onClose={() => setEditing(null)}
        title="Update Product"
      >
        <form onSubmit={handleUpdate} className="space-y-3">
          <Field label="Product Name">
            <input
              className="input"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </Field>
          <Field label="Image URL">
            <input
              className="input"
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
              required
            />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Price ($)">
              <input
                type="number"
                min="0"
                step="0.01"
                className="input"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                required
              />
            </Field>
            <Field label="Quantity">
              <input
                type="number"
                min="0"
                className="input"
                value={form.quantity}
                onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                required
              />
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Origin Country">
              <input
                className="input"
                value={form.originCountry}
                onChange={(e) =>
                  setForm({ ...form, originCountry: e.target.value })
                }
                required
              />
            </Field>
            <Field label="Rating (0–5)">
              <input
                type="number"
                min="0"
                max="5"
                step="0.1"
                className="input"
                value={form.rating}
                onChange={(e) => setForm({ ...form, rating: e.target.value })}
                required
              />
            </Field>
          </div>
          <Field label="Category">
            <input
              className="input"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            />
          </Field>
          <Field label="Description">
            <textarea
              rows={3}
              className="input"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
          </Field>
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              className="btn-outline"
              onClick={() => setEditing(null)}
            >
              Cancel
            </button>
            <button type="submit" disabled={saving} className="btn-primary">
              {saving ? "Saving…" : "Submit"}
            </button>
          </div>
        </form>
      </Modal>
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
