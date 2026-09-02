import { Loader2 } from "lucide-react";

export default function AdminLoading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center bg-slate-50 rounded-xl m-4 border border-slate-200">
      <div className="relative flex items-center justify-center mb-4">
        <div className="w-14 h-14 rounded-full border-4 border-amber-200 border-t-amber-600 animate-spin" />
        <Loader2 className="w-7 h-7 text-amber-600 animate-spin absolute" />
      </div>
      <h3 className="text-base font-semibold text-slate-800 tracking-wide">
        Loading Admin Dashboard...
      </h3>
      <p className="text-xs text-slate-500 mt-1">
        Fetching administration data and records.
      </p>
    </div>
  );
}
