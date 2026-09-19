"use client";

import { useState, useEffect } from "react";
import { getCurrentAdminUser, getAuditLogs, clearAuditLogs, logAuditEvent } from "@/lib/api-client";
import { AuditLog, AdminRole } from "@/types";
import {
  Activity,
  Search,
  Filter,
  Download,
  Trash2,
  RefreshCw,
  ShieldAlert,
  ShieldCheck,
  User,
  Crown,
  Lock,
  Eye,
  X,
  FileSpreadsheet,
  CheckCircle2,
  AlertTriangle,
  Info,
} from "lucide-react";
import Link from "next/link";

export default function AuditLogsPage() {
  const [currentUser, setCurrentUser] = useState(getCurrentAdminUser());
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("ALL");
  const [roleFilter, setRoleFilter] = useState<string>("ALL");
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);

  useEffect(() => {
    const user = getCurrentAdminUser();
    setCurrentUser(user);
    loadLogs();
  }, []);

  const loadLogs = async () => {
    setIsLoading(true);
    try {
      const data = await getAuditLogs();
      setLogs(data);
    } catch (_) {
    } finally {
      setIsLoading(false);
    }
  };

  // If not Principal Admin, render access denied banner
  if (currentUser.role !== "PRINCIPAL_ADMIN") {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 bg-white rounded-3xl border border-red-200 text-center space-y-6 font-sans">
        <div className="w-16 h-16 rounded-3xl bg-red-100 text-red-700 flex items-center justify-center mx-auto shadow-md">
          <Lock className="w-8 h-8" />
        </div>
        <div className="space-y-2 max-w-md">
          <h1 className="text-2xl font-bold font-serif text-slate-900">
            Access Restricted — Principal Admin Only
          </h1>
          <p className="text-xs text-slate-600 leading-relaxed">
            The Audit Logs Activity Center contains sensitive system telemetry and is restricted exclusively to the <strong>Principal Admin (Prajwal Skanda S)</strong>.
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/admin"
            className="px-6 py-2.5 bg-amber-900 hover:bg-amber-950 text-white rounded-xl text-xs font-bold shadow-md transition-all"
          >
            Return to Dashboard
          </Link>
          <Link
            href="/admin/login"
            className="px-6 py-2.5 bg-purple-900 hover:bg-purple-950 text-purple-100 rounded-xl text-xs font-bold shadow-md transition-all"
          >
            Switch to Principal Admin
          </Link>
        </div>
      </div>
    );
  }

  // Filtering Logic
  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      searchQuery === "" ||
      log.user_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.action_summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.target_resource.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.user_email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      categoryFilter === "ALL" || log.action_category === categoryFilter;

    const matchesRole = roleFilter === "ALL" || log.user_role === roleFilter;

    return matchesSearch && matchesCategory && matchesRole;
  });

  // Metrics
  const totalLogs = logs.length;
  const loginsToday = logs.filter(
    (l) => l.action_category === "LOGIN"
  ).length;
  const contentUpdates = logs.filter((l) =>
    ["CREATE", "UPDATE", "SETTINGS"].includes(l.action_category)
  ).length;
  const highSeverity = logs.filter(
    (l) => l.action_category === "DELETE" || l.severity === "WARNING" || l.severity === "CRITICAL"
  ).length;

  // Export to CSV
  const handleExportCSV = () => {
    if (filteredLogs.length === 0) return;
    const headers = [
      "Timestamp",
      "User Name",
      "User Email",
      "Role",
      "Category",
      "Summary",
      "Target Resource",
      "IP Address",
      "Severity",
    ];
    const rows = filteredLogs.map((l) => [
      `"${l.timestamp}"`,
      `"${l.user_name}"`,
      `"${l.user_email}"`,
      `"${l.user_role}"`,
      `"${l.action_category}"`,
      `"${l.action_summary.replace(/"/g, '""')}"`,
      `"${l.target_resource.replace(/"/g, '""')}"`,
      `"${l.ip_address || "127.0.0.1"}"`,
      `"${l.severity || "INFO"}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `audit_logs_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleClearLogs = () => {
    if (confirm("Are you sure you want to clear audit logs? This action cannot be undone.")) {
      clearAuditLogs();
      setLogs([]);
      logAuditEvent({
        action_category: "DELETE",
        action_summary: "Cleared local audit logs history",
        target_resource: "System Audit Trail",
        severity: "WARNING",
      });
      loadLogs();
    }
  };

  return (
    <div className="space-y-8 font-sans">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-amber-950 via-amber-900 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl border border-amber-800/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-800/80 text-amber-200 border border-amber-600/60 text-xs font-bold uppercase tracking-wider">
            <Crown className="w-3.5 h-3.5 text-amber-300" />
            <span>Principal Superadmin Control Center</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white">
            System Audit Logs &amp; Activity Trail
          </h1>
          <p className="text-xs sm:text-sm text-amber-200/90 max-w-2xl leading-relaxed">
            Exclusive superadmin telemetry monitoring every administrative login, content edit, status change, broadcast, and deletion across the platform.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={loadLogs}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-amber-900/80 hover:bg-amber-800 text-amber-100 rounded-xl text-xs font-bold border border-amber-700/60 transition-all shadow-sm"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
            <span>Refresh Logs</span>
          </button>

          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Summary Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Recorded Logs</div>
            <div className="text-2xl font-bold font-serif text-slate-900 mt-0.5">{totalLogs}</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Admin Logins</div>
            <div className="text-2xl font-bold font-serif text-slate-900 mt-0.5">{loginsToday}</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
            <RefreshCw className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Content Modifications</div>
            <div className="text-2xl font-bold font-serif text-slate-900 mt-0.5">{contentUpdates}</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-700 flex items-center justify-center shrink-0">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Warning &amp; Deletions</div>
            <div className="text-2xl font-bold font-serif text-slate-900 mt-0.5">{highSeverity}</div>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search user, action summary, resource..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-amber-500"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <div className="flex items-center gap-2">
              <Filter className="w-3.5 h-3.5 text-slate-500" />
              <span className="text-xs font-semibold text-slate-600">Category:</span>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="py-1.5 px-3 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium"
              >
                <option value="ALL">All Categories</option>
                <option value="LOGIN">Auth Logins</option>
                <option value="LOGOUT">Auth Logouts</option>
                <option value="CREATE">Creation</option>
                <option value="UPDATE">Modifications</option>
                <option value="DELETE">Deletions</option>
                <option value="BROADCAST">WhatsApp Broadcast</option>
                <option value="SYNC">Calendar Sync</option>
                <option value="SETTINGS">Settings Changes</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-600">Role:</span>
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="py-1.5 px-3 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium"
              >
                <option value="ALL">All Roles</option>
                <option value="PRINCIPAL_ADMIN">Principal Admin</option>
                <option value="MASTER_ADMIN">Master Admin</option>
                <option value="STAFF_ADMIN">Staff Admin</option>
              </select>
            </div>

            <button
              onClick={handleClearLogs}
              className="ml-auto inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 rounded-xl text-xs font-bold border border-red-200 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear History</span>
            </button>
          </div>
        </div>
      </div>

      {/* Activity Timeline Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-amber-800" />
            <h2 className="text-sm font-bold font-serif text-slate-900">
              Audit Activity Timeline ({filteredLogs.length} entries)
            </h2>
          </div>
          <span className="text-xs text-slate-500">Auto-logged with timestamp &amp; details</span>
        </div>

        {filteredLogs.length === 0 ? (
          <div className="p-12 text-center text-slate-500 text-xs">
            No audit logs match your search or filter criteria.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Timestamp</th>
                  <th className="py-3 px-4">Admin User &amp; Role</th>
                  <th className="py-3 px-4">Action</th>
                  <th className="py-3 px-4">Summary &amp; Target Resource</th>
                  <th className="py-3 px-4 text-right">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredLogs.map((log) => {
                  const dateObj = new Date(log.timestamp);
                  const timeFormatted = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
                  const dateFormatted = dateObj.toLocaleDateString();

                  const isPrincipal = log.user_role === "PRINCIPAL_ADMIN";
                  const isMaster = log.user_role === "MASTER_ADMIN";

                  return (
                    <tr key={log.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4 text-slate-500 font-mono whitespace-nowrap">
                        <div className="font-semibold text-slate-800">{timeFormatted}</div>
                        <div className="text-[10px] text-slate-400">{dateFormatted}</div>
                      </td>

                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-2.5">
                          <div className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold text-white shrink-0 ${
                            isPrincipal ? "bg-amber-800" : isMaster ? "bg-amber-900" : "bg-slate-800"
                          }`}>
                            {isPrincipal ? <Crown className="w-3.5 h-3.5 text-amber-300" /> : log.user_name.slice(0, 1)}
                          </div>
                          <div>
                            <div className="font-bold text-slate-900">{log.user_name}</div>
                            <span className={`inline-block text-[9px] font-extrabold uppercase px-1.5 py-0.2 rounded ${
                              isPrincipal
                                ? "bg-amber-100 text-amber-900 border border-amber-300"
                                : isMaster
                                ? "bg-amber-100 text-amber-900 border border-amber-200"
                                : "bg-slate-100 text-slate-800 border border-slate-200"
                            }`}>
                              {isPrincipal ? "Principal Admin" : isMaster ? "Master Admin" : "Staff"}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold uppercase ${
                          log.action_category === "LOGIN"
                            ? "bg-emerald-100 text-emerald-800"
                            : log.action_category === "LOGOUT"
                            ? "bg-slate-100 text-slate-700"
                            : log.action_category === "DELETE"
                            ? "bg-red-100 text-red-800"
                            : log.action_category === "CREATE"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-amber-100 text-amber-900"
                        }`}>
                          {log.action_category}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 max-w-md">
                        <div className="font-medium text-slate-900 line-clamp-1">
                          {log.action_summary}
                        </div>
                        <div className="text-[11px] text-amber-900 font-serif font-bold mt-0.5">
                          Target: {log.target_resource}
                        </div>
                      </td>

                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <button
                          onClick={() => setSelectedLog(log)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-50/80 hover:bg-amber-100 text-amber-950 font-bold rounded-xl text-xs transition-all border border-amber-200/80 hover:border-amber-300"
                        >
                          <Eye className="w-3.5 h-3.5 text-amber-800" />
                          <span>Inspect Diff</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* JSON Payload Inspector Modal */}
      {selectedLog && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200 animate-in fade-in">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                  <Activity className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-lg text-slate-900">
                    Audit Telemetry Inspector
                  </h3>
                  <p className="text-xs text-slate-500">Log ID: {selectedLog.id}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedLog(null)}
                className="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <div>
                  <span className="text-slate-500 font-medium block">User:</span>
                  <strong className="text-slate-900">{selectedLog.user_name} ({selectedLog.user_role})</strong>
                </div>
                <div>
                  <span className="text-slate-500 font-medium block">Timestamp:</span>
                  <strong className="text-slate-900">{new Date(selectedLog.timestamp).toLocaleString()}</strong>
                </div>
                <div>
                  <span className="text-slate-500 font-medium block">IP Address:</span>
                  <strong className="text-slate-900">{selectedLog.ip_address || "127.0.0.1"}</strong>
                </div>
                <div>
                  <span className="text-slate-500 font-medium block">Severity:</span>
                  <strong className={selectedLog.severity === "WARNING" ? "text-red-600" : "text-emerald-700"}>{selectedLog.severity || "INFO"}</strong>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1">
                  Target Resource:
                </label>
                <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-200 text-amber-950 font-serif font-bold">
                  {selectedLog.target_resource}
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1">
                  Raw Details &amp; Payload Diff:
                </label>
                <pre className="p-4 bg-slate-950 text-emerald-400 rounded-2xl text-[11px] font-mono overflow-x-auto max-h-60 leading-relaxed border border-slate-800">
                  {JSON.stringify(selectedLog.details || {}, null, 2)}
                </pre>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setSelectedLog(null)}
                className="px-6 py-2.5 bg-slate-900 hover:bg-slate-950 text-white rounded-xl text-xs font-bold transition-all shadow-md"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
