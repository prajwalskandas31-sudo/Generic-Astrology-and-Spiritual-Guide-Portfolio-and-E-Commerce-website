"use client";

import { useState, useEffect } from "react";
import { RequestThread, MessageLog, WorkshopRegistration } from "@/types";
import { fetchAPI, getWorkshopRegistrations, executeRequestAction, deleteRequest, deleteWorkshopRegistration } from "@/lib/api-client";
import {
  MessageSquare,
  CheckCircle2,
  XCircle,
  Clock,
  Archive,
  Check,
  Search,
  Loader2,
  Calendar,
  User,
  Phone,
  Mail,
  MapPin,
  FileText,
  CreditCard,
  History,
  X,
  Send,
  AlertCircle,
  Users,
  Trash2
} from "lucide-react";

export default function AdminRequestsPage() {
  const [activeTab, setActiveTab] = useState<"active" | "rejected" | "registrations" | "archived">("active");
  const [requests, setRequests] = useState<RequestThread[]>([]);
  const [registrations, setRegistrations] = useState<WorkshopRegistration[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [selectedLogsRequest, setSelectedLogsRequest] = useState<RequestThread | null>(null);
  const [timePickerRequest, setTimePickerRequest] = useState<RequestThread | null>(null);
  const [selectedTimeInput, setSelectedTimeInput] = useState("10:00 AM");
  const [isPerformingAction, setIsPerformingAction] = useState(false);

  const [selectedRequestIds, setSelectedRequestIds] = useState<string[]>([]);
  const [selectedRegistrationIds, setSelectedRegistrationIds] = useState<number[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const tabParam = urlParams.get("tab");
      if (tabParam === "registrations" || tabParam === "archived" || tabParam === "active" || tabParam === "rejected") {
        setActiveTab(tabParam as any);
      }
    }
  }, []);

  useEffect(() => {
    if (activeTab === "registrations") {
      loadRegistrations();
    } else {
      loadRequests();
    }
  }, [activeTab]);

  const loadRequests = async () => {
    setIsLoading(true);
    try {
      const data = await fetchAPI<RequestThread[]>(`/requests?tab=${activeTab}`, {
        headers: { Authorization: "Bearer mock-admin-token" },
      });
      if (Array.isArray(data) && data.length > 0) {
        setRequests(data);
        setIsLoading(false);
        return;
      }
    } catch (err: any) {
      console.warn("Failed to load request threads, attempting /admin/stats fallback:", err);
    }

    try {
      const stats = await fetchAPI<any>("/admin/stats", {
        headers: { Authorization: "Bearer mock-admin-token" },
      });
      if (stats && Array.isArray(stats.recent_enquiries)) {
        const mapped: RequestThread[] = stats.recent_enquiries.map((enq: any) => ({
          id: enq.id,
          request_id: `REQ-${enq.id}`,
          request_type: enq.enquiry_type || "Enquiry",
          service_name: enq.category || "General Enquiry",
          customer: {
            name: enq.name,
            phone: enq.mobile,
            email: enq.email,
          },
          city: enq.city,
          notes: enq.additional_notes,
          status: enq.status || "NEW",
          amount: 0,
          payment_status: "N/A",
          created_at: enq.created_at || new Date().toISOString(),
          message_logs: [],
        }));
        setRequests(mapped);
      }
    } catch (_) {}
    setIsLoading(false);
  };

  const loadRegistrations = async () => {
    setIsLoading(true);
    try {
      const data = await getWorkshopRegistrations();
      setRegistrations(data);
    } catch (err: any) {
      console.error("Failed to load workshop registrations:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAction = async (requestId: string, actionName: string, extraPayload: any = {}) => {
    setIsPerformingAction(true);
    try {
      await executeRequestAction(requestId, actionName, extraPayload);
      setTimePickerRequest(null);
      await loadRequests();
    } catch (err: any) {
      alert(`Action error: ${err.message || "Failed to execute action"}`);
    } finally {
      setIsPerformingAction(false);
    }
  };

  const handleDeleteRequest = async (requestId: string) => {
    if (!confirm(`Are you sure you want to permanently delete Request ${requestId}? This action cannot be undone.`)) return;
    setIsPerformingAction(true);
    try {
      await deleteRequest(requestId);
      await loadRequests();
    } catch (err: any) {
      alert(`Failed to delete request: ${err.message}`);
    } finally {
      setIsPerformingAction(false);
    }
  };

  const handleDeleteRegistration = async (id: number, name: string) => {
    if (!confirm(`Are you sure you want to delete workshop registration for ${name}? This action cannot be undone.`)) return;
    setIsPerformingAction(true);
    try {
      await deleteWorkshopRegistration(id);
      await loadRegistrations();
    } catch (err: any) {
      alert(`Failed to delete registration: ${err.message}`);
    } finally {
      setIsPerformingAction(false);
    }
  };

  const toggleSelectRequest = (reqId: string) => {
    setSelectedRequestIds((prev) =>
      prev.includes(reqId) ? prev.filter((id) => id !== reqId) : [...prev, reqId]
    );
  };
  const handleSelectAllRequests = () => {
    setSelectedRequestIds(filteredRequests.map((r) => r.request_id));
  };
  const handleDeselectAllRequests = () => {
    setSelectedRequestIds([]);
  };
  const handleBulkDeleteRequests = async () => {
    if (selectedRequestIds.length === 0) return;
    if (!confirm(`Are you sure you want to delete ${selectedRequestIds.length} selected request thread(s)?`)) return;
    setIsPerformingAction(true);
    try {
      for (const reqId of selectedRequestIds) {
        await deleteRequest(reqId);
      }
      setSelectedRequestIds([]);
      await loadRequests();
    } catch (err: any) {
      alert("Error deleting requests: " + err.message);
    } finally {
      setIsPerformingAction(false);
    }
  };

  const toggleSelectRegistration = (regId: number) => {
    setSelectedRegistrationIds((prev) =>
      prev.includes(regId) ? prev.filter((id) => id !== regId) : [...prev, regId]
    );
  };
  const handleSelectAllRegistrations = () => {
    setSelectedRegistrationIds(filteredRegistrations.map((r) => r.id));
  };
  const handleDeselectAllRegistrations = () => {
    setSelectedRegistrationIds([]);
  };
  const handleBulkDeleteRegistrations = async () => {
    if (selectedRegistrationIds.length === 0) return;
    if (!confirm(`Are you sure you want to delete ${selectedRegistrationIds.length} selected registration(s)?`)) return;
    setIsPerformingAction(true);
    try {
      await bulkDeleteWorkshopRegistrations(selectedRegistrationIds);
      setSelectedRegistrationIds([]);
      await loadRegistrations();
    } catch (err: any) {
      alert("Error deleting registrations: " + err.message);
    } finally {
      setIsPerformingAction(false);
    }
  };

  const filteredRequests = requests.filter((req) => {
    const matchesSearch =
      req.request_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (req.customer?.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (req.customer?.phone || "").includes(searchTerm) ||
      (req.service_name || req.workshop_name || "").toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType =
      typeFilter === "all"
        ? true
        : req.request_type.toLowerCase() === typeFilter.toLowerCase();

    return matchesSearch && matchesType;
  });

  const filteredRegistrations = registrations.filter((reg) => {
    const term = searchTerm.toLowerCase();
    return (
      reg.name.toLowerCase().includes(term) ||
      reg.mobile.includes(term) ||
      (reg.email || "").toLowerCase().includes(term) ||
      (reg.city || "").toLowerCase().includes(term) ||
      (reg.razorpay_order_id || "").toLowerCase().includes(term)
    );
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "NEW":
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300">🟡 NEW</span>;
      case "PENDING":
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-orange-100 text-orange-800 border border-orange-200">🟠 PENDING</span>;
      case "CONFIRMED":
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">🟢 CONFIRMED</span>;
      case "RESCHEDULE_REQUESTED":
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800 border border-blue-200">🔵 RESCHEDULE</span>;
      case "REJECTED":
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-red-100 text-red-800 border border-red-200">🔴 REJECTED</span>;
      case "CANCELLED":
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-300">⚪ CANCELLED</span>;
      case "COMPLETED":
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-purple-100 text-purple-800 border border-purple-200">✓ COMPLETED</span>;
      case "ARCHIVED":
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-gray-100 text-gray-700 border border-gray-300">📦 ARCHIVED</span>;
      default:
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-100 text-slate-800">{status}</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-serif font-bold text-slate-900 flex items-center gap-2">
          <MessageSquare className="w-8 h-8 text-amber-700" />
          <span>Enquiries, Request Threads &amp; Workshop Registrations</span>
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Manage all incoming customer requests, consultation threads, and confirmed workshop participant registrations.
        </p>
      </div>

      {/* Controls & Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        {/* Tabs */}
        <div className="flex bg-slate-100 p-1 rounded-xl w-fit">
          <button
            onClick={() => setActiveTab("active")}
            className={`px-5 py-2 font-semibold text-xs rounded-lg transition-all ${
              activeTab === "active"
                ? "bg-white text-amber-900 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            ACTIVE REQUESTS
          </button>
          <button
            onClick={() => setActiveTab("rejected")}
            className={`px-5 py-2 font-semibold text-xs rounded-lg transition-all ${
              activeTab === "rejected"
                ? "bg-white text-red-900 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            REJECTED &amp; CANCELLED
          </button>
          <button
            onClick={() => setActiveTab("registrations")}
            className={`px-5 py-2 font-semibold text-xs rounded-lg transition-all ${
              activeTab === "registrations"
                ? "bg-white text-amber-900 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            WORKSHOP REGISTRATIONS
          </button>
          <button
            onClick={() => setActiveTab("archived")}
            className={`px-5 py-2 font-semibold text-xs rounded-lg transition-all ${
              activeTab === "archived"
                ? "bg-white text-amber-900 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            COMPLETED / ARCHIVED
          </button>
        </div>

        {/* Search & Type Filter */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder={activeTab === "registrations" ? "Search Name, Phone, City, Order ID..." : "Search Request ID, Name, Phone..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-amber-500 w-64"
            />
          </div>

          {activeTab !== "registrations" && (
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-amber-500"
            >
              <option value="all">All Request Types</option>
              <option value="consultation">Consultations</option>
              <option value="service">Services</option>
              <option value="workshop">Workshops</option>
              <option value="class enquiry">Classes</option>
            </select>
          )}
        </div>
      </div>

      {/* Main Content List */}
      {isLoading ? (
        <div className="py-20 text-center text-slate-500 flex items-center justify-center gap-2">
          <Loader2 className="w-6 h-6 animate-spin text-amber-700" />
          <span>Loading data...</span>
        </div>
      ) : activeTab === "registrations" ? (
        filteredRegistrations.length === 0 ? (
          <div className="py-16 text-center bg-white rounded-2xl border border-slate-200 p-8 space-y-3">
            <Users className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-lg font-bold text-slate-800">No Workshop Registrations Found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              No participant registrations recorded yet or matching your search filter.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center justify-between bg-slate-100 p-3 rounded-xl border border-slate-200">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleSelectAllRegistrations}
                  className="px-3 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-900 font-semibold text-xs rounded-lg transition-colors"
                >
                  Select All ({filteredRegistrations.length})
                </button>
                <button
                  onClick={handleDeselectAllRegistrations}
                  className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold text-xs rounded-lg transition-colors"
                >
                  Deselect All
                </button>
              </div>
              {selectedRegistrationIds.length > 0 && (
                <button
                  onClick={handleBulkDeleteRegistrations}
                  disabled={isPerformingAction}
                  className="px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Delete Selected ({selectedRegistrationIds.length})</span>
                </button>
              )}
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider">
                    <th className="p-4 w-10">
                      <input
                        type="checkbox"
                        checked={
                          filteredRegistrations.length > 0 &&
                          selectedRegistrationIds.length === filteredRegistrations.length
                        }
                        onChange={(e) => {
                          if (e.target.checked) handleSelectAllRegistrations();
                          else handleDeselectAllRegistrations();
                        }}
                        className="w-4 h-4 text-amber-600 rounded-sm focus:ring-amber-500"
                      />
                    </th>
                    <th className="p-4">Participant Name</th>
                    <th className="p-4">Mobile &amp; Email</th>
                    <th className="p-4">Location</th>
                    <th className="p-4">Amount</th>
                    <th className="p-4">Payment Status</th>
                    <th className="p-4">Order ID</th>
                    <th className="p-4">Date</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredRegistrations.map((reg) => {
                    const isSelected = selectedRegistrationIds.includes(reg.id);
                    return (
                      <tr key={reg.id} className={`hover:bg-slate-50/80 transition-colors ${isSelected ? "bg-amber-50/50" : ""}`}>
                        <td className="p-4">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => toggleSelectRegistration(reg.id)}
                            className="w-4 h-4 text-amber-600 rounded-sm focus:ring-amber-500"
                          />
                        </td>
                        <td className="p-4">
                          <span className="font-bold text-slate-900 block">{reg.name}</span>
                          {reg.additional_notes && (
                            <span className="text-[10px] text-slate-400 italic block truncate max-w-xs">
                              &quot;{reg.additional_notes}&quot;
                            </span>
                          )}
                        </td>
                    <td className="p-4">
                      <span className="font-mono text-slate-800 block">+{reg.mobile}</span>
                      <span className="text-slate-500 block truncate max-w-xs">{reg.email || "N/A"}</span>
                    </td>
                    <td className="p-4 text-slate-600">
                      {reg.city}{reg.state ? `, ${reg.state}` : ""}
                    </td>
                    <td className="p-4 font-bold text-amber-800">
                      ₹{reg.amount}
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          reg.payment_status === "Paid"
                            ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                            : reg.payment_status === "Failed"
                            ? "bg-red-100 text-red-800 border border-red-200"
                            : "bg-amber-100 text-amber-900 border border-amber-300"
                        }`}
                      >
                        {reg.payment_status}
                      </span>
                    </td>
                    <td className="p-4 font-mono text-[11px] text-slate-500">
                      {reg.razorpay_order_id || "N/A"}
                    </td>
                    <td className="p-4 text-slate-500 font-mono text-[11px]">
                      {reg.created_at ? new Date(reg.created_at).toLocaleDateString() : "N/A"}
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleDeleteRegistration(reg.id, reg.name)}
                        disabled={isPerformingAction}
                        className="p-1.5 text-rose-600 hover:text-rose-800 hover:bg-rose-50 rounded-lg transition-colors inline-flex items-center gap-1 font-semibold text-xs"
                        title="Delete Registration"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      ) : filteredRequests.length === 0 ? (
        <div className="py-16 text-center bg-white rounded-2xl border border-slate-200 p-8 space-y-3">
          <MessageSquare className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-lg font-bold text-slate-800">No requests found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            {activeTab === "active"
              ? "There are no active pending requests. New customer form submissions will automatically generate threads here."
              : activeTab === "rejected"
              ? "No rejected or cancelled request records found."
              : "No completed or archived request records found."}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-slate-100 p-3 rounded-xl border border-slate-200">
            <div className="flex items-center gap-2">
              <button
                onClick={handleSelectAllRequests}
                className="px-3 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-900 font-semibold text-xs rounded-lg transition-colors"
              >
                Select All ({filteredRequests.length})
              </button>
              <button
                onClick={handleDeselectAllRequests}
                className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold text-xs rounded-lg transition-colors"
              >
                Deselect All
              </button>
            </div>
            {selectedRequestIds.length > 0 && (
              <button
                onClick={handleBulkDeleteRequests}
                disabled={isPerformingAction}
                className="px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
              >
                <Trash2 className="w-4 h-4" />
                <span>Delete Selected ({selectedRequestIds.length})</span>
              </button>
            )}
          </div>

          {filteredRequests.map((req) => {
            const isSelected = selectedRequestIds.includes(req.request_id);
            return (
              <div
                key={req.id}
                className={`bg-white rounded-2xl border transition-shadow overflow-hidden hover:shadow-md ${
                  isSelected ? "border-amber-400 bg-amber-50/20" : "border-slate-200 shadow-xs"
                }`}
              >
                {/* Card Header */}
                <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleSelectRequest(req.request_id)}
                      className="w-4 h-4 text-amber-600 rounded-sm focus:ring-amber-500 shrink-0"
                    />
                    <span className="font-mono font-bold text-amber-900 text-sm bg-amber-100/70 px-2.5 py-1 rounded-lg">
                      {req.request_id}
                    </span>
                    <h3 className="font-serif font-bold text-slate-900 text-base">
                      {req.request_type} &mdash; {req.customer?.name || "Customer"}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(req.status)}
                    <span className="text-[11px] text-slate-400 font-mono">
                      {new Date(req.created_at).toLocaleDateString()} {new Date(req.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>

              {/* Card Content Grid */}
              <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-600">
                {/* Column 1: Customer Information */}
                <div className="space-y-2 border-b md:border-b-0 md:border-r border-slate-100 pb-4 md:pb-0 md:pr-4">
                  <span className="font-bold text-slate-900 uppercase tracking-wider text-[10px] text-slate-400 block mb-2">
                    Customer Information
                  </span>
                  <div className="flex items-center gap-2">
                    <User className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                    <span className="font-semibold text-slate-800">{req.customer?.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                    <span className="font-mono text-slate-700">+{req.customer?.phone}</span>
                  </div>
                  {req.customer?.email && (
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                      <span className="truncate text-slate-600">{req.customer.email}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-slate-500">
                    <span className="font-medium">Preferred Lang:</span>
                    <span className="font-semibold text-slate-700">{req.customer?.preferred_language || req.language || "English"}</span>
                  </div>
                </div>

                {/* Column 2: Request Information */}
                <div className="space-y-2 border-b md:border-b-0 md:border-r border-slate-100 pb-4 md:pb-0 md:pr-4">
                  <span className="font-bold text-slate-900 uppercase tracking-wider text-[10px] text-slate-400 block mb-2">
                    Request Information
                  </span>
                  <div>
                    <span className="text-slate-400">Service/Item: </span>
                    <strong className="text-slate-900 font-semibold">{req.service_name || req.workshop_name || req.request_type}</strong>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                    <span>Preferred Date: </span>
                    <strong className="text-slate-800">{req.preferred_date || "N/A"}</strong>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                    <span>Preferred Time: </span>
                    <strong className="text-slate-800">{req.preferred_time || "N/A"}</strong>
                  </div>
                  {req.selected_time && (
                    <div className="p-1.5 bg-emerald-50 rounded-lg text-emerald-800 font-semibold">
                      Selected Slot: {req.selected_date || req.preferred_date} at {req.selected_time}
                    </div>
                  )}
                  {req.city && (
                    <div className="flex items-center gap-1.5 text-slate-500">
                      <MapPin className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                      <span>{req.city}{req.state ? `, ${req.state}` : ""}</span>
                    </div>
                  )}
                  {req.notes && (
                    <div className="mt-1 text-slate-500 italic bg-slate-50 p-2 rounded-lg border border-slate-100">
                      &quot;{req.notes}&quot;
                    </div>
                  )}
                </div>

                {/* Column 3: Payment & Activity Summary */}
                <div className="space-y-3 flex flex-col justify-between">
                  <div>
                    <span className="font-bold text-slate-900 uppercase tracking-wider text-[10px] text-slate-400 block mb-2">
                      Payment &amp; Logs
                    </span>
                    {req.amount > 0 ? (
                      <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-200 space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="text-amber-900 font-bold">Amount: ₹{req.amount}</span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${req.payment_status === "Paid" ? "bg-emerald-200 text-emerald-900" : "bg-amber-200 text-amber-900"}`}>
                            {req.payment_status}
                          </span>
                        </div>
                        {req.razorpay_order_id && (
                          <div className="text-[10px] text-slate-500 font-mono">
                            Order: {req.razorpay_order_id}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-slate-400 italic">No payment required</div>
                    )}

                    <div className="mt-3 text-slate-500 flex items-center gap-1.5">
                      <History className="w-3.5 h-3.5 text-slate-400" />
                      <span>{req.message_logs?.length || 0} activity log events</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedLogsRequest(req)}
                    className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>View Action History Logs</span>
                  </button>
                </div>
              </div>

              {/* Action Buttons Bar */}
              <div className="bg-slate-50/70 border-t border-slate-200 px-6 py-3 flex flex-wrap items-center justify-end gap-2">
                {req.status !== "CONFIRMED" && req.status !== "COMPLETED" && req.status !== "CANCELLED" && (
                  <button
                    onClick={() => handleAction(req.request_id, "ACCEPT")}
                    disabled={isPerformingAction}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold rounded-xl text-xs transition-colors flex items-center gap-1.5 shadow-xs"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>ACCEPT</span>
                  </button>
                )}

                {req.status !== "COMPLETED" && req.status !== "CANCELLED" && (
                  <button
                    onClick={() => setTimePickerRequest(req)}
                    disabled={isPerformingAction}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold rounded-xl text-xs transition-colors flex items-center gap-1.5 shadow-xs"
                  >
                    <Clock className="w-3.5 h-3.5" />
                    <span>CHANGE TIME</span>
                  </button>
                )}

                {req.status !== "REJECTED" && req.status !== "CANCELLED" && req.status !== "COMPLETED" && (
                  <button
                    onClick={() => handleAction(req.request_id, "REJECT")}
                    disabled={isPerformingAction}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold rounded-xl text-xs transition-colors flex items-center gap-1.5 shadow-xs"
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    <span>REJECT</span>
                  </button>
                )}

                {req.status !== "COMPLETED" && (
                  <button
                    onClick={() => handleAction(req.request_id, "MARK_COMPLETED")}
                    disabled={isPerformingAction}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-bold rounded-xl text-xs transition-colors flex items-center gap-1.5 shadow-xs"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>MARK COMPLETED</span>
                  </button>
                )}

                {req.status !== "ARCHIVED" && (
                  <button
                    onClick={() => handleAction(req.request_id, "ARCHIVE")}
                    disabled={isPerformingAction}
                    className="px-4 py-2 bg-slate-600 hover:bg-slate-700 disabled:opacity-50 text-white font-bold rounded-xl text-xs transition-colors flex items-center gap-1.5 shadow-xs"
                  >
                    <Archive className="w-3.5 h-3.5" />
                    <span>ARCHIVE</span>
                  </button>
                )}

                <button
                  onClick={() => handleDeleteRequest(req.request_id)}
                  disabled={isPerformingAction}
                  className="px-4 py-2 bg-rose-700 hover:bg-rose-800 disabled:opacity-50 text-white font-bold rounded-xl text-xs transition-colors flex items-center gap-1.5 shadow-xs"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>DELETE</span>
              </div>
            </div>
          );
        })}
        </div>
      )}

      {/* Change Time Modal */}
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
              Select available time slot to dispatch to customer {timePickerRequest.customer?.name} via WhatsApp:
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
                  <span>Send Time Options</span>
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
                    {log.action_id && (
                      <div className="text-[9px] text-slate-400 font-mono">
                        Action ID: {log.action_id}
                      </div>
                    )}
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
