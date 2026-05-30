export default function Loader({ label = "Loading…" }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-3">
      <div className="h-10 w-10 rounded-full border-4 border-brand-200 border-t-brand-600 animate-spin" />
      <p className="text-slate-500 dark:text-slate-400 text-sm">{label}</p>
    </div>
  );
}
