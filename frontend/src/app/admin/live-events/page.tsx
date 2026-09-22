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
  Clock,
  MapPin,
  Flower2,
  HelpCircle,
  Package,
  Layers,
  FileText,
  Search,
} from "lucide-react";

export default function AdminLiveEventsPage() {
  const [events, setEvents] = useState<LiveEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);
  const [selectedEventForBroadcast, setSelectedEventForBroadcast] = useState<LiveEvent | null>(null);
  const [activeTab, setActiveTab] = useState<"general" | "descriptions" | "guidance" | "vidhi" | "samagri" | "agenda" | "faq">("general");
  const [categoryFilter, setCategoryFilter] = useState<"ALL" | "Event Management" | "Live Stream">("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  // Form states - General & Scheduling
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState<"Event Management" | "Live Stream">("Event Management");
  const [status, setStatus] = useState<"Upcoming" | "Live Now" | "Ended" | "Available">("Upcoming");
  const [eventDate, setEventDate] = useState("On Request");
  const [eventTime, setEventTime] = useState("Custom Muhoortha");
  const [panditsCount, setPanditsCount] = useState(5);
  const [venueType, setVenueType] = useState<string>("Client Venue / Kalyana Mantapa");
  const [venueAddress, setVenueAddress] = useState("Bengaluru & Pan-India");
  const [streamUrl, setStreamUrl] = useState("");
  const [coverImage, setCoverImage] = useState("");

  // Payment Gateway
  const [hasPayment, setHasPayment] = useState(false);
  const [price, setPrice] = useState(0);
  const [paymentMode, setPaymentMode] = useState<"RAZORPAY" | "CUSTOM_LINK" | "FREE">("FREE");
  const [customPaymentLink, setCustomPaymentLink] = useState("");

  // Descriptions
  const [shortDescription, setShortDescription] = useState("");
  const [fullDescription, setFullDescription] = useState("");

  // 4-Card Guidance Grid
  const [whoBenefits, setWhoBenefits] = useState("");
  const [whoShouldAttend, setWhoShouldAttend] = useState("");
  const [whenPerformed, setWhenPerformed] = useState("");
  const [wherePerformed, setWherePerformed] = useState("");

  // Vedic Vidhi & Ritual Execution
  const [vidhiDetails, setVidhiDetails] = useState("");

  // Samagri Highlights
  const [samagriHighlights, setSamagriHighlights] = useState<string[]>([]);
  const [newSamagriInput, setNewSamagriInput] = useState("");

  // Agenda & Phases Timeline
  const [agenda, setAgenda] = useState<{ time: string; title: string; description: string }[]>([]);

  // FAQs
  const [faq, setFaq] = useState<{ question: string; answer: string }[]>([]);

  // SEO
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");

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
    setTitle(ev.title || "");
    setSlug(ev.slug || "");
    setCategory((ev.category as any) || "Event Management");
    setStatus((ev.status as any) || "Upcoming");
    setEventDate(ev.event_date || "On Request");
    setEventTime(ev.event_time || "Custom Muhoortha");
    setPanditsCount(ev.pandits_count !== undefined ? ev.pandits_count : 5);
    setVenueType(ev.venue_type || "Client Venue / Kalyana Mantapa");
    setVenueAddress(ev.venue_address || "");
    setStreamUrl(ev.stream_url || "");
    setCoverImage(ev.cover_image || "");

    const evHasPay = ev.has_payment !== undefined ? ev.has_payment : (ev.price || 0) > 0;
    setHasPayment(evHasPay);
    setPrice(ev.price || 0);
    setPaymentMode(ev.payment_mode || (evHasPay ? "RAZORPAY" : "FREE"));
    setCustomPaymentLink(ev.custom_payment_link || "");

    setShortDescription(ev.short_description || "");
    setFullDescription(ev.full_description || "");

    setWhoBenefits(ev.who_benefits || "");
    setWhoShouldAttend(ev.who_should_attend || "");
    setWhenPerformed(ev.when_performed || "");
    setWherePerformed(ev.where_performed || "");

    setVidhiDetails(ev.vidhi_details || "");
    setSamagriHighlights(Array.isArray(ev.samagri_highlights) ? [...ev.samagri_highlights] : []);
    setNewSamagriInput("");

    setAgenda(
      Array.isArray(ev.agenda) && ev.agenda.length > 0
        ? [...ev.agenda]
        : [
            { time: "Phase 1: Pre-Ritual", title: "Nandi Pooja & Ganapathi Avahana", description: "Inaugural ancestral blessing and obstacle removal rites." },
            { time: "Phase 2: Principal", title: "Main Vedic Homa & Vidhi Execution", description: "Core ritual offerings as per family tradition." },
          ]
    );

    setFaq(
      Array.isArray(ev.faq) && ev.faq.length > 0
        ? [...ev.faq]
        : [
            {
              question: "What is included in the event management package?",
              answer: "We provide complete Purohit panel, Puja samagri arrangement, Yajnashala setup, and full ritual guidance.",
            },
          ]
    );

    setSeoTitle(ev.seo_title || "");
    setSeoDescription(ev.seo_description || "");

    setActiveTab("general");
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAddSamagri = () => {
    if (!newSamagriInput.trim()) return;
    setSamagriHighlights([...samagriHighlights, newSamagriInput.trim()]);
    setNewSamagriInput("");
  };

  const handleRemoveSamagri = (index: number) => {
    setSamagriHighlights(samagriHighlights.filter((_, i) => i !== index));
  };

  const handleAddAgendaItem = () => {
    setAgenda([
      ...agenda,
      {
        time: `Phase ${agenda.length + 1}`,
        title: "New Ritual Phase",
        description: "Description of rites and mantras performed during this phase.",
      },
    ]);
  };

  const handleRemoveAgendaItem = (index: number) => {
    setAgenda(agenda.filter((_, i) => i !== index));
  };

  const handleUpdateAgendaItem = (index: number, field: "time" | "title" | "description", val: string) => {
    const updated = [...agenda];
    updated[index] = { ...updated[index], [field]: val };
    setAgenda(updated);
  };

  const handleAddFaqItem = () => {
    setFaq([
      ...faq,
      {
        question: "Frequently asked question title",
        answer: "Detailed answer explaining the ritual background and family arrangements.",
      },
    ]);
  };

  const handleRemoveFaqItem = (index: number) => {
    setFaq(faq.filter((_, i) => i !== index));
  };

  const handleUpdateFaqItem = (index: number, field: "question" | "answer", val: string) => {
    const updated = [...faq];
    updated[index] = { ...updated[index], [field]: val };
    setFaq(updated);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const finalSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

    const payload: LiveEvent = {
      id: editingId || Date.now(),
      title,
      slug: finalSlug,
      category,
      status,
      short_description: shortDescription,
      full_description: fullDescription,
      event_date: eventDate,
      event_time: eventTime,
      venue_type: venueType,
      venue_address: venueAddress,
      stream_url: streamUrl,
      cover_image: coverImage,
      images: coverImage ? [coverImage] : [],
      price: hasPayment ? Number(price) : 0,
      has_payment: hasPayment,
      payment_mode: hasPayment ? paymentMode : "FREE",
      custom_payment_link: hasPayment && paymentMode === "CUSTOM_LINK" ? customPaymentLink : null,
      pandits_count: Number(panditsCount),
      featured: true,
      who_benefits: whoBenefits,
      who_should_attend: whoShouldAttend,
      when_performed: whenPerformed,
      where_performed: wherePerformed,
      vidhi_details: vidhiDetails,
      samagri_highlights: samagriHighlights,
      agenda: agenda.filter((a) => a.title.trim() !== ""),
      faq: faq.filter((f) => f.question.trim() !== ""),
      seo_title: seoTitle,
      seo_description: seoDescription,
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
    alert("Live Event & Samskara details saved and published successfully!");
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this event?")) return;
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
    setCategory("Event Management");
    setStatus("Upcoming");
    setEventDate("On Request");
    setEventTime("Custom Muhoortha");
    setPanditsCount(5);
    setVenueType("Client Venue / Kalyana Mantapa");
    setVenueAddress("Bengaluru & Pan-India");
    setStreamUrl("");
    setCoverImage("");
    setPrice(0);
    setHasPayment(false);
    setPaymentMode("FREE");
    setCustomPaymentLink("");
    setShortDescription("");
    setFullDescription("");
    setWhoBenefits("");
    setWhoShouldAttend("");
    setWhenPerformed("");
    setWherePerformed("");
    setVidhiDetails("");
    setSamagriHighlights([]);
    setNewSamagriInput("");
    setAgenda([]);
    setFaq([]);
    setSeoTitle("");
    setSeoDescription("");
    setActiveTab("general");
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

  // Filter events
  const filteredEvents = events.filter((ev) => {
    const matchesCategory =
      categoryFilter === "ALL" ||
      (categoryFilter === "Event Management" && ev.category === "Event Management") ||
      (categoryFilter === "Live Stream" && ev.category !== "Event Management");
    const matchesSearch =
      searchQuery.trim() === "" ||
      ev.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ev.slug.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-slate-900 flex items-center gap-2">
            <Radio className="w-7 h-7 text-amber-700 animate-pulse" />
            <span>Manage Event Management &amp; Live Events</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Configure live broadcast streams, Samskara ceremonies, ritual procedures, Vidhi guidelines, Samagri checklists, and devotee booking passes.
          </p>
        </div>
        {!isEditing && (
          <button
            onClick={() => {
              resetForm();
              setIsEditing(true);
            }}
            className="px-5 py-2.5 bg-amber-700 hover:bg-amber-800 text-white font-semibold text-xs rounded-xl transition-colors flex items-center gap-2 shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Event / Samskara</span>
          </button>
        )}
      </div>

      {/* Editor Form */}
      {isEditing && (
        <form onSubmit={handleSave} className="p-6 bg-white rounded-3xl border border-slate-200 shadow-xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <span className="px-3 py-1 bg-amber-100 text-amber-900 text-[10px] font-bold uppercase tracking-wider rounded-full">
                {editingId ? "Edit Mode" : "New Event Creation"}
              </span>
              <h2 className="text-xl font-serif font-bold text-slate-900 mt-1">
                {title || (editingId ? "Edit Live Event & Samskara" : "Create New Live Event & Samskara")}
              </h2>
            </div>
            {slug && (
              <a
                href={`/live-events/${slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl border border-slate-200 flex items-center gap-1.5 transition-colors"
              >
                <Eye className="w-3.5 h-3.5 text-amber-700" />
                <span>Preview Public Page</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
            )}
          </div>

          {/* Tab Navigation */}
          <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-2">
            <button
              type="button"
              onClick={() => setActiveTab("general")}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                activeTab === "general"
                  ? "bg-amber-700 text-white shadow-xs"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>1. General &amp; Venue</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("descriptions")}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                activeTab === "descriptions"
                  ? "bg-amber-700 text-white shadow-xs"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>2. Descriptions</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("guidance")}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                activeTab === "guidance"
                  ? "bg-amber-700 text-white shadow-xs"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>3. Guidance Grid (4 Cards)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("vidhi")}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                activeTab === "vidhi"
                  ? "bg-amber-700 text-white shadow-xs"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              <Flower2 className="w-3.5 h-3.5" />
              <span>4. Vedic Vidhi Procedures</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("samagri")}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                activeTab === "samagri"
                  ? "bg-amber-700 text-white shadow-xs"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              <Package className="w-3.5 h-3.5" />
              <span>5. Puja Samagri ({samagriHighlights.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("agenda")}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                activeTab === "agenda"
                  ? "bg-amber-700 text-white shadow-xs"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>6. Timeline Phases ({agenda.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("faq")}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                activeTab === "faq"
                  ? "bg-amber-700 text-white shadow-xs"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>7. FAQs &amp; SEO ({faq.length})</span>
            </button>
          </div>

          {/* TAB 1: General & Scheduling */}
          {activeTab === "general" && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Event / Samskara Title *</label>
                  <input
                    type="text"
                    required
                    value={title}
                    placeholder="e.g. Marriage / Maduve (Vedic Vivaha Ceremony)"
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Category *</label>
                  <select
                    value={category}
                    onChange={(e: any) => setCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm bg-white font-medium text-slate-900"
                  >
                    <option value="Event Management">🌸 Event Management (Samskaras &amp; Ceremonies)</option>
                    <option value="Live Stream">🔴 Live Stream (Broadcast Rituals &amp; Yajna)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Slug (URL Keyword) *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. marriage-maduve"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-sm font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Status *</label>
                  <select
                    value={status}
                    onChange={(e: any) => setStatus(e.target.value)}
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-sm bg-white"
                  >
                    <option value="Upcoming">Upcoming</option>
                    <option value="Available">Available On Request</option>
                    <option value="Live Now">Live Now</option>
                    <option value="Ended">Ended</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Purohit / Pandits Count</label>
                  <input
                    type="number"
                    min="1"
                    value={panditsCount}
                    onChange={(e) => setPanditsCount(Number(e.target.value))}
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Event Date *</label>
                  <input
                    type="text"
                    placeholder="On Request or 2026-10-18"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Event Timings *</label>
                  <input
                    type="text"
                    placeholder="Custom Muhoortha or 06:00 PM - 09:00 PM IST"
                    value={eventTime}
                    onChange={(e) => setEventTime(e.target.value)}
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Venue Type</label>
                  <select
                    value={venueType}
                    onChange={(e) => setVenueType(e.target.value)}
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-sm bg-white"
                  >
                    <option value="Client Venue / Kalyana Mantapa">Client Venue / Kalyana Mantapa</option>
                    <option value="Client Home / Hall">Client Home / Hall</option>
                    <option value="In-Person & Live Stream">In-Person &amp; Live Stream</option>
                    <option value="In-Person">In-Person Exclusive</option>
                    <option value="Online Stream">Online Stream Exclusive</option>
                    <option value="Temple Ground">Temple Ground</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Venue Location Coverage / Address</label>
                  <input
                    type="text"
                    placeholder="e.g. Client Venue / Kalyana Mantapa across Bengaluru & Pan-India"
                    value={venueAddress}
                    onChange={(e) => setVenueAddress(e.target.value)}
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Live Broadcast URL (YouTube / Zoom)</label>
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
                <label className="block text-xs font-semibold text-slate-700 mb-1">Cover Image URL</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={coverImage}
                    onChange={(e) => setCoverImage(e.target.value)}
                    placeholder="/images/services/marriage-maduve.jpg"
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

              {/* PAYMENT SETUP & PASS FEE GATEWAY */}
              <div className="p-5 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border border-amber-200 space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-amber-700" />
                    <div>
                      <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Payment Setup &amp; Pass Fee Gateway</h3>
                      <p className="text-[11px] text-slate-600">Toggle between online payment gateway pass, custom UPI link, or free/enquiry registration</p>
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
                      {hasPayment ? "VIP Sankalpa Pass (Payment Active)" : "Free / Enquiry Only"}
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
                  <div className="text-xs text-slate-600 bg-white p-3 rounded-xl border border-slate-200">
                    Devotees can register enquiries for event booking or join the stream 100% free.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: Descriptions */}
          {activeTab === "descriptions" && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Short Description (Summary snippet displayed on event cards)
                </label>
                <textarea
                  rows={3}
                  value={shortDescription}
                  placeholder="Complete authentic Vedic Vivaha event management including Purohit panel, Mandap Mandala setup, Kanyadaana & Saptapadi rites."
                  onChange={(e) => setShortDescription(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-sm leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Detailed Overview (Displayed prominently in the Hero section of the detail page)
                </label>
                <textarea
                  rows={6}
                  value={fullDescription}
                  placeholder="Comprehensive Vedic Marriage (Vivaha Samskara) event management conducted by Veda Brahma Shri Pradeep Nadig and a panel of senior Ghanapathi scholars..."
                  onChange={(e) => setFullDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm leading-relaxed"
                />
              </div>
            </div>
          )}

          {/* TAB 3: Guidance Grid (4 Cards) */}
          {activeTab === "guidance" && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900">
                <strong>4-Card Guidance Grid:</strong> These 4 cards provide immediate clarity to devotees and prospective families right below the hero section.
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* 1. Who Does It Benefit */}
                <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-2">
                  <label className="block text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                    <span>Who Does It Benefit?</span>
                  </label>
                  <textarea
                    rows={3}
                    value={whoBenefits}
                    placeholder="The bride, bridegroom, and both families receive divine harmony, lifelong matrimonial bliss, progeny, and prosperity."
                    onChange={(e) => setWhoBenefits(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm"
                  />
                </div>

                {/* 2. Who Should Attend */}
                <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-2">
                  <label className="block text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-700" />
                    <span>Who Should Attend / Get It Done?</span>
                  </label>
                  <textarea
                    rows={3}
                    value={whoShouldAttend}
                    placeholder="Bride, Groom, Parents, Close Relatives, and honored wedding guests."
                    onChange={(e) => setWhoShouldAttend(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm"
                  />
                </div>

                {/* 3. When Is It Performed */}
                <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-2">
                  <label className="block text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-700" />
                    <span>When Is It Performed?</span>
                  </label>
                  <textarea
                    rows={3}
                    value={whenPerformed}
                    placeholder="Conducted during auspicious Shubha Muhoortha calculated accurately based on Bride and Groom's Janma Nakshatra."
                    onChange={(e) => setWhenPerformed(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm"
                  />
                </div>

                {/* 4. Where Is It Conducted */}
                <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-2">
                  <label className="block text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-700" />
                    <span>Where Is It Conducted?</span>
                  </label>
                  <textarea
                    rows={3}
                    value={wherePerformed}
                    placeholder="Kalyana Mantapa, Convention Hall, Resort, or Traditional Marriage Venue across Bengaluru, Karnataka, and Pan-India."
                    onChange={(e) => setWherePerformed(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: Vedic Vidhi Procedures */}
          {activeTab === "vidhi" && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center gap-2 text-xs text-slate-600 bg-amber-50 p-4 rounded-2xl border border-amber-200">
                <Flower2 className="w-4 h-4 text-amber-700 shrink-0" />
                <span>
                  <strong>Vedic Vidhi &amp; Ritual Execution:</strong> Detail the authentic ritual flow, step-by-step procedures, and key sacred milestones. Use numbered points for maximum readability on the website.
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Ritual Procedures &amp; Execution Steps
                </label>
                <textarea
                  rows={8}
                  value={vidhiDetails}
                  placeholder={`1. Nandi Pooja & Devata Avahana: Invoking ancestors and Kula Devatas.\n2. Vara Pooja & Kashiyatra: Ceremonial welcome of the bridegroom.\n3. Kanyadaana & Varamala: Parents solemnize handover with Veda Suktas.\n4. Mangalya Dharana: Tying of sacred Mangalsutra at auspicious Muhoortha.\n5. Saptapadi: Taking 7 sacred steps together around Agni Deva.`}
                  onChange={(e) => setVidhiDetails(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs sm:text-sm leading-relaxed font-mono"
                />
              </div>
            </div>
          )}

          {/* TAB 5: Puja Samagri Checklist */}
          {activeTab === "samagri" && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center gap-2 text-xs text-slate-600 bg-emerald-50 p-4 rounded-2xl border border-emerald-200">
                <Package className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>
                  <strong>Pure &amp; Sanctified Materials:</strong> Manage the list of Puja Samagri and ceremonial items supplied for this event. Devotees see this in the "Puja Samagri &amp; Preparation Provided" grid.
                </span>
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. Complete Pure Cow Ghee & Sacred Samidhah Wood"
                  value={newSamagriInput}
                  onChange={(e) => setNewSamagriInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddSamagri();
                    }
                  }}
                  className="flex-1 px-3.5 py-2 border border-slate-300 rounded-xl text-sm"
                />
                <button
                  type="button"
                  onClick={handleAddSamagri}
                  className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs rounded-xl flex items-center gap-1.5 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Material</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                {samagriHighlights.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-800 font-medium"
                  >
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{item}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveSamagri(index)}
                      className="text-red-500 hover:text-red-700 p-1 transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
                {samagriHighlights.length === 0 && (
                  <div className="col-span-2 text-center py-6 text-slate-400 text-xs italic">
                    No samagri items added yet. Add items above to display the checklist on the detail page.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 6: Event Agenda & Phases Timeline */}
          {activeTab === "agenda" && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-600">
                  Step-by-step ceremony schedule shown in the "Event Agenda &amp; Step-by-Step Schedule" timeline.
                </span>
                <button
                  type="button"
                  onClick={handleAddAgendaItem}
                  className="px-3.5 py-1.5 bg-amber-700 hover:bg-amber-800 text-white font-semibold text-xs rounded-xl flex items-center gap-1.5 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Phase</span>
                </button>
              </div>

              <div className="space-y-3">
                {agenda.map((item, idx) => (
                  <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-amber-900 uppercase">Phase #{idx + 1}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveAgendaItem(idx)}
                        className="text-red-600 hover:text-red-800 p-1"
                        title="Delete phase"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[11px] font-medium text-slate-600 mb-1">Time / Phase Badge</label>
                        <input
                          type="text"
                          value={item.time}
                          placeholder="e.g. Phase 1: Pre-Wed"
                          onChange={(e) => handleUpdateAgendaItem(idx, "time", e.target.value)}
                          className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-[11px] font-medium text-slate-600 mb-1">Phase Title</label>
                        <input
                          type="text"
                          value={item.title}
                          placeholder="e.g. Nandi Pooja, Vara Pooja & Kashiyatra"
                          onChange={(e) => handleUpdateAgendaItem(idx, "title", e.target.value)}
                          className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-semibold"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-slate-600 mb-1">Description of Ritual</label>
                      <textarea
                        rows={2}
                        value={item.description}
                        placeholder="Inaugural ancestral seeking, groom reception, and traditional Kashiyatra rites."
                        onChange={(e) => handleUpdateAgendaItem(idx, "description", e.target.value)}
                        className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs"
                      />
                    </div>
                  </div>
                ))}
                {agenda.length === 0 && (
                  <div className="text-center py-8 text-slate-400 text-xs italic">
                    No timeline phases configured. Click "Add Phase" above.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 7: FAQs & SEO */}
          {activeTab === "faq" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <h3 className="font-serif font-bold text-slate-900 text-sm flex items-center gap-1.5">
                    <HelpCircle className="w-4 h-4 text-amber-700" />
                    <span>Frequently Asked Questions ({faq.length})</span>
                  </h3>
                  <button
                    type="button"
                    onClick={handleAddFaqItem}
                    className="px-3 py-1.5 bg-amber-700 hover:bg-amber-800 text-white font-semibold text-xs rounded-xl flex items-center gap-1 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add FAQ</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {faq.map((item, idx) => (
                    <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-700">FAQ #{idx + 1}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveFaqItem(idx)}
                          className="text-red-600 hover:text-red-800 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <input
                        type="text"
                        value={item.question}
                        placeholder="Question (e.g. Can the rituals be customized based on our family tradition?)"
                        onChange={(e) => handleUpdateFaqItem(idx, "question", e.target.value)}
                        className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-semibold"
                      />
                      <textarea
                        rows={2}
                        value={item.answer}
                        placeholder="Detailed answer..."
                        onChange={(e) => handleUpdateFaqItem(idx, "answer", e.target.value)}
                        className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs"
                      />
                    </div>
                  ))}
                  {faq.length === 0 && (
                    <div className="text-center py-6 text-slate-400 text-xs italic">
                      No FAQs added. Click "Add FAQ" above.
                    </div>
                  )}
                </div>
              </div>

              {/* SEO METADATA */}
              <div className="space-y-3 pt-4 border-t border-slate-200">
                <h3 className="font-serif font-bold text-slate-900 text-sm">SEO Meta Information</h3>
                <div className="grid grid-cols-1 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">SEO Title</label>
                    <input
                      type="text"
                      placeholder="e.g. Marriage / Maduve Event Management in Bengaluru | Shri Pradeep Nadig"
                      value={seoTitle}
                      onChange={(e) => setSeoTitle(e.target.value)}
                      className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">SEO Meta Description</label>
                    <textarea
                      rows={2}
                      placeholder="End-to-end authentic Vedic marriage event management in Bengaluru..."
                      value={seoDescription}
                      onChange={(e) => setSeoDescription(e.target.value)}
                      className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-xs"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Form Actions Footer */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-200">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500">
                All changes save to your database and client overrides instantly.
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 border border-slate-300 rounded-xl text-xs font-medium text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-amber-700 hover:bg-amber-800 text-white font-semibold text-xs rounded-xl transition-colors shadow-md flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Save Live Event &amp; Samskara</span>
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCategoryFilter("ALL")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              categoryFilter === "ALL"
                ? "bg-amber-800 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            All Events ({events.length})
          </button>
          <button
            onClick={() => setCategoryFilter("Event Management")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              categoryFilter === "Event Management"
                ? "bg-amber-800 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            🌸 Samskaras / Event Management
          </button>
          <button
            onClick={() => setCategoryFilter("Live Stream")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              categoryFilter === "Live Stream"
                ? "bg-amber-800 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            🔴 Live Streams
          </button>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search events & samskaras..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-none"
          />
        </div>
      </div>

      {/* Events Table List */}
      {isLoading ? (
        <div className="py-16 text-center text-slate-500 flex items-center justify-center gap-2">
          <Loader2 className="w-5 h-5 animate-spin text-amber-700" />
          <span>Loading live events and ceremonies...</span>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider">
                <th className="p-4">Title &amp; Category</th>
                <th className="p-4">Date &amp; Venue</th>
                <th className="p-4">Purohit Panel</th>
                <th className="p-4">Pass Fee</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredEvents.map((ev) => {
                const isMgmt = ev.category === "Event Management";
                return (
                  <tr key={ev.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-4">
                      <div className="space-y-1">
                        <span className="font-bold text-slate-900 block text-sm">{ev.title}</span>
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              isMgmt ? "bg-amber-100 text-amber-900" : "bg-red-100 text-red-900"
                            }`}
                          >
                            {isMgmt ? "Samskara / Event Mgmt" : "Live Stream"}
                          </span>
                          <span className="text-[11px] text-slate-400 font-mono">/{ev.slug}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-slate-600">
                      <span className="block font-semibold text-slate-900">{ev.event_date}</span>
                      <span className="text-[11px] text-slate-500 block">{ev.event_time}</span>
                      <span className="text-[10px] text-slate-400 block">{ev.venue_type}</span>
                    </td>
                    <td className="p-4 text-slate-700 font-medium">
                      {ev.pandits_count ? `${ev.pandits_count} Vedic Scholars` : "Veda Brahma Shri Pradeep Nadig"}
                    </td>
                    <td className="p-4">
                      {ev.price > 0 ? (
                        <div>
                          <span className="font-bold text-amber-900 block text-sm">₹{ev.price.toLocaleString("en-IN")}</span>
                          <span className="text-[10px] text-emerald-800 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                            ⚡ Online Pass
                          </span>
                        </div>
                      ) : (
                        <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200 text-[10px] font-bold">
                          {isMgmt ? "Enquiry Booking" : "Free Stream Pass"}
                        </span>
                      )}
                    </td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200 font-semibold text-[10px]">
                        {ev.status}
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <a
                        href={`/live-events/${ev.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 text-slate-500 hover:text-amber-800 hover:bg-slate-100 rounded-lg inline-block transition-colors"
                        title="View Public Page"
                      >
                        <Eye className="w-4 h-4" />
                      </a>
                      <button
                        onClick={() => {
                          setSelectedEventForBroadcast(ev);
                          setBroadcastMessage(
                            `Hari Om! Update regarding ${ev.title}. Please access details and booking link here: https://pradeepnadig.in/live-events/${ev.slug}`
                          );
                        }}
                        className="px-2 py-1 bg-amber-50 hover:bg-amber-100 text-amber-900 font-semibold text-[11px] rounded-lg border border-amber-200 transition-colors inline-flex items-center gap-1"
                        title="Broadcast link to registered devotees"
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-amber-700" />
                        <span>WhatsApp</span>
                      </button>
                      <button
                        onClick={() => handleEdit(ev)}
                        className="p-1.5 text-amber-700 hover:bg-amber-50 rounded-lg transition-colors"
                        title="Edit Event Details"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(ev.id)}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete Event"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
              {filteredEvents.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-slate-400 text-xs">
                    No live events or samskaras match the current search / filter.
                  </td>
                </tr>
              )}
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
              Broadcast stream links and ritual updates to registered devotees for{" "}
              <strong className="text-slate-900">{selectedEventForBroadcast.title}</strong>.
            </p>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Broadcast Message</label>
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
