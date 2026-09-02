import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="relative flex items-center justify-center mb-4">
        <div className="w-16 h-16 rounded-full border-4 border-amber-200 border-t-amber-600 animate-spin" />
        <Loader2 className="w-8 h-8 text-amber-600 animate-spin absolute" />
      </div>
      <h3 className="text-lg font-semibold text-slate-800 tracking-wide">
        Loading...
      </h3>
      <p className="text-sm text-slate-500 mt-1 max-w-xs">
        Please wait while we fetch the latest information.
      </p>
    </div>
  );
}
