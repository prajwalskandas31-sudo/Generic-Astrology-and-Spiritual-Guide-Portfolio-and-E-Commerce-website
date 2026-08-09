"use client";

import { useState, useEffect } from "react";
import { RequestThread, MessageLog, WorkshopRegistration } from "@/types";
import { fetchAPI, getAcceptedRequests, getWorkshopRegistrations } from "@/lib/api-client";
import {
  CalendarCheck,
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  MapPin,
  Search,
  Loader2,
  CheckCircle2,
  MessageSquare,
  FileText,
  X,
  Send,
  Filter,
  Sparkles,
  Check
} from "lucide-react";

interface CombinedAcceptedItem {
  id: string;
  source_type: "REQUEST" | "REGISTRATION";
  request_id: string;
  request_type: string;
  item_title: string;
  customer_name: string;
  customer_phone: string;
  customer_email?: string;
  location?: string;
  confirmed_date?: string;
  confirmed_time?: string;
  amount: number;
  payment_status: string;
  notes?: string;
  created_at: string;
  raw_request?: RequestThread;
  raw_registration?: WorkshopRegistration;
}

export default function AdminAcceptedPage() {
  const [items, setItems] = useState<CombinedAcceptedItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards");
  const [calendarSyncedIds, setCalendarSyncedIds] = useState<Record<string, boolean>>({});

  // Modals
  const [selectedLogsRequest, setSelectedLogsRequest] = useState<RequestThread | null>(null);
  const [timePickerRequest, setTimePickerRequest] = useState<RequestThread | null>(null);
  const [selectedTimeInput, setSelectedTimeInput] = useState("10:00 AM");
  const [isPerformingAction, setIsPerformingAction] = useState(false);

  useEffect(() => {
    loadAcceptedData();
    // Load local calendar sync state if saved
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("admin_gcal_synced_ids");
        if (saved) setCalendarSyncedIds(JSON.parse(saved));
      } catch (_) {}
    }
  }, []);

  const loadAcceptedData = async () => {
    setIsLoading(true);
    const combined: CombinedAcceptedItem[] = [];

    // 1. Fetch confirmed requests (Services, Consultations, Workshops, Classes)
    try {
      const requests = await getAcceptedRequests();
      requests.forEach((req) => {
        combined.push({
          id: `req-${req.id}`,
          source_type: "REQUEST",
          request_id: req.request_id,
          request_type: req.request_type || "Service",
          item_title: req.service_name || req.workshop_name || req.request_type,
          customer_name: req.customer?.name || "Client",
          customer_phone: req.customer?.phone || "",
          customer_email: req.customer?.email,
          location: req.city ? `${req.city}${req.state ? `, ${req.state}` : ""}` : undefined,
          confirmed_date: req.selected_date || req.preferred_date || "Date to be fixed",
          confirmed_time: req.selected_time || req.preferred_time || "Time to be fixed",
          amount: req.amount || 0,
          payment_status: req.payment_status || "Pending",
          notes: req.notes,
          created_at: req.created_at,
          raw_request: req,
        });
      });
    } catch (err) {
      console.error("Failed to load accepted requests:", err);
    }

    // 2. Fetch paid workshop registrations
    try {
      const registrations = await getWorkshopRegistrations();
      registrations.forEach((reg) => {
        const exists = combined.some(
          (c) => c.customer_phone === reg.mobile && c.item_title.includes("Workshop")
        );
        if (!exists || reg.payment_status === "Paid") {
          combined.push({
            id: `reg-${reg.id}`,
            source_type: "REGISTRATION",
            request_id: reg.razorpay_order_id || `REG-${reg.id}`,
            request_type: "Workshop",
            item_title: "Workshop Registration",
            customer_name: reg.name,
            customer_phone: reg.mobile,
            customer_email: reg.email,
            location: `${reg.city}, ${reg.state}`,
            confirmed_date: "Batch Date",
            confirmed_time: "Batch Time",
            amount: reg.amount || 0,
            payment_status: reg.payment_status,
            notes: reg.additional_notes,
            created_at: reg.created_at || new Date().toISOString(),
            raw_registration: reg,
          });
        }
      });
    } catch (err) {
      console.error("Failed to load workshop registrations:", err);
    }

    setItems(combined);
    setIsLoading(false);
  };

  const handleAction = async (requestIdStr: string, actionName: string, extraPayload: any = {}) => {
    setIsPerformingAction(true);
    try {
      await fetchAPI(`/requests/${requestIdStr}/action`, {
        method: "POST",
        headers: { Authorization: "Bearer mock-admin-token" },
        body: JSON.stringify({ action: actionName, ...extraPayload }),
      });
      setTimePickerRequest(null);
      await loadAcceptedData();
    } catch (err: any) {
      alert(`Action error: ${err.message || "Failed to execute action"}`);
    } finally {
      setIsPerformingAction(false);
    }
  };

  // Google Calendar Link Builder
  const getGoogleCalendarUrl = (item: CombinedAcceptedItem) => {
    const title = encodeURIComponent(`[Accepted] ${item.request_type}: ${item.item_title} - ${item.customer_name}`);
    const details = encodeURIComponent(
      `Veda Brahma Shri Pradeep Nadig Consultation / Booking\n\n` +
      `👤 Client: ${item.customer_name}\n` +
      `📞 Mobile: +${item.customer_phone}\n` +
      `📧 Email: ${item.customer_email || "N/A"}\n` +
      `📍 Location: ${item.location || "Online / Temple"}\n` +
      `📋 Request ID: ${item.request_id}\n` +
      `💰 Payment: ₹${item.amount} (${item.payment_status})\n` +
      `📝 Notes: ${item.notes || "None"}`
    );
    const location = encodeURIComponent(item.location || "Bengaluru, Karnataka, India");

    let startTimeStr = "20260810T100000";
    let endTimeStr = "20260810T110000";

    if (item.confirmed_date && item.confirmed_date.match(/\d{4}-\d{2}-\d{2}/)) {
      const cleanDate = item.confirmed_date.replace(/-/g, "");
      startTimeStr = `${cleanDate}T100000`;
      endTimeStr = `${cleanDate}T110000`;
    }

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${startTimeStr}/${endTimeStr}`;
  };

  const markGoogleCalendarSynced = (itemId: string, url: string) => {
    const updated = { ...calendarSyncedIds, [itemId]: true };
    setCalendarSyncedIds(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem("admin_gcal_synced_ids", JSON.stringify(updated));
    }
    window.open(url, "_blank");
  };

  // Filter items
  const filteredItems = items.filter((item) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      item.request_id.toLowerCase().includes(term) ||
      item.customer_name.toLowerCase().includes(term) ||
      item.customer_phone.includes(term) ||
      item.item_title.toLowerCase().includes(term) ||
      (item.location || "").toLowerCase().includes(term);

    const matchesType =
      typeFilter === "all"
        ? true
        : item.request_type.toLowerCase() === typeFilter.toLowerCase();

    return matchesSearch && matchesType;
  });

  // Calculate statistics
  const totalAmount = items.reduce((acc, curr) => acc + (curr.amount || 0), 0);
  const consultationCount = items.filter((i) => i.request_type.toLowerCase().includes("consult")).length;
  const serviceCount = items.filter((i) => i.request_type.toLowerCase().includes("service")).length;
  const workshopCount = items.filter((i) => i.request_type.toLowerCase().includes("workshop")).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-slate-900 flex items-center gap-2.5">
            <CalendarCheck className="w-8 h-8 text-emerald-700" />
            <span>Accepted Entries &amp; Schedule</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Confirmed consultations, accepted ritual services, and registered workshop participants ready for Google Calendar tagging.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => loadAcceptedData()}
            className="px-3.5 py-2 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl text-xs font-semibold text-slate-700 shadow-xs flex items-center gap-1.5 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Metric Stats Banner */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Total Accepted</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold text-slate-900">{items.length}</span>
            <span className="text-xs text-emerald-600 font-semibold">Confirmed</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Consultations</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold text-amber-900">{consultationCount}</span>
            <span className="text-xs text-amber-700 font-medium">Slots</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Services &amp; Rituals</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold text-purple-900">{serviceCount}</span>
            <span className="text-xs text-purple-700 font-medium">Bookings</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Workshops &amp; Value</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold text-emerald-900">{workshopCount}</span>
            <span className="text-xs font-mono font-semibold text-slate-600">| ₹{totalAmount}</span>
          </div>
        </div>
      </div>

      {/* Filter and View Controls */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search Client Name, ID, Phone, City..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-amber-500 w-full"
          />
        </div>

        {/* Filters & View Toggles */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
            <Filter className="w-3.5 h-3.5 text-slate-500 ml-2" />
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="bg-transparent text-xs font-semibold text-slate-700 border-none focus:ring-0 cursor-pointer pr-2"
            >
              <option value="all">All Service Types</option>
              <option value="consultation">Consultations</option>
              <option value="service">Services &amp; Rituals</option>
              <option value="workshop">Workshops</option>
              <option value="class">Classes</option>
            </select>
          </div>

          <div className="flex bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setViewMode("cards")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === "cards" ? "bg-white text-slate-900 shadow-xs" : "text-slate-500 hover:text-slate-900"
              }`}
            >
              Cards
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === "table" ? "bg-white text-slate-900 shadow-xs" : "text-slate-500 hover:text-slate-900"
              }`}
            >
              Table
            </button>
          </div>
        </div>
      </div>

      {/* Main List Display */}
      {isLoading ? (
        <div className="py-20 text-center text-slate-500 flex items-center justify-center gap-2">
          <Loader2 className="w-6 h-6 animate-spin text-amber-700" />
          <span>Loading accepted entries...</span>
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="py-16 text-center bg-white rounded-2xl border border-slate-200 p-8 space-y-3">
          <CalendarCheck className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-lg font-bold text-slate-800">No Accepted Entries Found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            When you ACCEPT incoming consultation, service, or workshop requests from the Enquiries page, they will appear here ready for Google Calendar sync.
          </p>
        </div>
      ) : viewMode === "table" ? (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider">
                <th className="p-4">Request / Booking</th>
                <th className="p-4">Client Contact</th>
                <th className="p-4">Confirmed Date &amp; Time</th>
                <th className="p-4">Payment</th>
                <th className="p-4">Google Calendar</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredItems.map((item) => {
                const isSynced = calendarSyncedIds[item.id];
                const gcalUrl = getGoogleCalendarUrl(item);

                return (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded text-[10px]">
                          {item.request_id}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                          {item.request_type}
                        </span>
                      </div>
                      <span className="font-bold text-slate-900 block">{item.item_title}</span>
                      {item.notes && <span className="text-[10px] text-slate-400 italic truncate max-w-xs block">&quot;{item.notes}&quot;</span>}
                    </td>

                    <td className="p-4">
                      <span className="font-bold text-slate-900 block">{item.customer_name}</span>
                      <div className="flex items-center gap-1 text-slate-600 font-mono text-[11px]">
                        <span>+{item.customer_phone}</span>
                        <a
                          href={`https://wa.me/${item.customer_phone}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-1 text-emerald-600 hover:text-emerald-700 font-sans font-bold text-[10px] underline"
                        >
                          WhatsApp
                        </a>
                      </div>
                      {item.location && <span className="text-slate-400 text-[10px] block">{item.location}</span>}
                    </td>

                    <td className="p-4">
                      <div className="flex items-center gap-1.5 font-semibold text-slate-800">
                        <Calendar className="w-3.5 h-3.5 text-amber-700" />
                        <span>{item.confirmed_date}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-500 text-[11px] mt-0.5">
                        <Clock className="w-3.5 h-3.5 text-amber-700" />
                        <span>{item.confirmed_time}</span>
                      </div>
                    </td>

                    <td className="p-4">
                      <span className="font-bold text-amber-800 block">₹{item.amount}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold inline-block mt-0.5 ${
                        item.payment_status === "Paid" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                      }`}>
                        {item.payment_status}
                      </span>
                    </td>

                    <td className="p-4">
                      {isSynced ? (
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1 w-fit">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>Tagged in GCal</span>
                        </span>
                      ) : (
                        <button
                          onClick={() => markGoogleCalendarSynced(item.id, gcalUrl)}
                          className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 rounded-xl font-bold text-[11px] flex items-center gap-1.5 transition-all"
                        >
                          <CalendarCheck className="w-3.5 h-3.5 text-amber-700" />
                          <span>Add to Google Calendar</span>
                        </button>
                      )}
                    </td>

                    <td className="p-4 text-right space-x-1">
                      {item.raw_request && (
                        <button
                          onClick={() => setSelectedLogsRequest(item.raw_request!)}
                          className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg"
                          title="View Logs"
                        >
                          <FileText className="w-4 h-4" />
                        </button>
                      )}
                      {item.raw_request && (
                        <button
                          onClick={() => setTimePickerRequest(item.raw_request!)}
                          className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg"
                          title="Reschedule Slot"
                        >
                          <Clock className="w-4 h-4" />
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        /* Cards View */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredItems.map((item) => {
            const isSynced = calendarSyncedIds[item.id];
            const gcalUrl = getGoogleCalendarUrl(item);

            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow overflow-hidden flex flex-col justify-between"
              >
                {/* Header */}
                <div className="bg-slate-50 border-b border-slate-200 p-4 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-amber-900 text-xs bg-amber-100 px-2.5 py-1 rounded-lg">
                      {item.request_id}
                    </span>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                      ACCEPTED
                    </span>
                  </div>

                  <span className="text-[10px] text-slate-400 font-mono">
                    {new Date(item.created_at).toLocaleDateString()}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5 space-y-4 text-xs">
                  {/* Service Title */}
                  <div>
                    <span className="text-[10px] uppercase font-bold text-amber-800 tracking-wider block">
                      {item.request_type}
                    </span>
                    <h3 className="font-serif font-bold text-slate-900 text-base mt-0.5">
                      {item.item_title}
                    </h3>
                  </div>

                  {/* Date & Slot Highlight */}
                  <div className="p-3 bg-amber-50/70 border border-amber-200/80 rounded-xl flex flex-wrap items-center justify-between gap-3 text-amber-950 font-medium">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-amber-700 shrink-0" />
                      <div>
                        <span className="text-[10px] text-amber-800 block leading-tight uppercase font-semibold">Confirmed Date</span>
                        <strong className="font-bold text-slate-900">{item.confirmed_date}</strong>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-amber-700 shrink-0" />
                      <div>
                        <span className="text-[10px] text-amber-800 block leading-tight uppercase font-semibold">Time Slot</span>
                        <strong className="font-bold text-slate-900">{item.confirmed_time}</strong>
                      </div>
                    </div>
                  </div>

                  {/* Customer Info */}
                  <div className="space-y-1.5 pt-1 text-slate-600">
                    <div className="flex items-center gap-2">
                      <User className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                      <strong className="text-slate-900 font-bold">{item.customer_name}</strong>
                    </div>

                    <div className="flex items-center gap-2 font-mono text-[11px]">
                      <Phone className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                      <span>+{item.customer_phone}</span>
                      <a
                        href={`https://wa.me/${item.customer_phone}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-auto text-emerald-700 hover:text-emerald-800 font-sans font-bold text-[10px] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1"
                      >
                        <MessageSquare className="w-3 h-3" />
                        <span>Chat WhatsApp</span>
                      </a>
                    </div>

                    {item.customer_email && (
                      <div className="flex items-center gap-2">
                        <Mail className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                        <span className="truncate">{item.customer_email}</span>
                      </div>
                    )}

                    {item.location && (
                      <div className="flex items-center gap-2 text-slate-500">
                        <MapPin className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                        <span>{item.location}</span>
                      </div>
                    )}

                    {item.notes && (
                      <div className="p-2 bg-slate-50 rounded-lg text-slate-500 italic border border-slate-100 mt-2">
                        &quot;{item.notes}&quot;
                      </div>
                    )}
                  </div>

                  {/* Amount & Payment */}
                  <div className="flex justify-between items-center pt-2 border-t border-slate-100">
                    <span className="text-slate-500">Payment status:</span>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">₹{item.amount}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        item.payment_status === "Paid" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                      }`}>
                        {item.payment_status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="bg-slate-50 border-t border-slate-200 p-4 flex flex-wrap items-center justify-between gap-2">
                  {/* Google Calendar Tag Button */}
                  {isSynced ? (
                    <span className="px-3 py-1.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl font-bold text-xs flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Tagged in Google Calendar</span>
                    </span>
                  ) : (
                    <button
                      onClick={() => markGoogleCalendarSynced(item.id, gcalUrl)}
                      className="px-4 py-2 bg-amber-800 hover:bg-amber-900 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-xs transition-all"
                    >
                      <CalendarCheck className="w-4 h-4" />
                      <span>Add to Google Calendar</span>
                    </button>
                  )}

                  {/* Actions */}
                  <div className="flex items-center gap-1">
                    {item.raw_request && (
                      <button
                        onClick={() => setSelectedLogsRequest(item.raw_request!)}
                        className="px-3 py-2 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-semibold rounded-xl text-xs flex items-center gap-1 transition-colors"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>Logs</span>
                      </button>
                    )}

                    {item.raw_request && (
                      <button
                        onClick={() => handleAction(item.raw_request!.request_id, "MARK_COMPLETED")}
                        disabled={isPerformingAction}
                        className="px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center gap-1 transition-colors shadow-xs"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Complete</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Reschedule Modal */}
      {timePickerRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-serif font-bold text-lg text-slate-900">
                Reschedule Request: {timePickerRequest.request_id}
              </h3>
              <button onClick={() => setTimePickerRequest(null)} className="p-1 rounded-full text-slate-400 hover:bg-slate-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600">
              Select updated time slot for client {timePickerRequest.customer?.name}:
            </p>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Time Slot</label>
                <select
                  value={selectedTimeInput}
                  onChange={(e) => setSelectedTimeInput(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-amber-500"
                >
                  <option value="10:00 AM">10:00 AM</option>
                  <option value="11:00 AM">11:00 AM</option>
                  <option value="12:00 PM">12:00 PM</option>
                  <option value="04:00 PM">04:00 PM</option>
                  <option value="05:00 PM">05:00 PM</option>
                  <option value="06:00 PM">06:00 PM</option>
                </select>
              </div>

              <div className="flex gap-2 justify-end pt-2">
                <button
                  onClick={() => setTimePickerRequest(null)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 text-xs font-semibold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleAction(timePickerRequest.request_id, "CHANGE_TIME", { selected_time: selectedTimeInput })}
                  disabled={isPerformingAction}
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-md"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Update &amp; Notify</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Message History Modal */}
      {selectedLogsRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-4 max-h-[85vh] flex flex-col">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-serif font-bold text-lg text-slate-900">
                  Action &amp; Message History
                </h3>
                <span className="font-mono text-xs font-semibold text-amber-800">
                  {selectedLogsRequest.request_id} &mdash; {selectedLogsRequest.customer?.name}
                </span>
              </div>
              <button
                onClick={() => setSelectedLogsRequest(null)}
                className="p-1 rounded-full text-slate-400 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto space-y-3 flex-1 pr-2">
              {(!selectedLogsRequest.message_logs || selectedLogsRequest.message_logs.length === 0) ? (
                <div className="text-center py-8 text-slate-400 text-xs">No message logs recorded yet.</div>
              ) : (
                selectedLogsRequest.message_logs.map((log: MessageLog) => (
                  <div
                    key={log.id}
                    className={`p-3.5 rounded-xl border text-xs space-y-1 ${
                      log.direction === "OUTBOUND"
                        ? "bg-amber-50/60 border-amber-200 ml-6"
                        : "bg-slate-50 border-slate-200 mr-6"
                    }`}
                  >
                    <div className="flex justify-between items-center text-[10px] text-slate-500 font-mono">
                      <span className="font-bold text-slate-700">
                        {log.direction} ({log.channel}) &bull; {log.message_type}
                      </span>
                      <span>{new Date(log.timestamp).toLocaleString()}</span>
                    </div>
                    <p className="whitespace-pre-line text-slate-800 font-sans">{log.message_content}</p>
                  </div>
                ))
              )}
            </div>

            <div className="pt-2 border-t border-slate-100 text-right">
              <button
                onClick={() => setSelectedLogsRequest(null)}
                className="px-5 py-2 bg-amber-800 hover:bg-amber-900 text-white font-semibold rounded-xl text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
