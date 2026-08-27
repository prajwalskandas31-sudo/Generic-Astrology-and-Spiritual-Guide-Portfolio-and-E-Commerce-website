"use client";

import { useState, useEffect } from "react";
import { Workshop } from "@/types";
import { getWorkshops, fetchAPI } from "@/lib/api-client";
import MediaLibraryModal from "@/components/MediaLibraryModal";
import WorkshopAdminDetailModal from "@/components/WorkshopAdminDetailModal";
import { Calendar, Plus, Trash2, Edit3, Loader2, FolderOpen, Users, CreditCard, CheckCircle2, Link2, Upload, Image as ImageIcon } from "lucide-react";

interface BatchFormState {
  id?: number;
  batch_name: string;
  start_time: string;
  end_time: string;
  capacity: number;
  remaining_seats?: number;
  status?: string;
}

const DEFAULT_BATCH: BatchFormState = {
  batch_name: "Morning Batch (7:00 AM - 10:00 AM)",
  start_time: "07:00 AM",
  end_time: "10:00 AM",
  capacity: 30,
  remaining_seats: 30,
  status: "Active",
};

export default function AdminWorkshopsPage() {
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);
  const [selectedDetailWorkshop, setSelectedDetailWorkshop] = useState<Workshop | null>(null);

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
  const [hasPayment, setHasPayment] = useState(true);
  const [paymentMode, setPaymentMode] = useState<"RAZORPAY" | "CUSTOM_LINK" | "FREE">("RAZORPAY");
  const [customPaymentLink, setCustomPaymentLink] = useState("");
  const [status, setStatus] = useState("Published");
  const [batches, setBatches] = useState<BatchFormState[]>([{ ...DEFAULT_BATCH }]);

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

  const handleDeviceFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setCoverImage(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const addBatch = () => {
    setBatches((prev) => [
      ...prev,
      {
        batch_name: `Batch ${prev.length + 1} (${prev.length === 1 ? "Evening" : "Special"} 5:00 PM - 8:00 PM)`,
        start_time: "05:00 PM",
        end_time: "08:00 PM",
        capacity: 30,
        remaining_seats: 30,
        status: "Active",
      },
    ]);
  };

  const updateBatch = (index: number, field: keyof BatchFormState, value: any) => {
    setBatches((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      if (field === "capacity") {
        updated[index].remaining_seats = Number(value);
      }
      return updated;
    });
  };

  const removeBatch = (index: number) => {
    if (batches.length <= 1) {
      alert("A workshop must have at least one batch.");
      return;
    }
    setBatches((prev) => prev.filter((_, i) => i !== index));
  };

  const handleEdit = (ws: Workshop) => {
    setEditingId(ws.id);
    setTitle(ws.title);
    setSlug(ws.slug);
    setCoverImage(ws.cover_image || "");
    setDescription(ws.description || "");
    setStartDate(ws.start_date || "");
    setEndDate(ws.end_date || "");
    setVenue(ws.venue || "");
    setAddress(ws.address || "");
    setPrice(ws.price || 2500);
    setHasPayment(ws.has_payment !== false);
    setPaymentMode(ws.payment_mode || "RAZORPAY");
    setCustomPaymentLink(ws.custom_payment_link || "");
    setStatus(ws.status || "Published");
    if (ws.batches && ws.batches.length > 0) {
      setBatches(
        ws.batches.map((b) => ({
          id: b.id,
          batch_name: b.batch_name,
          start_time: b.start_time || "07:00 AM",
          end_time: b.end_time || "10:00 AM",
          capacity: b.capacity || 30,
          remaining_seats: b.remaining_seats ?? b.capacity ?? 30,
          status: b.status || "Active",
        }))
      );
    } else {
      setBatches([{ ...DEFAULT_BATCH }]);
    }
    setIsEditing(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    const formattedBatches = batches.map((b) => ({
      ...(b.id ? { id: b.id } : {}),
      batch_name: b.batch_name,
      start_time: b.start_time || "07:00 AM",
      end_time: b.end_time || "10:00 AM",
      capacity: Number(b.capacity),
      remaining_seats: b.remaining_seats !== undefined ? Number(b.remaining_seats) : Number(b.capacity),
      status: b.status || "Active",
    }));

    const totalCapacity = formattedBatches.reduce((sum, b) => sum + Number(b.capacity), 0);

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
      price: hasPayment ? Number(price) : 0,
      has_payment: hasPayment,
      payment_mode: hasPayment ? paymentMode : "FREE",
      custom_payment_link: hasPayment && paymentMode === "CUSTOM_LINK" ? customPaymentLink : null,
      capacity: totalCapacity,
      status,
      featured: true,
      batches: formattedBatches,
    };

    try {
      if (editingId) {
        try {
          await fetchAPI(`/workshops/${editingId}`, {
            method: "PUT",
            headers: { Authorization: "Bearer mock-admin-token" },
            body: JSON.stringify(payload),
          });
        } catch (err: any) {
          if (err.message && err.message.includes("not found")) {
            await fetchAPI("/workshops", {
              method: "POST",
              headers: { Authorization: "Bearer mock-admin-token" },
              body: JSON.stringify(payload),
            });
          } else {
            throw err;
          }
        }
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
    setPrice(2500);
    setHasPayment(true);
    setPaymentMode("RAZORPAY");
    setCustomPaymentLink("");
    setStatus("Published");
    setBatches([{ ...DEFAULT_BATCH }]);
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
            Configure workshop dates, venue, pricing, multiple batch capacities, direct image uploads, and broadcast WhatsApp updates.
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

          {/* Cover Image Field with Direct Device Upload & Media Library */}
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Cover Image</label>
            <div className="flex flex-wrap sm:flex-nowrap gap-2 items-center">
              <input
                type="text"
                placeholder="Paste Image URL or upload directly..."
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-sm"
              />
              <label className="px-4 py-2 bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-semibold rounded-xl border border-amber-300 flex items-center gap-1.5 shrink-0 cursor-pointer transition-colors shadow-xs">
                <Upload className="w-4 h-4 text-amber-700" />
                <span>Upload from Device</span>
                <input type="file" accept="image/*" onChange={handleDeviceFileUpload} className="hidden" />
              </label>
              <button
                type="button"
                onClick={() => setIsMediaModalOpen(true)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-xl border border-slate-300 flex items-center gap-1.5 shrink-0 transition-colors"
              >
                <FolderOpen className="w-4 h-4 text-amber-700" />
                <span>Media Library</span>
              </button>
            </div>
            {coverImage && (
              <div className="mt-2.5 flex items-center gap-3 p-2 bg-slate-50 border border-slate-200 rounded-xl">
                <img src={coverImage} alt="Cover Preview" className="w-16 h-12 object-cover rounded-lg border border-slate-200" />
                <div className="flex-1 min-w-0 text-[11px] text-slate-500 truncate">
                  <span className="font-semibold text-slate-700 block">Cover Image Active</span>
                  <span className="truncate block">{coverImage.substring(0, 70)}...</span>
                </div>
                <button
                  type="button"
                  onClick={() => setCoverImage("")}
                  className="px-2.5 py-1 text-[11px] bg-red-50 text-red-700 hover:bg-red-100 rounded-lg border border-red-200 font-semibold"
                >
                  Remove
                </button>
              </div>
            )}
          </div>

          {/* SELF-SERVICE PAYMENT INTEGRATION OPTION */}
          <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-amber-700" />
                <div>
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Payment Setup &amp; Integration</h3>
                  <p className="text-[11px] text-slate-600">Instantly integrate payment collection without code changes</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasPayment}
                  onChange={(e) => {
                    setHasPayment(e.target.checked);
                    if (!e.target.checked) setPrice(0);
                  }}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-700"></div>
                <span className="ml-2 text-xs font-bold text-slate-800">
                  {hasPayment ? "Include Payment (Paid Event)" : "Free Registration (No Payment)"}
                </span>
              </label>
            </div>

            {hasPayment ? (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-amber-200/60">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Registration Fee (₹) *</label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-xl text-sm font-semibold text-amber-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Payment Method *</label>
                  <select
                    value={paymentMode}
                    onChange={(e: any) => setPaymentMode(e.target.value)}
                    className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-xl text-sm font-medium"
                  >
                    <option value="RAZORPAY">⚡ Automatic Online Payment Gateway (Razorpay)</option>
                    <option value="CUSTOM_LINK">🔗 Custom Payment Link / UPI Direct Link</option>
                  </select>
                </div>
                {paymentMode === "CUSTOM_LINK" && (
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Payment Link / UPI URL *</label>
                    <input
                      type="url"
                      required
                      placeholder="https://rzp.io/l/... or upi://pay?..."
                      value={customPaymentLink}
                      onChange={(e) => setCustomPaymentLink(e.target.value)}
                      className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-xl text-sm font-mono"
                    />
                  </div>
                )}
                <div className="sm:col-span-3 flex items-center gap-1.5 text-[11px] text-emerald-800 font-semibold bg-emerald-50 p-2.5 rounded-lg border border-emerald-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    Payment collection will be immediately active for users as soon as this workshop is published!
                  </span>
                </div>
              </div>
            ) : (
              <div className="text-xs text-slate-500 bg-white p-3 rounded-lg border border-slate-200">
                Users will register directly for free without any payment checkout step.
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

          {/* Dynamic Batches Configuration Section */}
          <div className="p-4 bg-amber-50/70 rounded-xl border border-amber-200 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-amber-700" />
                  <span>Workshop Batches ({batches.length} Configured)</span>
                </h3>
                <p className="text-[11px] text-slate-600 mt-0.5">
                  Configure multiple batches (e.g. Morning, Evening) with timings and seat limits.
                </p>
              </div>
              <button
                type="button"
                onClick={addBatch}
                className="px-3 py-1.5 bg-amber-700 hover:bg-amber-800 text-white text-xs font-semibold rounded-lg flex items-center gap-1 shadow-xs transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Batch</span>
              </button>
            </div>

            <div className="space-y-3 pt-1">
              {batches.map((b, idx) => (
                <div key={idx} className="p-3.5 bg-white border border-amber-200/90 rounded-xl shadow-2xs space-y-3">
                  <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2">
                    <span className="text-xs font-bold text-slate-800">Batch #{idx + 1}</span>
                    {batches.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeBatch(idx)}
                        className="text-xs text-red-600 hover:text-red-800 font-semibold flex items-center gap-1 hover:bg-red-50 px-2 py-0.5 rounded-md transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Remove Batch</span>
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-medium text-slate-700 mb-1">Batch Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Morning Batch (7:00 AM - 10:00 AM)"
                        value={b.batch_name}
                        onChange={(e) => updateBatch(idx, "batch_name", e.target.value)}
                        className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-slate-700 mb-1">Start Time</label>
                      <input
                        type="text"
                        placeholder="07:00 AM"
                        value={b.start_time}
                        onChange={(e) => updateBatch(idx, "start_time", e.target.value)}
                        className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-slate-700 mb-1">End Time</label>
                      <input
                        type="text"
                        placeholder="10:00 AM"
                        value={b.end_time}
                        onChange={(e) => updateBatch(idx, "end_time", e.target.value)}
                        className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-slate-700 mb-1">Seat Capacity *</label>
                      <input
                        type="number"
                        required
                        min="1"
                        value={b.capacity}
                        onChange={(e) => updateBatch(idx, "capacity", Number(e.target.value))}
                        className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-semibold text-slate-900"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-slate-700 mb-1">Batch Status</label>
                      <select
                        value={b.status || "Active"}
                        onChange={(e) => updateBatch(idx, "status", e.target.value)}
                        className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-medium"
                      >
                        <option value="Active">Active (Open)</option>
                        <option value="Full">Full (Seats Filled)</option>
                        <option value="Closed">Closed</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
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
                const totalRemaining = (ws.batches || []).reduce((s, b) => s + b.remaining_seats, 0);
                const batchCount = (ws.batches || []).length;
                return (
                  <tr key={ws.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        {ws.cover_image ? (
                          <img src={ws.cover_image} alt="" className="w-10 h-10 object-cover rounded-lg border border-slate-200 shrink-0" />
                        ) : (
                          <div className="w-10 h-10 bg-amber-50 rounded-lg border border-amber-200 flex items-center justify-center text-amber-700 font-bold shrink-0">
                            <ImageIcon className="w-5 h-5" />
                          </div>
                        )}
                        <div>
                          <span className="font-bold text-slate-900 block">{ws.title}</span>
                          <button
                            onClick={() => setSelectedDetailWorkshop(ws)}
                            className="text-[11px] font-semibold text-amber-800 hover:underline flex items-center gap-1 mt-0.5"
                          >
                            <Users className="w-3 h-3 text-amber-700" />
                            <span>View Participants &amp; Broadcast</span>
                          </button>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      {ws.has_payment !== false ? (
                        <div>
                          <span className="font-bold text-amber-900 block">₹{ws.price}</span>
                          <span className="text-[10px] text-slate-500 font-medium">
                            {ws.payment_mode === "CUSTOM_LINK" ? "🔗 Custom Link" : "⚡ Razorpay"}
                          </span>
                        </div>
                      ) : (
                        <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">
                          Free Registration
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-slate-600">{ws.venue || "N/A"}</td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-800 font-semibold text-[10px]">
                        {batchCount} {batchCount === 1 ? "Batch" : "Batches"} ({totalRemaining} seats left)
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-semibold text-[10px]">
                        {ws.status}
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => setSelectedDetailWorkshop(ws)}
                        className="px-2.5 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 font-semibold text-[11px] rounded-lg border border-amber-200 transition-colors inline-flex items-center gap-1"
                        title="View Participants & WhatsApp Broadcast"
                      >
                        <Users className="w-3.5 h-3.5 text-amber-700" />
                        <span>Participants</span>
                      </button>
                      <button onClick={() => handleEdit(ws)} className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-lg">
                        <Edit3 className="w-4 h-4" />
                      </button>
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

      {/* Workshop Admin Detail & WhatsApp Broadcast Modal */}
      <WorkshopAdminDetailModal
        isOpen={!!selectedDetailWorkshop}
        onClose={() => setSelectedDetailWorkshop(null)}
        workshop={selectedDetailWorkshop}
      />
    </div>
  );
}
