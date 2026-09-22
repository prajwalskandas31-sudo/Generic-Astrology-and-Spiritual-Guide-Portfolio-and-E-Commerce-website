"use client";

import { useState, useEffect } from "react";
import { GalleryItem } from "@/types";
import { getGallery, fetchAPI } from "@/lib/api-client";
import MediaLibraryModal from "@/components/MediaLibraryModal";
import { Image as ImageIcon, Plus, Trash2, Edit3, Loader2, FolderOpen, X } from "lucide-react";

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [mediaUrl, setMediaUrl] = useState("");
  const [category, setCategory] = useState("Rituals");

  const GALLERY_CATEGORIES = [
    "Rituals",
    "Homa & Yagnas",
    "Weddings & Ceremonies",
    "Workshops",
    "Live Events",
    "Temples & Shrines",
    "Classes",
    "Other",
  ];

  useEffect(() => {
    loadGallery();
  }, []);

  const loadGallery = async () => {
    setIsLoading(true);
    try {
      const data = await getGallery();
      setItems(data);
    } catch (_) {
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (item: GalleryItem) => {
    setEditingId(item.id);
    setTitle(item.title || "");
    setDescription(item.description || "");
    setMediaUrl(item.media_url || "");
    setCategory(item.category || "Rituals");
    setIsEditing(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const payload = {
      title,
      description,
      media_url: mediaUrl,
      media_type: "Image",
      category,
      display_order: 0,
    };
    try {
      if (editingId) {
        await fetchAPI(`/gallery/items/${editingId}`, {
          method: "PUT",
          headers: { Authorization: "Bearer mock-admin-token" },
          body: JSON.stringify(payload),
        });
      } else {
        await fetchAPI("/gallery/items", {
          method: "POST",
          headers: { Authorization: "Bearer mock-admin-token" },
          body: JSON.stringify(payload),
        });
      }
      resetForm();
      loadGallery();
    } catch (err: any) {
      alert("Error saving gallery item: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this gallery item?")) return;
    setDeletingId(id);
    try {
      await fetchAPI(`/gallery/items/${id}`, {
        method: "DELETE",
        headers: { Authorization: "Bearer mock-admin-token" },
      });
      loadGallery();
    } catch (err: any) {
      alert("Error deleting item: " + err.message);
    } finally {
      setDeletingId(null);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setTitle("");
    setDescription("");
    setMediaUrl("");
    setCategory("Rituals");
    setIsEditing(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-bold text-slate-900 flex items-center gap-2">
            <ImageIcon className="w-7 h-7 text-amber-700" />
            <span>Manage Gallery</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Add, edit, or remove gallery photos and videos. Select assets directly from your Media Library.
          </p>
        </div>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="px-5 py-2.5 bg-amber-700 hover:bg-amber-800 text-white font-semibold text-xs rounded-xl transition-colors flex items-center gap-2 shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Add Gallery Item</span>
          </button>
        )}
      </div>

      {isEditing && (
        <form onSubmit={handleSave} className="p-6 bg-white rounded-2xl border border-slate-200 shadow-md space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h2 className="text-base font-bold text-slate-900">
              {editingId ? "Edit Gallery Item" : "Add New Gallery Item"}
            </h2>
            <button type="button" onClick={resetForm} className="p-1 text-slate-400 hover:text-slate-700 rounded-lg">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
              <label className="block text-xs font-medium text-slate-700 mb-1">Category *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-sm bg-white"
              >
                {GALLERY_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Media URL *</label>
            <div className="flex gap-2">
              <input
                type="text"
                required
                placeholder="Paste image URL or select from Media Library..."
                value={mediaUrl}
                onChange={(e) => setMediaUrl(e.target.value)}
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
            {mediaUrl && (
              <div className="mt-2.5 relative rounded-xl overflow-hidden border border-slate-200 h-32 bg-slate-50">
                <img src={mediaUrl} alt="Preview" className="w-full h-full object-contain" />
              </div>
            )}
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Description</label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
              disabled={isSubmitting}
              className="px-6 py-2 bg-amber-700 hover:bg-amber-800 disabled:opacity-50 text-white font-semibold text-xs rounded-xl transition-colors shadow-xs flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <span>{editingId ? "Update Gallery Item" : "Save Gallery Item"}</span>
              )}
            </button>
          </div>
        </form>
      )}

      {isLoading ? (
        <div className="py-16 text-center text-slate-500 flex items-center justify-center gap-2">
          <Loader2 className="w-5 h-5 animate-spin text-amber-700" />
          <span>Loading gallery...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {items.map((g) => (
            <div key={g.id} className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs flex flex-col justify-between">
              <div className="h-44 bg-slate-100 relative">
                <img src={g.media_url} alt={g.title || "Gallery"} className="w-full h-full object-cover" />
              </div>
              <div className="p-4 space-y-2">
                <span className="text-[10px] font-semibold text-amber-800 uppercase">{g.category}</span>
                <h3 className="font-bold text-slate-900 text-sm">{g.title}</h3>
                {g.description && (
                  <p className="text-[11px] text-slate-500 line-clamp-2">{g.description}</p>
                )}
                <div className="pt-2 flex justify-end gap-1 border-t border-slate-100">
                  <button
                    onClick={() => handleEdit(g)}
                    className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                    title="Edit this gallery item"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(g.id)}
                    disabled={deletingId === g.id}
                    className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg disabled:opacity-50 transition-colors"
                  >
                    {deletingId === g.id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <MediaLibraryModal
        isOpen={isMediaModalOpen}
        onClose={() => setIsMediaModalOpen(false)}
        onSelectMedia={(url) => setMediaUrl(url)}
      />
    </div>
  );
}
