"use client";

import { useState, useEffect } from "react";
import { Offering } from "@/types";
import { getOfferings, fetchAPI } from "@/lib/api-client";
import MediaLibraryModal from "@/components/MediaLibraryModal";
import {
  BookOpen, Plus, Trash2, Edit3, Loader2, FolderOpen, X,
  Search, Sparkles, CheckCircle2, ChevronDown, MessageSquare,
} from "lucide-react";

interface FAQEntry {
  question: string;
  answer: string;
}

const EMPTY_FAQ: FAQEntry = { question: "", answer: "" };

export default function AdminOfferingsPage() {
  const [offerings, setOfferings] = useState<Offering[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);

  // Core fields
  const [type, setType] = useState<"Service" | "Consultation" | "Pooja">("Service");
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [fullDesc, setFullDesc] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [status, setStatus] = useState("Published");

  // Guidance card fields
  const [whoBenefits, setWhoBenefits] = useState("");
  const [whoShouldAttend, setWhoShouldAttend] = useState("");
  const [whenPerformed, setWhenPerformed] = useState("");
  const [wherePerformed, setWherePerformed] = useState("");

  // Ritual procedure
  const [vidhiDetails, setVidhiDetails] = useState("");

  // Per-offering FAQ
  const [faqItems, setFaqItems] = useState<FAQEntry[]>([{ ...EMPTY_FAQ }]);

  // SEO
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDesc, setSeoDesc] = useState("");

  useEffect(() => {
    loadOfferings();
  }, []);

  const loadOfferings = async () => {
    setIsLoading(true);
    try {
      const data = await getOfferings(undefined, "all");
      setOfferings(data);
    } catch (_) {
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const cleanFaq = faqItems.filter((f) => f.question.trim() && f.answer.trim());
    const payload = {
      type,
      title,
      slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
      short_description: shortDesc,
      full_description: fullDesc,
      images: imageUrl ? [imageUrl] : [],
      display_order: 0,
      status,
      who_benefits: whoBenefits,
      who_should_attend: whoShouldAttend,
      when_performed: whenPerformed,
      where_performed: wherePerformed,
      vidhi_details: vidhiDetails,
      faq: cleanFaq,
      seo_title: seoTitle || title,
      seo_description: seoDesc || shortDesc,
    };

    try {
      if (editingId) {
        await fetchAPI(`/offerings/${editingId}`, {
          method: "PUT",
          headers: { Authorization: "Bearer mock-admin-token" },
          body: JSON.stringify(payload),
        });
      } else {
        await fetchAPI("/offerings", {
          method: "POST",
          headers: { Authorization: "Bearer mock-admin-token" },
          body: JSON.stringify(payload),
        });
      }
      resetForm();
      loadOfferings();
    } catch (err: any) {
      alert("Error saving offering: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (item: any) => {
    setEditingId(item.id);
    setType(item.type);
    setTitle(item.title);
    setSlug(item.slug);
    setShortDesc(item.short_description || "");
    setFullDesc(item.full_description || "");
    setImageUrl(item.images?.[0] || "");
    setStatus(item.status);
    setWhoBenefits(item.who_benefits || "");
    setWhoShouldAttend(item.who_should_attend || "");
    setWhenPerformed(item.when_performed || "");
    setWherePerformed(item.where_performed || "");
    setVidhiDetails(item.vidhi_details || "");
    setFaqItems(item.faq && item.faq.length > 0 ? item.faq : [{ ...EMPTY_FAQ }]);
    setSeoTitle(item.seo_title || "");
    setSeoDesc(item.seo_description || "");
    setIsEditing(true);
    // Scroll form into view
    setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 50);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this offering?")) return;
    setDeletingId(id);
    try {
      await fetchAPI(`/offerings/${id}`, {
        method: "DELETE",
        headers: { Authorization: "Bearer mock-admin-token" },
      });
      loadOfferings();
    } catch (err: any) {
      alert("Error deleting offering: " + err.message);
    } finally {
      setDeletingId(null);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setType("Service");
    setTitle("");
    setSlug("");
    setShortDesc("");
    setFullDesc("");
    setImageUrl("");
    setStatus("Published");
    setWhoBenefits("");
    setWhoShouldAttend("");
    setWhenPerformed("");
    setWherePerformed("");
    setVidhiDetails("");
    setFaqItems([{ ...EMPTY_FAQ }]);
    setSeoTitle("");
    setSeoDesc("");
    setIsEditing(false);
  };

  const addFaqItem = () => setFaqItems((prev) => [...prev, { ...EMPTY_FAQ }]);
  const removeFaqItem = (idx: number) => setFaqItems((prev) => prev.filter((_, i) => i !== idx));
  const updateFaqItem = (idx: number, field: keyof FAQEntry, value: string) => {
    setFaqItems((prev) => prev.map((item, i) => i === idx ? { ...item, [field]: value } : item));
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-bold text-slate-900 flex items-center gap-2">
            <BookOpen className="w-7 h-7 text-amber-700" />
            <span>Manage Services &amp; Consultations</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Create, update, or unpublish offerings. All content displayed on the public service page is editable here.
          </p>
        </div>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="px-5 py-2.5 bg-amber-700 hover:bg-amber-800 text-white font-semibold text-xs rounded-xl transition-colors flex items-center gap-2 shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Offering</span>
          </button>
        )}
      </div>

      {/* Editor Form */}
      {isEditing && (
        <form onSubmit={handleSave} className="p-6 bg-white rounded-2xl border border-slate-200 shadow-md space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-base font-bold text-slate-900">
              {editingId ? "Edit Offering" : "Create New Offering"}
            </h2>
            <button type="button" onClick={resetForm} className="p-1 text-slate-400 hover:text-slate-700 rounded-lg">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* ── Section 1: Core Identity ── */}
          <div className="space-y-4">
            <h3 className="text-[11px] font-bold uppercase tracking-widest text-amber-800">Core Details</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Type *</label>
                <select
                  value={type}
                  onChange={(e: any) => setType(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-sm bg-white"
                >
                  <option value="Service">Service (Ritual / Homa)</option>
                  <option value="Pooja">Pooja (Sacred Pooja / Parayana)</option>
                  <option value="Consultation">Consultation (Astrology)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Status *</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-sm bg-white"
                >
                  <option value="Published">Published (Live &amp; Visible)</option>
                  <option value="Draft">Draft (Hidden from Public)</option>
                  <option value="Archived">Archived</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Title *</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Slug (SEO Friendly URL) *</label>
              <input
                type="text"
                required
                placeholder="e.g. ganapathi-homa"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-sm font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Cover Image URL</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="https://... or select from Media Library"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-sm"
                />
                <button
                  type="button"
                  onClick={() => setIsMediaModalOpen(true)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-xl border border-slate-300 flex items-center gap-1.5 shrink-0"
                >
                  <FolderOpen className="w-4 h-4 text-amber-700" />
                  <span>Media Library</span>
                </button>
              </div>
              {imageUrl && (
                <div className="mt-2 rounded-xl overflow-hidden border border-slate-200 h-28 bg-slate-50">
                  <img src={imageUrl} alt="Cover Preview" className="w-full h-full object-contain" />
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Short Description</label>
              <textarea
                rows={2}
                value={shortDesc}
                onChange={(e) => setShortDesc(e.target.value)}
                className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Full Description</label>
              <textarea
                rows={4}
                value={fullDesc}
                onChange={(e) => setFullDesc(e.target.value)}
                className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-sm"
              />
            </div>
          </div>

          {/* ── Section 2: Guidance Cards ── */}
          <div className="p-5 bg-amber-50/60 rounded-2xl border border-amber-200 space-y-4">
            <h3 className="text-[11px] font-bold uppercase tracking-widest text-amber-900 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              Guidance Cards (displayed on public service page)
            </h3>
            <p className="text-[11px] text-slate-500 -mt-2">These fill the 4 info cards shown on the offering detail page. Leave blank to show default text.</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-600" /> Who Does It Benefit?
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. Removes all unseen obstacles, grants clarity of thought..."
                  value={whoBenefits}
                  onChange={(e) => setWhoBenefits(e.target.value)}
                  className="w-full px-3.5 py-2 border border-amber-200 bg-white rounded-xl text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-amber-600" /> Who Should Get It Done?
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. Entire family, business partners, house-owners..."
                  value={whoShouldAttend}
                  onChange={(e) => setWhoShouldAttend(e.target.value)}
                  className="w-full px-3.5 py-2 border border-amber-200 bg-white rounded-xl text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1 flex items-center gap-1">
                  <ChevronDown className="w-3 h-3 text-amber-600 -rotate-90" /> When Is It Performed?
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. Ideal during housewarmings (Griha Pravesh), before launching a business..."
                  value={whenPerformed}
                  onChange={(e) => setWhenPerformed(e.target.value)}
                  className="w-full px-3.5 py-2 border border-amber-200 bg-white rounded-xl text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1 flex items-center gap-1">
                  <MessageSquare className="w-3 h-3 text-amber-600" /> Where Is It Conducted?
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. Conducted at homes, newly constructed houses, business offices..."
                  value={wherePerformed}
                  onChange={(e) => setWherePerformed(e.target.value)}
                  className="w-full px-3.5 py-2 border border-amber-200 bg-white rounded-xl text-sm"
                />
              </div>
            </div>
          </div>

          {/* ── Section 3: Vidhi & Ritual Procedure ── */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              Vedic Vidhi &amp; Ritual Procedure
            </label>
            <p className="text-[11px] text-slate-400">Detailed description of the ritual procedure, materials, and steps. Displayed as a full section below the guidance cards.</p>
            <textarea
              rows={5}
              placeholder="e.g. Includes Mahaganapathi Avahana, Athervashirsha Trishati Chanting, Modaka, Ashta Dravya, Sugandhi Dravya & Ghee 108 Ahuti offerings, Poornahuti, and Modaka Prasadam..."
              value={vidhiDetails}
              onChange={(e) => setVidhiDetails(e.target.value)}
              className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm"
            />
          </div>

          {/* ── Section 4: Per-Offering FAQ ── */}
          <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-[11px] font-bold uppercase tracking-widest text-slate-700">
                  Offering-Specific FAQ
                </h3>
                <p className="text-[11px] text-slate-400 mt-0.5">Questions &amp; answers shown at the bottom of this offering's page.</p>
              </div>
              <button
                type="button"
                onClick={addFaqItem}
                className="px-3 py-1.5 bg-amber-700 hover:bg-amber-800 text-white text-xs font-semibold rounded-lg flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Q&amp;A
              </button>
            </div>

            <div className="space-y-3">
              {faqItems.map((item, idx) => (
                <div key={idx} className="p-4 bg-white rounded-xl border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-600">FAQ #{idx + 1}</span>
                    {faqItems.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeFaqItem(idx)}
                        className="text-[11px] text-red-600 hover:text-red-800 font-semibold flex items-center gap-1"
                      >
                        <Trash2 className="w-3 h-3" />
                        Remove
                      </button>
                    )}
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-slate-600 mb-1">Question</label>
                    <input
                      type="text"
                      placeholder="e.g. How long does this ritual take?"
                      value={item.question}
                      onChange={(e) => updateFaqItem(idx, "question", e.target.value)}
                      className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-slate-600 mb-1">Answer</label>
                    <textarea
                      rows={2}
                      placeholder="Provide a clear, helpful answer..."
                      value={item.answer}
                      onChange={(e) => updateFaqItem(idx, "answer", e.target.value)}
                      className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Section 5: SEO ── */}
          <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
            <h3 className="text-[11px] font-bold uppercase tracking-widest text-slate-700 flex items-center gap-1.5">
              <Search className="w-3.5 h-3.5 text-amber-700" />
              SEO Settings
            </h3>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">
                SEO Title <span className="text-slate-400 font-normal">(leave blank to use offering title)</span>
              </label>
              <input
                type="text"
                placeholder={title || "e.g. Book Ganapathi Homa in Bangalore | Pradeep Nadig"}
                value={seoTitle}
                onChange={(e) => setSeoTitle(e.target.value)}
                className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-sm bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">
                Meta Description <span className="text-slate-400 font-normal">(leave blank to use short description)</span>
              </label>
              <textarea
                rows={2}
                placeholder="A concise description for search engines (150–160 chars recommended)..."
                value={seoDesc}
                onChange={(e) => setSeoDesc(e.target.value)}
                className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-sm bg-white"
              />
            </div>
          </div>

          {/* ── Footer Buttons ── */}
          <div className="flex justify-end gap-3 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={resetForm}
              className="px-4 py-2 border border-slate-300 rounded-xl text-xs font-medium text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-amber-700 hover:bg-amber-800 disabled:opacity-50 text-white font-semibold text-xs rounded-xl transition-colors shadow-xs flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <span>{editingId ? "Update Offering" : "Save Offering"}</span>
              )}
            </button>
          </div>
        </form>
      )}

      {/* List Table */}
      {isLoading ? (
        <div className="py-16 text-center text-slate-500 flex items-center justify-center gap-2">
          <Loader2 className="w-5 h-5 animate-spin text-amber-700" />
          <span>Loading offerings...</span>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider">
                <th className="p-4">Type</th>
                <th className="p-4">Title</th>
                <th className="p-4">Slug</th>
                <th className="p-4">Guidance</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {offerings.map((item: any) => {
                const hasGuidance = !!(item.who_benefits || item.vidhi_details);
                const hasFaq = item.faq && item.faq.length > 0;
                return (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-4 font-semibold text-amber-800">{item.type}</td>
                    <td className="p-4">
                      <div className="font-bold text-slate-900">{item.title}</div>
                      {item.images?.[0] && (
                        <img src={item.images[0]} alt="" className="mt-1 w-8 h-8 rounded-lg object-cover border border-slate-200" />
                      )}
                    </td>
                    <td className="p-4 font-mono text-slate-500">
                      /{item.type.toLowerCase() === "service" || item.type.toLowerCase() === "pooja" ? "services" : "consultations"}/{item.slug}
                    </td>
                    <td className="p-4">
                      <div className="flex gap-1.5 flex-wrap">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${hasGuidance ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-500"}`}>
                          {hasGuidance ? "✓ Cards" : "No Cards"}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${hasFaq ? "bg-blue-100 text-blue-800" : "bg-slate-100 text-slate-500"}`}>
                          {hasFaq ? `✓ ${item.faq.length} FAQ` : "No FAQ"}
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full font-semibold text-[10px] ${
                        item.status === "Published" ? "bg-emerald-100 text-emerald-800"
                        : item.status === "Draft" ? "bg-amber-100 text-amber-800"
                        : "bg-slate-100 text-slate-600"
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => handleEdit(item)}
                        className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                        title="Edit this offering"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        disabled={deletingId === item.id}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg disabled:opacity-50 transition-colors"
                      >
                        {deletingId === item.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Media Library Modal */}
      <MediaLibraryModal
        isOpen={isMediaModalOpen}
        onClose={() => setIsMediaModalOpen(false)}
        onSelectMedia={(url) => setImageUrl(url)}
      />
    </div>
  );
}
