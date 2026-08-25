"use client";

import { useState, useEffect } from "react";
import { ClassItem } from "@/types";
import { getClasses, fetchAPI, saveLocalClass, deleteLocalClass } from "@/lib/api-client";
import { GraduationCap, Plus, Trash2, Edit3, Loader2 } from "lucide-react";

export default function AdminClassesPage() {
  const [classesList, setClassesList] = useState<ClassItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [suitableFor, setSuitableFor] = useState("");
  const [mode, setMode] = useState<"Online" | "Offline" | "Hybrid">("Hybrid");
  const [price, setPrice] = useState(4999);
  const [hasPayment, setHasPayment] = useState(true);
  const [paymentMode, setPaymentMode] = useState<"RAZORPAY" | "CUSTOM_LINK" | "FREE">("RAZORPAY");
  const [customPaymentLink, setCustomPaymentLink] = useState("");

  useEffect(() => {
    loadClasses();
  }, []);

  const loadClasses = async () => {
    setIsLoading(true);
    try {
      const data = await getClasses();
      setClassesList(data);
    } catch (_) {
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (item: ClassItem) => {
    setEditingId(item.id);
    setName(item.name || item.title || "");
    setDescription(item.description || "");
    setDuration(item.duration || "");
    setSuitableFor(item.suitable_for || "");
    setMode((item.mode as any) || "Hybrid");
    setHasPayment(item.has_payment !== undefined ? item.has_payment : (item.price || 0) > 0);
    setPrice(item.price || 0);
    setPaymentMode(item.payment_mode || ((item.price || 0) > 0 ? "RAZORPAY" : "FREE"));
    setCustomPaymentLink(item.custom_payment_link || "");
    setIsEditing(true);
  };

  const resetForm = () => {
    setEditingId(null);
    setName("");
    setDescription("");
    setDuration("");
    setSuitableFor("");
    setMode("Hybrid");
    setPrice(4999);
    setHasPayment(true);
    setPaymentMode("RAZORPAY");
    setCustomPaymentLink("");
    setIsEditing(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      id: editingId || Date.now(),
      name,
      description,
      duration,
      suitable_for: suitableFor,
      mode,
      price: hasPayment ? Number(price) : 0,
      has_payment: hasPayment,
      payment_mode: hasPayment ? paymentMode : "FREE",
      custom_payment_link: hasPayment && paymentMode === "CUSTOM_LINK" ? customPaymentLink : null,
      status: "Active",
    };

    saveLocalClass(payload);

    try {
      if (editingId) {
        await fetchAPI(`/classes/${editingId}`, {
          method: "PUT",
          headers: { Authorization: "Bearer mock-admin-token" },
          body: JSON.stringify(payload),
        }).catch(() => null);
      } else {
        await fetchAPI("/classes", {
          method: "POST",
          headers: { Authorization: "Bearer mock-admin-token" },
          body: JSON.stringify(payload),
        }).catch(() => null);
      }
    } catch (_) {}

    resetForm();
    await loadClasses();
    alert("Class saved and updated successfully!");
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this class?")) return;
    deleteLocalClass(id);
    try {
      await fetchAPI(`/classes/${id}`, {
        method: "DELETE",
        headers: { Authorization: "Bearer mock-admin-token" },
      }).catch(() => null);
    } catch (_) {}
    loadClasses();
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-bold text-slate-900 flex items-center gap-2">
            <GraduationCap className="w-7 h-7 text-amber-700" />
            <span>Manage Vedic Classes</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Add or edit structured class subjects, durations, and delivery modes.
          </p>
        </div>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="px-5 py-2.5 bg-amber-700 hover:bg-amber-800 text-white font-semibold text-xs rounded-xl transition-colors flex items-center gap-2 shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Class</span>
          </button>
        )}
      </div>

      {isEditing && (
        <form onSubmit={handleSave} className="p-6 bg-white rounded-2xl border border-slate-200 shadow-md space-y-4">
          <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2">
            {editingId ? "Edit Class" : "Add New Class"}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Class Name *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Mode *</label>
              <select
                value={mode}
                onChange={(e: any) => setMode(e.target.value)}
                className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-sm bg-white"
              >
                <option value="Hybrid">Hybrid (Online &amp; Offline)</option>
                <option value="Online">Online Only</option>
                <option value="Offline">Offline Only</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Duration</label>
              <input
                type="text"
                placeholder="3 Months"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Suitable For</label>
              <input
                type="text"
                placeholder="Beginners &amp; Enthusiasts"
                value={suitableFor}
                onChange={(e) => setSuitableFor(e.target.value)}
                className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-sm"
              />
            </div>
          </div>

          {/* PAYMENT GATEWAY SETUP TOGGLE */}
          <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Payment Setup &amp; Gateway Toggle</h3>
                <p className="text-[11px] text-slate-600">Easily toggle between automatic online payment gateway, custom UPI link, or free enrollment</p>
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
                  {hasPayment ? "Paid Class (Payment Active)" : "Free Class (No Fee)"}
                </span>
              </label>
            </div>

            {hasPayment ? (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-amber-200/60">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Class Fee (₹) *</label>
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
                    className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-xl text-sm font-medium text-slate-900"
                  >
                    <option value="RAZORPAY">⚡ Automatic Online Payment Gateway (Razorpay)</option>
                    <option value="CUSTOM_LINK">🔗 Custom Payment Link / UPI Link</option>
                  </select>
                </div>
                {paymentMode === "CUSTOM_LINK" && (
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Payment Link URL *</label>
                    <input
                      type="url"
                      required
                      placeholder="https://rzp.io/l/... or upi://..."
                      value={customPaymentLink}
                      onChange={(e) => setCustomPaymentLink(e.target.value)}
                      className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-xl text-sm font-mono"
                    />
                  </div>
                )}
              </div>
            ) : (
              <div className="text-xs text-slate-500 bg-white p-3 rounded-lg border border-slate-200">
                Students will register directly without any fee checkout step.
              </div>
            )}
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
              Save Class
            </button>
          </div>
        </form>
      )}

      {isLoading ? (
        <div className="py-16 text-center text-slate-500 flex items-center justify-center gap-2">
          <Loader2 className="w-5 h-5 animate-spin text-amber-700" />
          <span>Loading classes...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {classesList.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex items-start justify-between">
              <div className="space-y-2">
                <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 font-semibold text-[10px]">
                  {item.mode}
                </span>
                <h3 className="font-serif font-bold text-lg text-slate-900">{item.name}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{item.description}</p>
                <div className="text-[11px] text-slate-500 font-medium pt-1">
                  Duration: {item.duration || "N/A"} | Suitable: {item.suitable_for || "All"}
                </div>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button onClick={() => handleEdit(item)} className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                  <Edit3 className="w-4 h-4" />
                </button>
                <button onClick={() => handleDelete(item.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

