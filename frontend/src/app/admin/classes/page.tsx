"use client";

import { useState, useEffect } from "react";
import { ClassItem } from "@/types";
import { getClasses, fetchAPI } from "@/lib/api-client";
import { GraduationCap, Plus, Trash2, Loader2 } from "lucide-react";

export default function AdminClassesPage() {
  const [classesList, setClassesList] = useState<ClassItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [suitableFor, setSuitableFor] = useState("");
  const [mode, setMode] = useState<"Online" | "Offline" | "Hybrid">("Hybrid");

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

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetchAPI("/classes", {
        method: "POST",
        headers: { Authorization: "Bearer mock-admin-token" },
        body: JSON.stringify({
          name,
          description,
          duration,
          suitable_for: suitableFor,
          mode,
          status: "Active",
        }),
      });
      setName("");
      setDescription("");
      setDuration("");
      setSuitableFor("");
      setIsEditing(false);
      loadClasses();
    } catch (err: any) {
      alert("Error saving class: " + err.message);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this class?")) return;
    try {
      await fetchAPI(`/classes/${id}`, {
        method: "DELETE",
        headers: { Authorization: "Bearer mock-admin-token" },
      });
      loadClasses();
    } catch (err: any) {
      alert("Error deleting class: " + err.message);
    }
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
          <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2">Add New Class</h2>

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
              onClick={() => setIsEditing(false)}
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
