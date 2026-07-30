"use client";

import { useState, useEffect } from "react";
import { MediaItem } from "@/types";
import { getMediaLibrary, fetchAPI } from "@/lib/api-client";
import { FolderOpen, Upload, Trash2, Copy, Check, Loader2 } from "lucide-react";

export default function AdminMediaPage() {
  const [mediaList, setMediaList] = useState<MediaItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [newFileUrl, setNewFileUrl] = useState("");
  const [newFilename, setNewFilename] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    loadMedia();
  }, []);

  const loadMedia = async () => {
    setIsLoading(true);
    try {
      const data = await getMediaLibrary();
      setMediaList(data);
    } catch (_) {
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddMedia = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFileUrl) return;
    setIsUploading(true);
    try {
      const created = await fetchAPI<MediaItem>("/media", {
        method: "POST",
        headers: { Authorization: "Bearer mock-admin-token" },
        body: JSON.stringify({
          filename: newFilename || "media_asset_" + Date.now(),
          file_url: newFileUrl,
          file_type: "image",
          alt_text: newFilename || "Media asset",
        }),
      });
      setMediaList([created, ...mediaList]);
      setNewFileUrl("");
      setNewFilename("");
    } catch (err: any) {
      alert("Error adding asset: " + err.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteMedia = async (id: number) => {
    if (!confirm("Are you sure you want to delete this media asset?")) return;
    try {
      await fetchAPI(`/media/${id}`, {
        method: "DELETE",
        headers: { Authorization: "Bearer mock-admin-token" },
      });
      setMediaList(mediaList.filter((m) => m.id !== id));
    } catch (err: any) {
      alert("Error deleting asset: " + err.message);
    }
  };

  const copyUrl = (id: number, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-serif font-bold text-slate-900 flex items-center gap-2">
          <FolderOpen className="w-7 h-7 text-amber-700" />
          <span>Centralized Media Library</span>
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Upload and manage images and media files. Reuse these URLs across Offerings, Workshops, Blogs, and Gallery.
        </p>
      </div>

      {/* Add Asset Form */}
      <form onSubmit={handleAddMedia} className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
          Upload / Register New Asset URL
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          <input
            type="text"
            placeholder="Asset Title / Filename"
            value={newFilename}
            onChange={(e) => setNewFilename(e.target.value)}
            className="sm:col-span-4 px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm"
          />
          <input
            type="url"
            placeholder="https://images.unsplash.com/..."
            value={newFileUrl}
            onChange={(e) => setNewFileUrl(e.target.value)}
            required
            className="sm:col-span-6 px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm"
          />
          <button
            type="submit"
            disabled={isUploading}
            className="sm:col-span-2 px-5 py-2.5 bg-amber-700 hover:bg-amber-800 text-white font-semibold text-sm rounded-xl transition-colors flex items-center justify-center gap-2 shadow-xs"
          >
            {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
            <span>Upload</span>
          </button>
        </div>
      </form>

      {/* Asset Grid */}
      {isLoading ? (
        <div className="py-16 text-center text-slate-500 flex items-center justify-center gap-2">
          <Loader2 className="w-5 h-5 animate-spin text-amber-700" />
          <span>Loading assets...</span>
        </div>
      ) : mediaList.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 text-slate-500 text-sm">
          No media assets in library yet. Add your first asset above.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {mediaList.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs flex flex-col justify-between group">
              <div className="h-44 bg-slate-100 relative overflow-hidden">
                <img src={item.file_url} alt={item.filename} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              </div>
              <div className="p-4 space-y-3">
                <h3 className="font-bold text-slate-900 text-xs truncate">{item.filename}</h3>
                <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-100">
                  <button
                    onClick={() => copyUrl(item.id, item.file_url)}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-800 hover:underline"
                  >
                    {copiedId === item.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedId === item.id ? "Copied!" : "Copy URL"}</span>
                  </button>
                  <button
                    onClick={() => handleDeleteMedia(item.id)}
                    className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
