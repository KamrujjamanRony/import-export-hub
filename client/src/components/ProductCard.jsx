import { Link } from "react-router-dom";
import { FiStar, FiMapPin, FiPackage } from "react-icons/fi";

export default function ProductCard({ product, actions }) {
  const { _id, name, image, price, originCountry, rating, quantity } = product;
  return (
    <div className="card overflow-hidden flex flex-col group hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className="aspect-[4/3] overflow-hidden bg-slate-100 dark:bg-slate-800">
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.currentTarget.src =
              "https://placehold.co/600x450/eef7ff/1640a1?text=Product";
          }}
        />
      </div>
      <div className="p-5 flex flex-col flex-1 gap-3">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display font-semibold text-lg leading-tight line-clamp-2">
            {name}
          </h3>
          <span className="text-brand-600 dark:text-brand-300 font-bold whitespace-nowrap">
            ${Number(price).toFixed(2)}
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-500 dark:text-slate-400">
          <span className="inline-flex items-center gap-1">
            <FiMapPin /> {originCountry}
          </span>
          <span className="inline-flex items-center gap-1 text-amber-500">
            <FiStar /> {Number(rating).toFixed(1)}
          </span>
          <span className="inline-flex items-center gap-1">
            <FiPackage /> {quantity} in stock
          </span>
        </div>
        <div className="mt-auto pt-2 flex gap-2">
          <Link
            to={`/products/${_id}`}
            className="btn-primary flex-1 !py-2 text-sm"
          >
            See Details
          </Link>
          {actions}
        </div>
      </div>
    </div>
  );
}
