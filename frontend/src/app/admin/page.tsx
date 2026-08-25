"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { fetchAPI, getLocalUserRegistrations } from "@/lib/api-client";
import { DashboardStats } from "@/types";
import {
  MessageSquare,
  Calendar,
  CreditCard,
  Plus,
  BookOpen,
  FolderOpen,
  FileText,
  Loader2,
  ArrowRight,
  BookOpenCheck,
  Radio,
  Sparkles,
  GraduationCap,
  Users,
  TrendingUp,
} from "lucide-react";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [localRegs, setLocalRegs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadStats();
    if (typeof window !== "undefined") {
      setLocalRegs(getLocalUserRegistrations());
    }
  }, []);

  const loadStats = async () => {
    setIsLoading(true);
    try {
      const data = await fetchAPI<DashboardStats>("/admin/stats", {
        headers: { Authorization: "Bearer mock-admin-token" },
      });
      setStats(data);
    } catch (_) {
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate metrics
  const recentEnquiries = stats?.recent_enquiries || [];
  const recentRegistrations = stats?.recent_registrations || [];

  const combinedItems = [
    ...localRegs,
    ...recentEnquiries.map((e: any) => ({ request_type: e.enquiry_type || e.category, amount: 0 })),
    ...recentRegistrations.map((r: any) => ({ request_type: "Workshop", amount: r.amount })),
  ];

  const getMetricCount = (typeKeyword: string) => {
    return combinedItems.filter((item: any) => {
      const t = (item.request_type || item.service_name || "").toLowerCase();
      return t.includes(typeKeyword.toLowerCase());
    }).length;
  };

  const serviceCount = getMetricCount("service");
  const consultationCount = getMetricCount("consultation");
  const workshopCount = getMetricCount("workshop") + (stats?.upcoming_workshops?.length || 0);
  const classCount = getMetricCount("class");
  const courseCount = getMetricCount("course");
  const liveEventCount = getMetricCount("live event") + getMetricCount("sankalpa");
  const totalSubmissions = combinedItems.length;

  if (isLoading) {
    return (
      <div className="py-24 text-center text-slate-500 flex items-center justify-center gap-2">
        <Loader2 className="w-6 h-6 animate-spin text-amber-700" />
        <span>Loading Admin Dashboard...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-serif font-bold text-slate-900">
          Admin Dashboard
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Real-time metrics, incoming enquiries, registrations, and quick CMS controls.
        </p>
      </div>

      {/* METRICS OVERVIEW CARDS */}
      <div className="space-y-3">
        <h2 className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
          <TrendingUp className="w-4 h-4 text-amber-700" />
          <span>Enquiries &amp; Registrations Overview</span>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          
          {/* 1. Services */}
          <Link
            href="/admin/enquiries?type=service"
            className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md hover:border-amber-400 transition-all group flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Services</span>
              <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
                🪔
              </div>
            </div>
            <div className="mt-3">
              <span className="text-2xl font-serif font-bold text-slate-900 block">{serviceCount}</span>
              <span className="text-[10px] text-amber-700 font-semibold group-hover:underline">View Services &rarr;</span>
            </div>
          </Link>

          {/* 2. Consultation */}
          <Link
            href="/admin/enquiries?type=consultation"
            className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md hover:border-amber-400 transition-all group flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Consultation</span>
              <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
                🔮
              </div>
            </div>
            <div className="mt-3">
              <span className="text-2xl font-serif font-bold text-slate-900 block">{consultationCount}</span>
              <span className="text-[10px] text-purple-700 font-semibold group-hover:underline">View Consultations &rarr;</span>
            </div>
          </Link>

          {/* 3. Workshops */}
          <Link
            href="/admin/enquiries?type=workshop"
            className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md hover:border-amber-400 transition-all group flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Workshops</span>
              <div className="w-8 h-8 rounded-xl bg-orange-100 text-orange-800 flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
                <Calendar className="w-4 h-4 text-orange-700" />
              </div>
            </div>
            <div className="mt-3">
              <span className="text-2xl font-serif font-bold text-slate-900 block">{workshopCount}</span>
              <span className="text-[10px] text-orange-700 font-semibold group-hover:underline">View Registrations &rarr;</span>
            </div>
          </Link>

          {/* 4. Classes */}
          <Link
            href="/admin/enquiries?type=class"
            className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md hover:border-amber-400 transition-all group flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Classes</span>
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
                <GraduationCap className="w-4 h-4 text-emerald-700" />
              </div>
            </div>
            <div className="mt-3">
              <span className="text-2xl font-serif font-bold text-slate-900 block">{classCount}</span>
              <span className="text-[10px] text-emerald-700 font-semibold group-hover:underline">View Classes &rarr;</span>
            </div>
          </Link>

          {/* 5. Courses */}
          <Link
            href="/admin/enquiries?type=course"
            className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md hover:border-amber-400 transition-all group flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Courses</span>
              <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
                <BookOpenCheck className="w-4 h-4 text-blue-700" />
              </div>
            </div>
            <div className="mt-3">
              <span className="text-2xl font-serif font-bold text-slate-900 block">{courseCount}</span>
              <span className="text-[10px] text-blue-700 font-semibold group-hover:underline">View Enrollments &rarr;</span>
            </div>
          </Link>

          {/* 6. Live Events */}
          <Link
            href="/admin/enquiries?type=live event"
            className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md hover:border-amber-400 transition-all group flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Live Events</span>
              <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-800 flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
                <Radio className="w-4 h-4 text-rose-700 animate-pulse" />
              </div>
            </div>
            <div className="mt-3">
              <span className="text-2xl font-serif font-bold text-slate-900 block">{liveEventCount}</span>
              <span className="text-[10px] text-rose-700 font-semibold group-hover:underline">View Sankalpas &rarr;</span>
            </div>
          </Link>

        </div>
      </div>

      {/* QUICK ACTIONS BAR */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
        <h2 className="text-xs font-bold uppercase tracking-wider text-amber-800">
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <Link
            href="/admin/offerings"
            className="flex items-center gap-2 p-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200/60 text-amber-900 font-semibold text-xs transition-colors"
          >
            <Plus className="w-3.5 h-3.5 text-amber-700" />
            <span>Add Offering</span>
          </Link>
          <Link
            href="/admin/workshops"
            className="flex items-center gap-2 p-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200/60 text-amber-900 font-semibold text-xs transition-colors"
          >
            <Plus className="w-3.5 h-3.5 text-amber-700" />
            <span>Create Workshop</span>
          </Link>
          <Link
            href="/admin/courses"
            className="flex items-center gap-2 p-2.5 rounded-xl bg-amber-100 hover:bg-amber-200 border border-amber-300 text-amber-950 font-bold text-xs transition-colors"
          >
            <BookOpenCheck className="w-3.5 h-3.5 text-amber-800" />
            <span>Manage Courses</span>
          </Link>
          <Link
            href="/admin/live-events"
            className="flex items-center gap-2 p-2.5 rounded-xl bg-amber-100 hover:bg-amber-200 border border-amber-300 text-amber-950 font-bold text-xs transition-colors"
          >
            <Radio className="w-3.5 h-3.5 text-amber-800" />
            <span>Live Events</span>
          </Link>
          <Link
            href="/admin/blogs"
            className="flex items-center gap-2 p-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200/60 text-amber-900 font-semibold text-xs transition-colors"
          >
            <Plus className="w-3.5 h-3.5 text-amber-700" />
            <span>Publish Blog</span>
          </Link>
          <Link
            href="/admin/media"
            className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 font-semibold text-xs transition-colors"
          >
            <FolderOpen className="w-3.5 h-3.5 text-slate-700" />
            <span>Media Library</span>
          </Link>
        </div>
      </div>

      {/* 3-COLUMN MODULE GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* 1. RECENT ENQUIRIES */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-base font-serif font-bold text-slate-900 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-amber-700" />
              <span>Recent Enquiries</span>
            </h2>
            <Link href="/admin/enquiries" className="text-xs font-semibold text-amber-800 hover:underline">
              View All &rarr;
            </Link>
          </div>

          <div className="space-y-3 max-h-[350px] overflow-y-auto">
            {!stats?.recent_enquiries || stats.recent_enquiries.length === 0 ? (
              <p className="text-xs text-slate-500 text-center py-6">No recent enquiries.</p>
            ) : (
              stats.recent_enquiries.map((enq) => (
                <div key={enq.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">{enq.name}</span>
                    <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 font-medium text-[10px]">
                      {enq.status}
                    </span>
                  </div>
                  <div className="text-slate-500 flex justify-between">
                    <span>{enq.category}</span>
                    <span>{enq.mobile}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* 2. UPCOMING WORKSHOPS */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-base font-serif font-bold text-slate-900 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-amber-700" />
              <span>Upcoming Workshops</span>
            </h2>
            <Link href="/admin/workshops" className="text-xs font-semibold text-amber-800 hover:underline">
              Manage &rarr;
            </Link>
          </div>

          <div className="space-y-3 max-h-[350px] overflow-y-auto">
            {!stats?.upcoming_workshops || stats.upcoming_workshops.length === 0 ? (
              <p className="text-xs text-slate-500 text-center py-6">No active upcoming workshops.</p>
            ) : (
              stats.upcoming_workshops.map((ws) => (
                <div key={ws.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">{ws.title}</span>
                    <span className="text-amber-800 font-semibold">₹{ws.price}</span>
                  </div>
                  <div className="text-slate-500 flex justify-between">
                    <span>Venue: {ws.venue || "N/A"}</span>
                    <span>{(ws.batches || []).length} Batches</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* 3. RECENT REGISTRATIONS */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-base font-serif font-bold text-slate-900 flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-amber-700" />
              <span>Recent Registrations</span>
            </h2>
            <Link href="/admin/enquiries?tab=registrations" className="text-xs font-semibold text-amber-800 hover:underline">
              View All &rarr;
            </Link>
          </div>

          <div className="space-y-3 max-h-[350px] overflow-y-auto">
            {!stats?.recent_registrations || stats.recent_registrations.length === 0 ? (
              <p className="text-xs text-slate-500 text-center py-6">No registrations recorded yet.</p>
            ) : (
              stats.recent_registrations.map((reg) => (
                <div key={reg.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">{reg.name}</span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        reg.payment_status === "Paid"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-amber-100 text-amber-900"
                      }`}
                    >
                      {reg.payment_status}
                    </span>
                  </div>
                  <div className="text-slate-500 flex justify-between">
                    <span>{reg.mobile} ({reg.city})</span>
                    <span>₹{reg.amount}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
