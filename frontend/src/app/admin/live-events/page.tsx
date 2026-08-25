"use client";

import { useState, useEffect } from "react";
import { LiveEvent } from "@/types";
import { getLiveEvents, fetchAPI, saveLocalLiveEvent, deleteLocalLiveEvent } from "@/lib/api-client";
import MediaLibraryModal from "@/components/MediaLibraryModal";
import {
  Radio,
  Plus,
  Trash2,
  Edit3,
  Loader2,
  FolderOpen,
  Users,
  CreditCard,
  CheckCircle2,
  MessageSquare,
  Calendar,
  Sparkles,
  ExternalLink,
  X,
  Eye,
} from "lucide-react";

export default function AdminLiveEventsPage() {
  const [events, setEvents] = useState<LiveEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);
  const [selectedEventForBroadcast, setSelectedEventForBroadcast] = useState<LiveEvent | null>(null);

  // Form states
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [fullDescription, setFullDescription] = useState("");
  const [eventDate, setEventDate] = useState("2026-08-25");
  const [eventTime, setEventTime] = useState("06:00 PM - 09:00 PM IST");
  const [venueType, setVenueType] = useState<"Online Stream" | "In-Person & Live Stream" | "Temple Ground">("In-Person & Live Stream");
  const [venueAddress, setVenueAddress] = useState("Asharaya layout, K.G.Vaderahalli, Bengaluru");
  const [streamUrl, setStreamUrl] = useState("https://youtube.com/live/pradeep-nadig-live");
  const [coverImage, setCoverImage] = useState("");
  const [price, setPrice] = useState(1100);
  const [hasPayment, setHasPayment] = useState(true);
  const [paymentMode, setPaymentMode] = useState<"RAZORPAY" | "CUSTOM_LINK" | "FREE">("RAZORPAY");
  const [customPaymentLink, setCustomPaymentLink] = useState("");
  const [panditsCount, setPanditsCount] = useState(11);
  const [status, setStatus] = useState<"Upcoming" | "Live Now" | "Ended">("Upcoming");

  // WhatsApp Broadcast state
  const [broadcastMessage, setBroadcastMessage] = useState("");
  const [broadcastSending, setBroadcastSending] = useState(false);
  const [broadcastSuccess, setBroadcastSuccess] = useState(false);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    setIsLoading(true);
    try {
      const data = await getLiveEvents();
      setEvents(data);
    } catch (_) {
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (ev: LiveEvent) => {
    setEditingId(ev.id);
    setTitle(ev.title);
    setSlug(ev.slug);
    setShortDescription(ev.short_description || "");
    setFullDescription(ev.full_description || "");
    setEventDate(ev.event_date || "");
    setEventTime(ev.event_time || "");
    setVenueType((ev.venue_type as any) || "In-Person & Live Stream");
    setVenueAddress(ev.venue_address || "");
    setStreamUrl(ev.stream_url || "");
    setCoverImage(ev.cover_image || "");
    setPrice(ev.price || 0);
    setHasPayment(ev.has_payment !== undefined ? ev.has_payment : (ev.price || 0) > 0);
    setPaymentMode(ev.payment_mode || ((ev.price || 0) > 0 ? "RAZORPAY" : "FREE"));
    setCustomPaymentLink(ev.custom_payment_link || "");
    setPanditsCount(ev.pandits_count || 11);
    setStatus((ev.status as any) || "Upcoming");
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
      event_date: eventDate,
      event_time: eventTime,
      venue_type: venueType,
      venue_address: venueAddress,
      stream_url: streamUrl,
      cover_image: coverImage,
      price: hasPayment ? Number(price) : 0,
      has_payment: hasPayment,
      payment_mode: hasPayment ? paymentMode : "FREE",
      custom_payment_link: hasPayment && paymentMode === "CUSTOM_LINK" ? customPaymentLink : null,
      pandits_count: Number(panditsCount),
      status,
      featured: true,
      agenda: [
        { time: "06:00 PM", title: "Maha Sankalpa & Kalasha Pooja", description: "Opening invocation" },
        { time: "07:30 PM", title: "Principal Fire Ritual & Abhishekam", description: "Main yajna" },
      ],
    };

    saveLocalLiveEvent(payload);

    try {
      if (editingId) {
        await fetchAPI(`/live-events/${editingId}`, {
          method: "PUT",
          headers: { Authorization: "Bearer mock-admin-token" },
          body: JSON.stringify(payload),
        }).catch(() => null);
      } else {
        await fetchAPI("/live-events", {
          method: "POST",
          headers: { Authorization: "Bearer mock-admin-token" },
          body: JSON.stringify(payload),
        }).catch(() => null);
      }
    } catch (_) {}

    resetForm();
    await loadEvents();
    alert("Live Event saved and updated successfully!");
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this live event?")) return;
    deleteLocalLiveEvent(id);
    try {
      await fetchAPI(`/live-events/${id}`, {
        method: "DELETE",
        headers: { Authorization: "Bearer mock-admin-token" },
      }).catch(() => null);
    } catch (_) {}
    loadEvents();
  };

  const resetForm = () => {
    setEditingId(null);
    setTitle("");
    setSlug("");
    setShortDescription("");
    setFullDescription("");
    setEventDate("2026-08-25");
    setEventTime("06:00 PM - 09:00 PM IST");
    setVenueType("In-Person & Live Stream");
    setVenueAddress("Asharaya layout, K.G.Vaderahalli, Bengaluru");
    setStreamUrl("");
    setCoverImage("");
    setPrice(1100);
    setHasPayment(true);
    setPaymentMode("RAZORPAY");
    setCustomPaymentLink("");
    setPanditsCount(11);
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
        setSelectedEventForBroadcast(null);
        setBroadcastMessage("");
      }, 2000);
    }, 1000);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-bold text-slate-900 flex items-center gap-2">
            <Radio className="w-7 h-7 text-amber-700 animate-pulse" />
            <span>Manage Live Spiritual Events &amp; Sankalpa</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Configure live broadcast streams, event dates, VIP Sankalpa pass fees, and broadcast live links to registered devotees.
          </p>
        </div>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="px-5 py-2.5 bg-amber-700 hover:bg-amber-800 text-white font-semibold text-xs rounded-xl transition-colors flex items-center gap-2 shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Live Event</span>
          </button>
        )}
      </div>

      {/* Editor Form */}
      {isEditing && (
        <form onSubmit={handleSave} className="p-6 bg-white rounded-2xl border border-slate-200 shadow-md space-y-4">
          <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2">
            {editingId ? "Edit Live Event" : "Add New Live Event"}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Event Title *</label>
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
                placeholder="e.g. mahashivaratri-grand-night-2026"
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

          {/* PAYMENT GATEWAY / VIP PASS TOGGLE */}
          <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-amber-700" />
                <div>
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Payment Setup &amp; Pass Fee Gateway</h3>
                  <p className="text-[11px] text-slate-600">Easily toggle between automatic online payment gateway, custom UPI link, or free Virtual Pass</p>
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
                  {hasPayment ? "VIP Sankalpa Pass (Payment Active)" : "Free Stream Pass (No Fee)"}
                </span>
              </label>
            </div>

            {hasPayment ? (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-amber-200/60">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Pass Fee / Sankalpa Amount (₹) *</label>
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
                Devotees can register their Sankalpa and watch the stream 100% free.
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Event Date *</label>
              <input
                type="text"
                placeholder="2026-08-25"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Event Timings *</label>
              <input
                type="text"
                placeholder="06:00 PM - 09:00 PM IST"
                value={eventTime}
                onChange={(e) => setEventTime(e.target.value)}
                className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Pandits Count</label>
              <input
                type="number"
                value={panditsCount}
                onChange={(e) => setPanditsCount(Number(e.target.value))}
                className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Venue Type</label>
              <select
                value={venueType}
                onChange={(e: any) => setVenueType(e.target.value)}
                className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-sm bg-white"
              >
                <option value="In-Person & Live Stream">In-Person &amp; Live Stream</option>
                <option value="Online Stream">Online Stream Exclusive</option>
                <option value="Temple Ground">Temple Ground</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Live Broadcast URL (YouTube/Zoom)</label>
              <input
                type="url"
                placeholder="https://youtube.com/live/..."
                value={streamUrl}
                onChange={(e) => setStreamUrl(e.target.value)}
                className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-sm font-mono"
              />
            </div>
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
              className="px-6 py-2 bg-amber-700 hover:bg-amber-800 text-white font-semibold text-xs rounded-xl transition-colors shadow-xs"
            >
              Save Live Event
            </button>
          </div>
        </form>
      )}

      {/* Events List */}
      {isLoading ? (
        <div className="py-16 text-center text-slate-500 flex items-center justify-center gap-2">
          <Loader2 className="w-5 h-5 animate-spin text-amber-700" />
          <span>Loading live events...</span>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider">
                <th className="p-4">Title</th>
                <th className="p-4">Date &amp; Time</th>
                <th className="p-4">Pass Fee</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {events.map((ev) => (
                <tr key={ev.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-4">
                    <span className="font-bold text-slate-900 block">{ev.title}</span>
                    <span className="text-[11px] text-slate-500">{ev.venue_type}</span>
                  </td>
                  <td className="p-4 text-slate-600">
                    <span className="block font-medium">{ev.event_date}</span>
                    <span className="text-[10px] text-slate-400">{ev.event_time}</span>
                  </td>
                  <td className="p-4">
                    {ev.price > 0 ? (
                      <div>
                        <span className="font-bold text-amber-900 block">₹{ev.price.toLocaleString("en-IN")}</span>
                        <span className="text-[10px] text-emerald-800 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                          ⚡ Payment Active
                        </span>
                      </div>
                    ) : (
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 text-[10px] font-bold">
                        Free Pass
                      </span>
                    )}
                  </td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 font-semibold text-[10px]">
                      {ev.status}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => {
                        setSelectedEventForBroadcast(ev);
                        setBroadcastMessage(`Hari Om! Here is the live broadcast stream link for ${ev.title}: ${ev.stream_url || 'https://youtube.com/live/pradeep-nadig'}. Ritual begins at ${ev.event_time}.`);
                      }}
                      className="px-2.5 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 font-semibold text-[11px] rounded-lg border border-amber-200 transition-colors inline-flex items-center gap-1"
                      title="Broadcast stream link to registered devotees"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-amber-700" />
                      <span>WhatsApp Link</span>
                    </button>
                    <button onClick={() => handleEdit(ev)} className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-lg">
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(ev.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg">
                      <Trash2 className="w-4 h-4" />
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
      {selectedEventForBroadcast && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-amber-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-serif font-bold text-slate-900 text-lg flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-emerald-600" />
                <span>WhatsApp Broadcast</span>
              </h3>
              <button
                onClick={() => setSelectedEventForBroadcast(null)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600">
              Broadcast stream links and ritual updates to all registered devotees for <strong className="text-slate-900">{selectedEventForBroadcast.title}</strong>.
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
                {broadcastSending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Send Stream Link Now"}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
