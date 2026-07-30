"use client";

import { useState, useEffect } from "react";
import { Enquiry, WorkshopRegistration } from "@/types";
import { fetchAPI } from "@/lib/api-client";
import { MessageSquare, CreditCard, Check, Loader2, Filter } from "lucide-react";

export default function AdminEnquiriesPage() {
  const [activeTab, setActiveTab] = useState<"enquiries" | "registrations">("enquiries");
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [registrations, setRegistrations] = useState<WorkshopRegistration[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const enqData = await fetchAPI<Enquiry[]>("/enquiries", {
        headers: { Authorization: "Bearer mock-admin-token" },
      });
      setEnquiries(enqData);

      const stats = await fetchAPI<any>("/admin/stats", {
        headers: { Authorization: "Bearer mock-admin-token" },
      });
      if (stats.recent_registrations) {
        setRegistrations(stats.recent_registrations);
      }
    } catch (_) {
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateStatus = async (id: number, newStatus: string) => {
    try {
      await fetchAPI(`/enquiries/${id}/status`, {
        method: "PUT",
        headers: { Authorization: "Bearer mock-admin-token" },
        body: JSON.stringify({ status: newStatus }),
      });
      loadData();
    } catch (err: any) {
      alert("Error updating status: " + err.message);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-serif font-bold text-slate-900 flex items-center gap-2">
          <MessageSquare className="w-7 h-7 text-amber-700" />
          <span>Manage Enquiries &amp; Registrations</span>
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Inspect incoming visitor enquiries and workshop payment registrations. Update enquiry status or initiate WhatsApp responses.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200">
        <button
          onClick={() => setActiveTab("enquiries")}
          className={`px-6 py-3 font-semibold text-xs transition-all border-b-2 ${
            activeTab === "enquiries"
              ? "border-amber-700 text-amber-900"
              : "border-transparent text-slate-500 hover:text-slate-900"
          }`}
        >
          Visitor Enquiries ({enquiries.length})
        </button>
        <button
          onClick={() => setActiveTab("registrations")}
          className={`px-6 py-3 font-semibold text-xs transition-all border-b-2 ${
            activeTab === "registrations"
              ? "border-amber-700 text-amber-900"
              : "border-transparent text-slate-500 hover:text-slate-900"
          }`}
        >
          Workshop Registrations ({registrations.length})
        </button>
      </div>

      {isLoading ? (
        <div className="py-16 text-center text-slate-500 flex items-center justify-center gap-2">
          <Loader2 className="w-5 h-5 animate-spin text-amber-700" />
          <span>Loading records...</span>
        </div>
      ) : activeTab === "enquiries" ? (
        /* ENQUIRIES TABLE */
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider">
                <th className="p-4">ID</th>
                <th className="p-4">Name &amp; Mobile</th>
                <th className="p-4">Type</th>
                <th className="p-4">Category</th>
                <th className="p-4">City</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Update Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {enquiries.map((enq) => (
                <tr key={enq.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-4 font-mono font-bold">#{enq.id}</td>
                  <td className="p-4">
                    <div className="font-bold text-slate-900">{enq.name}</div>
                    <div className="text-slate-500">{enq.mobile}</div>
                  </td>
                  <td className="p-4 font-semibold text-amber-800">{enq.enquiry_type}</td>
                  <td className="p-4 font-medium text-slate-800">{enq.category}</td>
                  <td className="p-4 text-slate-600">{enq.city || "N/A"}</td>
                  <td className="p-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        enq.status === "Confirmed"
                          ? "bg-emerald-100 text-emerald-800"
                          : enq.status === "Rejected"
                          ? "bg-red-100 text-red-800"
                          : "bg-amber-100 text-amber-900"
                      }`}
                    >
                      {enq.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <select
                      value={enq.status}
                      onChange={(e) => handleUpdateStatus(enq.id, e.target.value)}
                      className="px-2.5 py-1 bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium"
                    >
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Completed">Completed</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        /* REGISTRATIONS TABLE */
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider">
                <th className="p-4">Reg ID</th>
                <th className="p-4">Name &amp; Address</th>
                <th className="p-4">Mobile &amp; City</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Payment Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {registrations.map((reg) => (
                <tr key={reg.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-4 font-mono font-bold">#{reg.id}</td>
                  <td className="p-4">
                    <div className="font-bold text-slate-900">{reg.name}</div>
                    <div className="text-slate-500 text-[11px] max-w-xs truncate">{reg.address}</div>
                  </td>
                  <td className="p-4">
                    <div className="font-semibold text-slate-800">{reg.mobile}</div>
                    <div className="text-slate-500">{reg.city}, {reg.state} - {reg.pin_code}</div>
                  </td>
                  <td className="p-4 font-bold text-amber-900">₹{reg.amount}</td>
                  <td className="p-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        reg.payment_status === "Paid"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-amber-100 text-amber-900"
                      }`}
                    >
                      {reg.payment_status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
