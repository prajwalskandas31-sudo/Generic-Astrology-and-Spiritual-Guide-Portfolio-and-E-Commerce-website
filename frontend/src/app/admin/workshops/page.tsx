"use client";

import { useState, useEffect } from "react";
import { Workshop } from "@/types";
import { getWorkshops, fetchAPI } from "@/lib/api-client";
import MediaLibraryModal from "@/components/MediaLibraryModal";
import { Calendar, Plus, Trash2, Edit3, Loader2, FolderOpen } from "lucide-react";

export default function AdminWorkshopsPage() {
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);

  // Form fields
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [venue, setVenue] = useState("");
  const [address, setAddress] = useState("");
  const [price, setPrice] = useState(2500);
  const [capacity, setCapacity] = useState(30);
  const [status, setStatus] = useState("Published");
  const [batchName, setBatchName] = useState("Morning Batch (7:00 AM - 10:00 AM)");
  const [batchCapacity, setBatchCapacity] = useState(30);

  useEffect(() => {
    loadWorkshops();
  }, []);

  const loadWorkshops = async () => {
    setIsLoading(true);
    try {
      const data = await getWorkshops("all");
      setWorkshops(data);
    } catch (_) {
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      title,
      slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
      cover_image: coverImage,
      description,
      start_date: startDate,
      end_date: endDate,
      venue,
      address,
      duration: "3 Days",
      price: Number(price),
      capacity: Number(capacity),
      status,
      featured: true,
      batches: [
        {
          batch_name: batchName,
          start_time: "07:00 AM",
          end_time: "10:00 AM",
          capacity: Number(batchCapacity),
          remaining_seats: Number(batchCapacity),
          status: "Active",
        },
      ],
    };

    try {
      if (editingId) {
        await fetchAPI(`/workshops/${editingId}`, {
          method: "PUT",
          headers: { Authorization: "Bearer mock-admin-token" },
          body: JSON.stringify(payload),
        });
      } else {
        await fetchAPI("/workshops", {
          method: "POST",
          headers: { Authorization: "Bearer mock-admin-token" },
          body: JSON.stringify(payload),
        });
      }
      resetForm();
      loadWorkshops();
    } catch (err: any) {
      alert("Error saving workshop: " + err.message);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this workshop?")) return;
    try {
      await fetchAPI(`/workshops/${id}`, {
        method: "DELETE",
        headers: { Authorization: "Bearer mock-admin-token" },
      });
      loadWorkshops();
    } catch (err: any) {
      alert("Error deleting workshop: " + err.message);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setTitle("");
    setSlug("");
    setCoverImage("");
    setDescription("");
    setStartDate("");
    setEndDate("");
    setVenue("");
    setAddress("");
    setIsEditing(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-bold text-slate-900 flex items-center gap-2">
            <Calendar className="w-7 h-7 text-amber-700" />
            <span>Manage Workshops &amp; Batches</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Configure workshop dates, venue, pricing, batch capacities, and seat remaining counters.
          </p>
        </div>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="px-5 py-2.5 bg-amber-700 hover:bg-amber-800 text-white font-semibold text-xs rounded-xl transition-colors flex items-center gap-2 shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Workshop</span>
          </button>
        )}
      </div>

      {/* Workshop Editor Form */}
      {isEditing && (
        <form onSubmit={handleSave} className="p-6 bg-white rounded-2xl border border-slate-200 shadow-md space-y-4">
          <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2">
            {editingId ? "Edit Workshop" : "Create New Workshop"}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Workshop Title *</label>
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
                placeholder="e.g. vedic-chant-august-2026"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-sm font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Cover Image URL</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
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

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Price (₹) *</label>
              <input
                type="number"
                required
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Start Date *</label>
              <input
                type="text"
                placeholder="2026-08-15"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">End Date *</label>
              <input
                type="text"
                placeholder="2026-08-17"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Venue Name *</label>
              <input
                type="text"
                placeholder="Veda Cultural Center"
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
                className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Address *</label>
              <input
                type="text"
                placeholder="Malleshwaram, Bengaluru 560003"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Description</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-sm"
            />
          </div>

          {/* Batch Configuration */}
          <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 space-y-3">
            <h3 className="text-xs font-bold text-amber-900 uppercase tracking-wider">Initial Batch Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-medium text-slate-700 mb-1">Batch Name</label>
                <input
                  type="text"
                  value={batchName}
                  onChange={(e) => setBatchName(e.target.value)}
                  className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-slate-700 mb-1">Batch Capacity / Seats</label>
                <input
                  type="number"
                  value={batchCapacity}
                  onChange={(e) => setBatchCapacity(Number(e.target.value))}
                  className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs"
                />
              </div>
            </div>
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
              Save Workshop
            </button>
          </div>
        </form>
      )}

      {/* Workshop Table */}
      {isLoading ? (
        <div className="py-16 text-center text-slate-500 flex items-center justify-center gap-2">
          <Loader2 className="w-5 h-5 animate-spin text-amber-700" />
          <span>Loading workshops...</span>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider">
                <th className="p-4">Title</th>
                <th className="p-4">Price</th>
                <th className="p-4">Venue</th>
                <th className="p-4">Batches / Seats</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {workshops.map((ws) => {
                const totalRemaining = ws.batches.reduce((s, b) => s + b.remaining_seats, 0);
                return (
                  <tr key={ws.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-4 font-bold text-slate-900">{ws.title}</td>
                    <td className="p-4 font-semibold text-amber-800">₹{ws.price}</td>
                    <td className="p-4 text-slate-600">{ws.venue || "N/A"}</td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-800 font-semibold text-[10px]">
                        {ws.batches.length} Batch ({totalRemaining} seats left)
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-semibold text-[10px]">
                        {ws.status}
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button onClick={() => handleDelete(ws.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Media Picker Modal */}
      <MediaLibraryModal
        isOpen={isMediaModalOpen}
        onClose={() => setIsMediaModalOpen(false)}
        onSelectMedia={(url) => setCoverImage(url)}
      />
    </div>
  );
}
