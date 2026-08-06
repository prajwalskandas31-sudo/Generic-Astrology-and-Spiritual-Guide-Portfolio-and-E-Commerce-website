"use client";

import { useState, useEffect } from "react";
import { MediaItem } from "@/types";
import { getMediaLibrary, fetchAPI } from "@/lib/api-client";
import { X, Upload, Check, Image as ImageIcon, Loader2 } from "lucide-react";

export interface MediaLibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectMedia: (mediaUrl: string) => void;
}

export default function MediaLibraryModal({
  isOpen,
  onClose,
  onSelectMedia,
}: MediaLibraryModalProps) {
  const [mediaList, setMediaList] = useState<MediaItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUrl, setSelectedUrl] = useState<string>("");
  const [newFileUrl, setNewFileUrl] = useState("");
  const [newFilename, setNewFilename] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadMedia();
    }
  }, [isOpen]);

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

  const handleRegisterAsset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFileUrl) return;
    setIsUploading(true);
    try {
      const created = await fetchAPI<MediaItem>("/media", {
        method: "POST",
        body: JSON.stringify({
          filename: newFilename || "media_asset_" + Date.now(),
          file_url: newFileUrl,
          file_type: "image",
          alt_text: newFilename || "Media asset",
        }),
      });
      setMediaList([created, ...mediaList]);
      setSelectedUrl(created.file_url);
      setNewFileUrl("");
      setNewFilename("");
    } catch (err: any) {
      alert("Error adding media asset: " + err.message);
    } finally {
      setIsUploading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-amber-900/80 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-2xl font-serif font-bold text-slate-900 flex items-center gap-2">
              <ImageIcon className="w-6 h-6 text-amber-700" />
              <span>Centralized Admin Media Library</span>
            </h2>
            <p className="text-xs text-slate-500">
              Upload assets once to store in media library and reuse across all pages.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="py-4 space-y-6 overflow-y-auto grow">
          {/* Add New Asset Form */}
          <form onSubmit={handleRegisterAsset} className="p-4 bg-amber-50/70 rounded-xl border border-amber-200/80 space-y-3">
            <h3 className="text-xs font-bold text-amber-950 uppercase tracking-wider">
              Add New Asset URL
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
              <input
                type="text"
                placeholder="Asset Filename / Title"
                value={newFilename}
                onChange={(e) => setNewFilename(e.target.value)}
                className="sm:col-span-4 px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-xs"
              />
              <input
                type="url"
                placeholder="https://images.unsplash.com/..."
                value={newFileUrl}
                onChange={(e) => setNewFileUrl(e.target.value)}
                required
                className="sm:col-span-6 px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-xs"
              />
              <button
                type="submit"
                disabled={isUploading}
                className="sm:col-span-2 px-4 py-2 bg-amber-700 hover:bg-amber-800 text-white font-medium text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5"
              >
                {isUploading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
                <span>Add</span>
              </button>
            </div>
          </form>

          {/* Media Grid */}
          {isLoading ? (
            <div className="py-12 text-center text-slate-500 text-sm flex items-center justify-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-amber-600" />
              <span>Loading Media Library...</span>
            </div>
          ) : mediaList.length === 0 ? (
            <div className="p-8 text-center bg-slate-50 rounded-xl border border-slate-200 text-slate-500 text-xs">
              Media Library is currently empty. Add an asset above to reuse.
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-h-[350px] overflow-y-auto p-1">
              {mediaList.map((item) => {
                const isSelected = selectedUrl === item.file_url;
                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedUrl(item.file_url)}
                    className={`relative rounded-xl overflow-hidden border-2 cursor-pointer aspect-square bg-slate-100 transition-all ${
                      isSelected
                        ? "border-amber-600 ring-2 ring-amber-500/30 scale-98"
                        : "border-slate-200 hover:border-amber-300"
                    }`}
                  >
                    <img
                      src={item.file_url}
                      alt={item.alt_text || item.filename}
                      className="w-full h-full object-cover"
                    />
                    {isSelected && (
                      <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-amber-600 text-white flex items-center justify-center shadow-md">
                        <Check className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-slate-300 rounded-xl text-xs font-medium text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={!selectedUrl}
            onClick={() => {
              if (selectedUrl) {
                onSelectMedia(selectedUrl);
                onClose();
              }
            }}
            className="px-6 py-2 bg-amber-700 hover:bg-amber-800 disabled:opacity-50 text-white font-semibold rounded-xl text-xs transition-colors shadow-xs"
          >
            Select Asset
          </button>
        </div>
      </div>
    </div>
  );
}
