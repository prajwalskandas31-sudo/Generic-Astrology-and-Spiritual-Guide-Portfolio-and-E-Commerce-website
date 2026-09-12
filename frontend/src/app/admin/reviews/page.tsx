"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Review } from "@/types";
import { getAdminReviews, updateReviewStatus, deleteReview } from "@/lib/api-client";
import {
  Star,
  CheckCircle,
  XCircle,
  Clock,
  Trash2,
  Search,
  Loader2,
  User,
  Mail,
  MapPin,
  Briefcase,
  AlertCircle,
  RefreshCw,
} from "lucide-react";

export default function AdminReviewsPage() {
  const router = useRouter();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<"All" | "Pending" | "Approved" | "Rejected">("All");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [processingId, setProcessingId] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const getToken = (): string => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      router.push("/admin/login");
      return "";
    }
    return token;
  };

  const loadReviews = async () => {
    setIsLoading(true);
    setErrorMessage("");
    const token = getToken();
    if (!token) return;

    try {
      const data = await getAdminReviews(token);
      setReviews(data || []);
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to load reviews.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadReviews();
  }, []);

  const handleStatusUpdate = async (id: number, newStatus: "Approved" | "Rejected" | "Pending") => {
    const token = getToken();
    if (!token) return;

    setProcessingId(id);
    try {
      await updateReviewStatus(id, newStatus, token);
      setReviews((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
      );
    } catch (err: any) {
      alert(`Error updating review: ${err.message}`);
    } finally {
      setProcessingId(null);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this review permanently?")) return;

    const token = getToken();
    if (!token) return;

    setProcessingId(id);
    try {
      await deleteReview(id, token);
      setReviews((prev) => prev.filter((r) => r.id !== id));
    } catch (err: any) {
      alert(`Error deleting review: ${err.message}`);
    } finally {
      setProcessingId(null);
    }
  };

  const filteredReviews = reviews.filter((r) => {
    const matchesTab = activeTab === "All" || r.status === activeTab;
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch =
      r.client_name.toLowerCase().includes(searchLower) ||
      (r.review_text && r.review_text.toLowerCase().includes(searchLower)) ||
      (r.service_taken && r.service_taken.toLowerCase().includes(searchLower)) ||
      (r.client_location && r.client_location.toLowerCase().includes(searchLower));

    return matchesTab && matchesSearch;
  });

  const pendingCount = reviews.filter((r) => r.status === "Pending").length;
  const approvedCount = reviews.filter((r) => r.status === "Approved").length;
  const rejectedCount = reviews.filter((r) => r.status === "Rejected").length;

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-xs border border-slate-200">
        <div>
          <h1 className="font-serif text-2xl font-bold text-slate-900 flex items-center gap-2.5">
            <Star className="w-6 h-6 text-amber-500 fill-amber-400" />
            Client Reviews Moderation
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Approve, reject, or manage authentic public reviews and ratings submitted by clients.
          </p>
        </div>

        <button
          onClick={loadReviews}
          disabled={isLoading}
          className="flex items-center gap-2 px-4 py-2 bg-amber-50 hover:bg-amber-100 text-amber-900 font-semibold rounded-xl text-xs border border-amber-200 transition-all self-start sm:self-auto"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
          Refresh Reviews
        </button>
      </div>

      {errorMessage && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs font-medium flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Navigation Tabs & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Tabs */}
        <div className="flex items-center gap-1.5 p-1.5 bg-slate-200/60 rounded-xl border border-slate-300/60 text-xs font-medium self-start">
          <button
            onClick={() => setActiveTab("All")}
            className={`px-3.5 py-1.5 rounded-lg transition-all ${
              activeTab === "All"
                ? "bg-white text-slate-900 font-bold shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            All ({reviews.length})
          </button>

          <button
            onClick={() => setActiveTab("Pending")}
            className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === "Pending"
                ? "bg-amber-500 text-white font-bold shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            Pending
            {pendingCount > 0 && (
              <span className="ml-1 px-1.5 py-0.5 text-[10px] bg-amber-950 text-amber-200 rounded-full font-bold">
                {pendingCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("Approved")}
            className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === "Approved"
                ? "bg-emerald-600 text-white font-bold shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <CheckCircle className="w-3.5 h-3.5" />
            Approved ({approvedCount})
          </button>

          <button
            onClick={() => setActiveTab("Rejected")}
            className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === "Rejected"
                ? "bg-red-600 text-white font-bold shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <XCircle className="w-3.5 h-3.5" />
            Rejected ({rejectedCount})
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
          <input
            type="text"
            placeholder="Search name, text, service..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-amber-500 bg-white"
          />
        </div>
      </div>

      {/* Reviews List */}
      {isLoading ? (
        <div className="py-20 text-center space-y-3 bg-white rounded-2xl border border-slate-200">
          <Loader2 className="w-8 h-8 text-amber-600 animate-spin mx-auto" />
          <p className="text-xs font-semibold text-slate-500">Loading client reviews...</p>
        </div>
      ) : filteredReviews.length === 0 ? (
        <div className="py-16 text-center space-y-3 bg-white rounded-2xl border border-slate-200">
          <Star className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="font-serif font-bold text-slate-800 text-lg">No Reviews Found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            {searchTerm
              ? "No reviews match your current search terms."
              : `There are currently no ${activeTab === "All" ? "" : activeTab.toLowerCase()} reviews.`}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredReviews.map((review) => (
            <div
              key={review.id}
              className={`p-5 bg-white rounded-2xl border transition-all flex flex-col justify-between space-y-4 shadow-xs hover:shadow-md ${
                review.status === "Pending"
                  ? "border-amber-300/80 bg-amber-50/20"
                  : review.status === "Approved"
                  ? "border-emerald-200"
                  : "border-red-200 bg-red-50/10"
              }`}
            >
              <div className="space-y-3">
                {/* Header Row: Stars & Status Badge */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${
                          star <= review.rating
                            ? "fill-amber-400 text-amber-500"
                            : "text-slate-200"
                        }`}
                      />
                    ))}
                    <span className="text-xs font-bold text-slate-700 ml-1">
                      {review.rating}/5
                    </span>
                  </div>

                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                      review.status === "Approved"
                        ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                        : review.status === "Rejected"
                        ? "bg-red-100 text-red-800 border border-red-300"
                        : "bg-amber-100 text-amber-800 border border-amber-300"
                    }`}
                  >
                    {review.status === "Approved" && <CheckCircle className="w-3 h-3" />}
                    {review.status === "Rejected" && <XCircle className="w-3 h-3" />}
                    {review.status === "Pending" && <Clock className="w-3 h-3" />}
                    {review.status}
                  </span>
                </div>

                {/* Client Name & Metadata */}
                <div>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-amber-800 shrink-0" />
                    <h3 className="font-serif font-bold text-base text-slate-900">
                      {review.client_name}
                    </h3>
                  </div>

                  <div className="mt-1.5 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                    {review.service_taken && (
                      <span className="flex items-center gap-1 text-slate-700 font-medium bg-slate-100 px-2 py-0.5 rounded-md">
                        <Briefcase className="w-3 h-3 text-amber-700" />
                        {review.service_taken}
                      </span>
                    )}

                    {review.client_location && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        {review.client_location}
                      </span>
                    )}

                    {review.client_email && (
                      <span className="flex items-center gap-1">
                        <Mail className="w-3 h-3 text-slate-400" />
                        {review.client_email}
                      </span>
                    )}
                  </div>
                </div>

                {/* Review Text */}
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/70 text-xs text-slate-700 leading-relaxed font-sans italic">
                  "{review.review_text}"
                </div>

                {review.created_at && (
                  <p className="text-[10px] text-slate-400">
                    Submitted on: {new Date(review.created_at).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  {review.status !== "Approved" && (
                    <button
                      onClick={() => handleStatusUpdate(review.id, "Approved")}
                      disabled={processingId === review.id}
                      className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold transition-all shadow-xs flex items-center gap-1 disabled:opacity-50"
                    >
                      <CheckCircle className="w-3.5 h-3.5" />
                      Approve
                    </button>
                  )}

                  {review.status !== "Rejected" && (
                    <button
                      onClick={() => handleStatusUpdate(review.id, "Rejected")}
                      disabled={processingId === review.id}
                      className="px-3 py-1.5 bg-slate-700 hover:bg-red-700 text-white rounded-lg text-xs font-bold transition-all shadow-xs flex items-center gap-1 disabled:opacity-50"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      Reject
                    </button>
                  )}

                  {review.status !== "Pending" && (
                    <button
                      onClick={() => handleStatusUpdate(review.id, "Pending")}
                      disabled={processingId === review.id}
                      className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-medium transition-all"
                    >
                      Set Pending
                    </button>
                  )}
                </div>

                <button
                  onClick={() => handleDelete(review.id)}
                  disabled={processingId === review.id}
                  className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-all"
                  title="Delete permanently"
                >
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
