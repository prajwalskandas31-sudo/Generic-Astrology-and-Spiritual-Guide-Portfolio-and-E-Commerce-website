"use client";

import { useState, useEffect } from "react";
import { FAQItem } from "@/types";
import { getFAQ, fetchAPI } from "@/lib/api-client";
import { HelpCircle, Plus, Trash2, Loader2 } from "lucide-react";

export default function AdminFAQPage() {
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [category, setCategory] = useState("General");

  useEffect(() => {
    loadFAQ();
  }, []);

  const loadFAQ = async () => {
    setIsLoading(true);
    try {
      const data = await getFAQ();
      setFaqs(data);
    } catch (_) {
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetchAPI("/faq", {
        method: "POST",
        headers: { Authorization: "Bearer mock-admin-token" },
        body: JSON.stringify({
          question,
          answer,
          category,
          display_order: 0,
        }),
      });
      setQuestion("");
      setAnswer("");
      setIsEditing(false);
      loadFAQ();
    } catch (err: any) {
      alert("Error saving FAQ: " + err.message);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this FAQ?")) return;
    try {
      await fetchAPI(`/faq/${id}`, {
        method: "DELETE",
        headers: { Authorization: "Bearer mock-admin-token" },
      });
      loadFAQ();
    } catch (err: any) {
      alert("Error deleting FAQ: " + err.message);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-bold text-slate-900 flex items-center gap-2">
            <HelpCircle className="w-7 h-7 text-amber-700" />
            <span>Manage FAQ Items</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Add or remove questions &amp; answers displayed on the public FAQ page.
          </p>
        </div>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="px-5 py-2.5 bg-amber-700 hover:bg-amber-800 text-white font-semibold text-xs rounded-xl transition-colors flex items-center gap-2 shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Add FAQ Item</span>
          </button>
        )}
      </div>

      {isEditing && (
        <form onSubmit={handleSave} className="p-6 bg-white rounded-2xl border border-slate-200 shadow-md space-y-4">
          <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2">Add FAQ Question</h2>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Category</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Question *</label>
            <input
              type="text"
              required
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Answer *</label>
            <textarea
              rows={4}
              required
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-sm"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 border border-slate-300 rounded-xl text-xs font-medium text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-amber-700 hover:bg-amber-800 text-white font-semibold text-xs rounded-xl transition-colors shadow-xs"
            >
              Save FAQ
            </button>
          </div>
        </form>
      )}

      {isLoading ? (
        <div className="py-16 text-center text-slate-500 flex items-center justify-center gap-2">
          <Loader2 className="w-5 h-5 animate-spin text-amber-700" />
          <span>Loading FAQ items...</span>
        </div>
      ) : (
        <div className="space-y-4">
          {faqs.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex items-start justify-between">
              <div className="space-y-2">
                <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 font-semibold text-[10px]">
                  {item.category || "General"}
                </span>
                <h3 className="font-serif font-bold text-base text-slate-900">Q: {item.question}</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-sans">A: {item.answer}</p>
              </div>
              <button onClick={() => handleDelete(item.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg shrink-0">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
