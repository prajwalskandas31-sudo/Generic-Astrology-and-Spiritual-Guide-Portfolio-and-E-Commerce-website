import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";

export interface LegalLayoutProps {
  title: string;
  children: React.ReactNode;
}

export default function LegalLayout({ title, children }: LegalLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between font-sans">
      <header className="bg-white border-b border-slate-200 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-amber-700 text-white flex items-center justify-center font-serif font-bold text-lg">
              <ShieldCheck className="w-5 h-5 text-amber-200" />
            </div>
            <span className="font-serif font-bold text-lg text-slate-900">
              Veda Brahma Shri Pradeep Nadig
            </span>
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 hover:bg-amber-100 text-amber-900 font-medium text-sm rounded-xl transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>
      </header>

      <main className="grow max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
        <article className="bg-white rounded-2xl p-6 sm:p-10 shadow-xs border border-slate-200 space-y-6">
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 border-b border-slate-100 pb-4">
            {title}
          </h1>
          <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-4">
            {children}
          </div>

          <div className="pt-8 border-t border-slate-100 flex justify-start">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-amber-700 hover:bg-amber-800 text-white font-medium text-sm rounded-xl shadow-xs transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
          </div>
        </article>
      </main>

      <footer className="bg-slate-900 text-slate-400 py-6 text-center text-xs border-t border-slate-800">
        <p>&copy; {new Date().getFullYear()} Veda Brahma Shri Pradeep Nadig. All rights reserved.</p>
      </footer>
    </div>
  );
}
