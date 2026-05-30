import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FiPackage } from "react-icons/fi";
import api from "../api/axios.js";
import useAuth from "../hooks/useAuth.js";
import useTitle from "../hooks/useTitle.js";

const INIT = {
  name: "",
  image: "",
  price: "",
  originCountry: "",
  rating: "",
  quantity: "",
  category: "",
  description: "",
};

export default function AddExport() {
  useTitle("Add Export");
  const { user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState(INIT);
  const [saving, setSaving] = useState(false);

  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const price = Number(form.price);
    const rating = Number(form.rating);
    const quantity = Number(form.quantity);

    if (!form.name || !form.image || !form.originCountry) {
      return toast.error("Please fill in all required fields.");
    }
    if (!Number.isFinite(price) || price < 0)
      return toast.error("Price must be a positive number.");
    if (!Number.isFinite(rating) || rating < 0 || rating > 5)
      return toast.error("Rating must be between 0 and 5.");
    if (!Number.isInteger(quantity) || quantity < 0)
      return toast.error("Quantity must be a non-negative integer.");

    setSaving(true);
    try {
      await api.post("/products", {
        ...form,
        price,
        rating,
        quantity,
        exporterEmail: user?.email,
        exporterName: user?.displayName || "",
      });
      toast.success("Product added to All Products");
      setForm(INIT);
      navigate("/my-exports");
    } catch (err) {
      toast.error(err.message || "Could not add product");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="container-page py-12">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-2">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-300">
            <FiPackage size={20} />
          </span>
          <h1 className="section-title">Add Export / Product</h1>
        </div>
        <p className="section-sub">
          List a new product on the platform. It will appear in All Products.
        </p>

        <form
          onSubmit={handleSubmit}
          className="card p-6 sm:p-8 mt-8 space-y-4"
        >
          <Field label="Product Name *">
            <input
              className="input"
              value={form.name}
              onChange={update("name")}
              required
            />
          </Field>
          <Field label="Product Image (URL) *">
            <input
              type="url"
              className="input"
              value={form.image}
              onChange={update("image")}
              required
              placeholder="https://..."
            />
          </Field>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Price ($) *">
              <input
                type="number"
                min="0"
                step="0.01"
                className="input"
                value={form.price}
                onChange={update("price")}
                required
              />
            </Field>
            <Field label="Available Quantity *">
              <input
                type="number"
                min="0"
                className="input"
                value={form.quantity}
                onChange={update("quantity")}
                required
              />
            </Field>
            <Field label="Origin Country *">
              <input
                className="input"
                value={form.originCountry}
                onChange={update("originCountry")}
                required
              />
            </Field>
            <Field label="Rating (0 – 5) *">
              <input
                type="number"
                min="0"
                max="5"
                step="0.1"
                className="input"
                value={form.rating}
                onChange={update("rating")}
                required
              />
            </Field>
          </div>
          <Field label="Category">
            <input
              className="input"
              value={form.category}
              onChange={update("category")}
              placeholder="e.g. Beverages, Apparel"
            />
          </Field>
          <Field label="Description">
            <textarea
              rows={4}
              className="input"
              value={form.description}
              onChange={update("description")}
            />
          </Field>
          <div className="pt-2">
            <button
              type="submit"
              disabled={saving}
              className="btn-primary w-full sm:w-auto px-8 py-3"
            >
              {saving ? "Saving…" : "Add Export / Product"}
            </button>
          </div>
        </form>
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
