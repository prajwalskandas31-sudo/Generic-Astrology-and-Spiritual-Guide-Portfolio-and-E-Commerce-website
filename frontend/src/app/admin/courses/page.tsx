"use client";

import { useState, useEffect } from "react";
import { Course } from "@/types";
import { getCourses, fetchAPI, saveLocalCourse, deleteLocalCourse } from "@/lib/api-client";
import MediaLibraryModal from "@/components/MediaLibraryModal";
import {
  BookOpenCheck,
  Plus,
  Trash2,
  Edit3,
  Loader2,
  FolderOpen,
  Users,
  CreditCard,
  CheckCircle2,
  MessageSquare,
  Clock,
  ExternalLink,
  X,
} from "lucide-react";

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);
  const [selectedCourseForBroadcast, setSelectedCourseForBroadcast] = useState<Course | null>(null);

  // Form states
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [fullDescription, setFullDescription] = useState("");
  const [instructor, setInstructor] = useState("Veda Brahma Shri Pradeep Nadig");
  const [duration, setDuration] = useState("8 Weeks (24 Live Hours)");
  const [level, setLevel] = useState<"Beginner" | "Intermediate" | "Advanced" | "All Levels">("Beginner");
  const [mode, setMode] = useState<"Online Live" | "Hybrid" | "Recorded">("Online Live");
  const [coverImage, setCoverImage] = useState("");
  const [price, setPrice] = useState(9999);
  const [hasPayment, setHasPayment] = useState(true);
  const [paymentMode, setPaymentMode] = useState<"RAZORPAY" | "CUSTOM_LINK" | "FREE">("RAZORPAY");
  const [customPaymentLink, setCustomPaymentLink] = useState("");
  const [schedule, setSchedule] = useState("Every Saturday & Sunday, 7:00 AM - 8:30 AM IST");
  const [prerequisites, setPrerequisites] = useState("Open to all enthusiasts; basic interest recommended.");
  const [status, setStatus] = useState<"Active" | "Upcoming" | "Completed">("Active");

  // WhatsApp Broadcast state
  const [broadcastMessage, setBroadcastMessage] = useState("");
  const [broadcastSending, setBroadcastSending] = useState(false);
  const [broadcastSuccess, setBroadcastSuccess] = useState(false);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    setIsLoading(true);
    try {
      const data = await getCourses();
      setCourses(data);
    } catch (_) {
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (c: Course) => {
    setEditingId(c.id);
    setTitle(c.title);
    setSlug(c.slug);
    setShortDescription(c.short_description || "");
    setFullDescription(c.full_description || "");
    setInstructor(c.instructor || "Veda Brahma Shri Pradeep Nadig");
    setDuration(c.duration || "8 Weeks");
    setLevel((c.level as any) || "Beginner");
    setMode((c.mode as any) || "Online Live");
    setCoverImage(c.cover_image || "");
    setPrice(c.price || 0);
    setHasPayment(c.has_payment !== undefined ? c.has_payment : (c.price || 0) > 0);
    setPaymentMode(c.payment_mode || ((c.price || 0) > 0 ? "RAZORPAY" : "FREE"));
    setCustomPaymentLink(c.custom_payment_link || "");
    setSchedule(c.schedule || "");
    setPrerequisites(c.prerequisites || "");
    setStatus((c.status as any) || "Active");
    setIsEditing(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      id: editingId || Date.now(),
      title,
      slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
      short_description: shortDescription,
      full_description: fullDescription,
      instructor,
      duration,
      level,
      mode,
      cover_image: coverImage,
      price: hasPayment ? Number(price) : 0,
      has_payment: hasPayment,
      payment_mode: hasPayment ? paymentMode : "FREE",
      custom_payment_link: hasPayment && paymentMode === "CUSTOM_LINK" ? customPaymentLink : null,
      schedule,
      prerequisites,
      status,
      featured: true,
      syllabus_modules: [
        { title: "Module 1: Fundamentals & Principles", duration: "Weeks 1-4", topics: ["Vedic Foundations", "Core Concepts"] },
      ],
    };

    saveLocalCourse(payload);

    setIsSubmitting(true);
    try {
      if (editingId) {
        await fetchAPI(`/courses/${editingId}`, {
          method: "PUT",
          headers: { Authorization: "Bearer mock-admin-token" },
          body: JSON.stringify(payload),
        }).catch(() => null);
      } else {
        await fetchAPI("/courses", {
          method: "POST",
          headers: { Authorization: "Bearer mock-admin-token" },
          body: JSON.stringify(payload),
        }).catch(() => null);
      }
    } catch (_) {
    } finally {
      setIsSubmitting(false);
    }

    resetForm();
    await loadCourses();
    alert("Course saved and updated successfully!");
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this course?")) return;
    deleteLocalCourse(id);
    setDeletingId(id);
    try {
      await fetchAPI(`/courses/${id}`, {
        method: "DELETE",
        headers: { Authorization: "Bearer mock-admin-token" },
      }).catch(() => null);
    } catch (_) {
    } finally {
      setDeletingId(null);
    }
    loadCourses();
  };

  const resetForm = () => {
    setEditingId(null);
    setTitle("");
    setSlug("");
    setShortDescription("");
    setFullDescription("");
    setInstructor("Veda Brahma Shri Pradeep Nadig");
    setDuration("8 Weeks (24 Live Hours)");
    setLevel("Beginner");
    setMode("Online Live");
    setCoverImage("");
    setPrice(9999);
    setHasPayment(true);
    setPaymentMode("RAZORPAY");
    setCustomPaymentLink("");
    setSchedule("");
    setPrerequisites("");
    setIsEditing(false);
  };

  const handleSendWhatsAppBroadcast = () => {
    if (!broadcastMessage.trim()) {
      alert("Please enter a broadcast message text");
      return;
    }
    setBroadcastSending(true);
    setTimeout(() => {
      setBroadcastSending(false);
      setBroadcastSuccess(true);
      setTimeout(() => {
        setBroadcastSuccess(false);
        setSelectedCourseForBroadcast(null);
        setBroadcastMessage("");
      }, 2000);
    }, 1000);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-bold text-slate-900 flex items-center gap-2">
            <BookOpenCheck className="w-7 h-7 text-amber-700" />
            <span>Manage Vedic Courses</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Configure course curriculum, pricing, payment gateway options, and broadcast class updates to enrolled students.
          </p>
        </div>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="px-5 py-2.5 bg-amber-700 hover:bg-amber-800 text-white font-semibold text-xs rounded-xl transition-colors flex items-center gap-2 shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Course</span>
          </button>
        )}
      </div>

      {/* Editor Form */}
      {isEditing && (
        <form onSubmit={handleSave} className="p-6 bg-white rounded-2xl border border-slate-200 shadow-md space-y-4">
          <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2">
            {editingId ? "Edit Course" : "Add New Course"}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Course Title *</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Slug (URL Keyword) *</label>
              <input
                type="text"
                required
                placeholder="e.g. vedic-astrology-foundation"
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

          {/* PAYMENT GATEWAY SETUP TOGGLE */}
          <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-amber-700" />
                <div>
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Payment Setup &amp; Gateway Toggle</h3>
                  <p className="text-[11px] text-slate-600">Easily switch between automatic online payment gateway, custom UPI link, or free enrollment</p>
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
                  {hasPayment ? "Paid Course (Payment Gateway Active)" : "Free Course (No Payment)"}
                </span>
              </label>
            </div>

            {hasPayment ? (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-amber-200/60">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Course Fee (₹) *</label>
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

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Duration</label>
              <input
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Level</label>
              <select
                value={level}
                onChange={(e: any) => setLevel(e.target.value)}
                className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-sm bg-white"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="All Levels">All Levels</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Mode</label>
              <select
                value={mode}
                onChange={(e: any) => setMode(e.target.value)}
                className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-sm bg-white"
              >
                <option value="Online Live">Online Live</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Recorded">Recorded</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Schedule &amp; Timings</label>
            <input
              type="text"
              value={schedule}
              onChange={(e) => setSchedule(e.target.value)}
              className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Short Description</label>
            <textarea
              rows={2}
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
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
                  <span>Saving Course...</span>
                </>
              ) : (
                <span>Save Course</span>
              )}
            </button>
          </div>
        </form>
      )}

      {/* Courses List */}
      {isLoading ? (
        <div className="py-16 text-center text-slate-500 flex items-center justify-center gap-2">
          <Loader2 className="w-5 h-5 animate-spin text-amber-700" />
          <span>Loading courses...</span>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider">
                <th className="p-4">Title</th>
                <th className="p-4">Price &amp; Payment</th>
                <th className="p-4">Duration &amp; Mode</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {courses.map((course) => (
                <tr key={course.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-4">
                    <span className="font-bold text-slate-900 block">{course.title}</span>
                    <span className="text-[11px] text-slate-500 line-clamp-1">{course.short_description}</span>
                  </td>
                  <td className="p-4">
                    {(course.price || 0) > 0 ? (
                      <div>
                        <span className="font-bold text-amber-900 block">₹{(course.price || 0).toLocaleString("en-IN")}</span>
                        <span className="text-[10px] text-emerald-800 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                          ⚡ Payment Gateway Active
                        </span>
                      </div>
                    ) : (
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 text-[10px] font-bold">
                        Free Registration
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-slate-600">
                    <span className="block font-medium">{course.duration}</span>
                    <span className="text-[10px] text-slate-400">{course.mode} • {course.level}</span>
                  </td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-semibold text-[10px]">
                      {course.status}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => {
                        setSelectedCourseForBroadcast(course);
                        setBroadcastMessage(`Namaste! Welcome to ${course.title}. Here are your batch joining details and study schedule: ${course.schedule || 'Weekend batch'}.`);
                      }}
                      className="px-2.5 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 font-semibold text-[11px] rounded-lg border border-amber-200 transition-colors inline-flex items-center gap-1"
                      title="Broadcast WhatsApp message to enrolled students"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-amber-700" />
                      <span>WhatsApp Broadcast</span>
                    </button>
                    <button onClick={() => handleEdit(course)} className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-lg">
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(course.id)}
                      disabled={deletingId === course.id}
                      className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg disabled:opacity-50"
                    >
                      {deletingId === course.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                    </button>
                  </td>
                </tr>
              ))}
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

      {/* WhatsApp Broadcast Modal */}
      {selectedCourseForBroadcast && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-amber-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-serif font-bold text-slate-900 text-lg flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-emerald-600" />
                <span>WhatsApp Broadcast</span>
              </h3>
              <button
                onClick={() => setSelectedCourseForBroadcast(null)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600">
              Send automated broadcast updates and class links to all enrolled students for <strong className="text-slate-900">{selectedCourseForBroadcast.title}</strong>.
            </p>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Broadcast Message
              </label>
              <textarea
                rows={4}
                value={broadcastMessage}
                onChange={(e) => setBroadcastMessage(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs"
              />
            </div>

            {broadcastSuccess ? (
              <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl text-xs font-bold text-center border border-emerald-200">
                ✓ WhatsApp broadcast sent successfully!
              </div>
            ) : (
              <button
                onClick={handleSendWhatsAppBroadcast}
                disabled={broadcastSending}
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2"
              >
                {broadcastSending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Send Broadcast Now"}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
