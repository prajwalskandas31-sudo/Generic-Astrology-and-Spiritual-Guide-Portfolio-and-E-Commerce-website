"use client";

import { useState, useEffect } from "react";
import { Offering } from "@/types";
import { getOfferings, fetchAPI } from "@/lib/api-client";
import MediaLibraryModal from "@/components/MediaLibraryModal";
import { BookOpen, Plus, Trash2, Edit3, Loader2, FolderOpen } from "lucide-react";

export default function AdminOfferingsPage() {
  const [offerings, setOfferings] = useState<Offering[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);

  // Form fields
  const [type, setType] = useState<"Service" | "Consultation" | "Pooja">("Service");
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [fullDesc, setFullDesc] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [status, setStatus] = useState("Published");
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDesc, setSeoDesc] = useState("");

  useEffect(() => {
    loadOfferings();
  }, []);

  const loadOfferings = async () => {
    setIsLoading(true);
    try {
      const data = await getOfferings();
      setOfferings(data);
    } catch (_) {
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      type,
      title,
      slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
      short_description: shortDesc,
      full_description: fullDesc,
      images: imageUrl ? [imageUrl] : [],
      display_order: 0,
      status,
      seo_title: seoTitle || title,
      seo_description: seoDesc || shortDesc,
      faq: [],
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
    }
  };

  const handleEdit = (item: Offering) => {
    setEditingId(item.id);
    setType(item.type);
    setTitle(item.title);
    setSlug(item.slug);
    setShortDesc(item.short_description || "");
    setFullDesc(item.full_description || "");
    setImageUrl(item.images[0] || "");
    setStatus(item.status);
    setSeoTitle(item.seo_title || "");
    setSeoDesc(item.seo_description || "");
    setIsEditing(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this offering?")) return;
    try {
      await fetchAPI(`/offerings/${id}`, {
        method: "DELETE",
        headers: { Authorization: "Bearer mock-admin-token" },
      });
      loadOfferings();
    } catch (err: any) {
      alert("Error deleting offering: " + err.message);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setTitle("");
    setSlug("");
    setShortDesc("");
    setFullDesc("");
    setImageUrl("");
    setSeoTitle("");
    setSeoDesc("");
    setIsEditing(false);
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
            Create, update, or unpublish offerings. Select images directly from your Media Library.
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

      {/* Editor Modal / Form */}
      {isEditing && (
        <form onSubmit={handleSave} className="p-6 bg-white rounded-2xl border border-slate-200 shadow-md space-y-4">
          <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2">
            {editingId ? "Edit Offering" : "Create New Offering"}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Type *</label>
              <select
                value={type}
                onChange={(e: any) => setType(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm bg-white"
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
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm bg-white"
              >
                <option value="Published">Published</option>
                <option value="Draft">Draft</option>
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
                placeholder="https://..."
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

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={resetForm}
              className="px-4 py-2 border border-slate-300 rounded-xl text-xs font-medium text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-amber-700 hover:bg-amber-800 text-white font-semibold text-xs rounded-xl transition-colors shadow-xs"
            >
              Save Offering
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
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {offerings.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-4 font-semibold text-amber-800">{item.type}</td>
                  <td className="p-4 font-bold text-slate-900">{item.title}</td>
                  <td className="p-4 font-mono text-slate-500">/{item.type.toLowerCase() === "service" ? "services" : "consultations"}/{item.slug}</td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-semibold text-[10px]">
                      {item.status}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button onClick={() => handleEdit(item)} className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-lg">
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(item.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Media Library Picker Modal */}
      <MediaLibraryModal
        isOpen={isMediaModalOpen}
        onClose={() => setIsMediaModalOpen(false)}
        onSelectMedia={(url) => setImageUrl(url)}
      />
    </div>
  );
}
