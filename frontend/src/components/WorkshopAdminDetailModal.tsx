"use client";

import { useState, useEffect, useRef } from "react";
import { Workshop, WorkshopRegistration } from "@/types";
import { getWorkshopRegistrationsById, sendWorkshopBroadcast, bulkDeleteWorkshopRegistrations, deleteWorkshopRegistration } from "@/lib/api-client";
import MediaLibraryModal from "./MediaLibraryModal";
import {
  X,
  Users,
  Send,
  Camera,
  Upload,
  FolderOpen,
  CheckSquare,
  Square,
  MessageSquare,
  Loader2,
  Calendar,
  MapPin,
  CreditCard,
  Phone,
  CheckCircle2,
  AlertCircle,
  Trash2
} from "lucide-react";

export interface WorkshopAdminDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  workshop: Workshop | null;
}

export default function WorkshopAdminDetailModal({
  isOpen,
  onClose,
  workshop,
}: WorkshopAdminDetailModalProps) {
  const [registrations, setRegistrations] = useState<WorkshopRegistration[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPhones, setSelectedPhones] = useState<string[]>([]);
  
  // WhatsApp Composer State
  const [messageText, setMessageText] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [broadcastStatus, setBroadcastStatus] = useState<{ message: string; success: boolean } | null>(null);

  // Modals & Camera State
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    if (isOpen && workshop) {
      loadRegistrations();
      setMessageText(`Namaste! Update regarding your registration for ${workshop.title}:`);
    } else {
      stopCamera();
    }
  }, [isOpen, workshop]);

  const loadRegistrations = async () => {
    if (!workshop) return;
    setIsLoading(true);
    try {
      const data = await getWorkshopRegistrationsById(workshop.id);
      setRegistrations(data);
      // Default select all participants with phone numbers
      setSelectedPhones(data.map((r) => r.mobile));
    } catch (err: any) {
      console.error("Failed to load workshop participants:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectAll = () => {
    setSelectedPhones(registrations.map((r) => r.mobile));
  };

  const handleDeselectAll = () => {
    setSelectedPhones([]);
  };

  const toggleSelectPhone = (phone: string) => {
    if (selectedPhones.includes(phone)) {
      setSelectedPhones(selectedPhones.filter((p) => p !== phone));
    } else {
      setSelectedPhones([...selectedPhones, phone]);
    }
  };

  const handleBulkDelete = async () => {
    const selectedRegs = registrations.filter((r) => selectedPhones.includes(r.mobile));
    if (selectedRegs.length === 0) return;
    if (!confirm(`Are you sure you want to delete ${selectedRegs.length} selected participant registration(s)?`)) return;

    try {
      const idsToDelete = selectedRegs.map((r) => r.id);
      await bulkDeleteWorkshopRegistrations(idsToDelete);
      loadRegistrations();
    } catch (err: any) {
      alert("Error deleting registrations: " + err.message);
    }
  };

  const handleSingleDelete = async (regId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm("Are you sure you want to delete this registration?")) return;
    try {
      await deleteWorkshopRegistration(regId);
      loadRegistrations();
    } catch (err: any) {
      alert("Error deleting registration: " + err.message);
    }
  };

  // Device File Upload (base64 data URL conversion)
  const handleDeviceFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setImageUrl(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  // Live Camera Capture using WebRTC HTML5 Media Devices
  const startCamera = async () => {
    try {
      setIsCameraActive(true);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
        audio: false,
      });
      mediaStreamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (err: any) {
      alert("Unable to access camera: " + (err.message || "Permission denied"));
      setIsCameraActive(false);
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const photoUrl = canvas.toDataURL("image/jpeg", 0.85);
      setImageUrl(photoUrl);
      stopCamera();
    }
  };

  const stopCamera = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }
    setIsCameraActive(false);
  };

  const handleSendBroadcast = async () => {
    if (!workshop) return;
    if (selectedPhones.length === 0) {
      alert("Please select at least one participant to receive the WhatsApp broadcast.");
      return;
    }
    if (!messageText.trim() && !imageUrl) {
      alert("Please enter a message or attach an image to send.");
      return;
    }

    setIsSending(true);
    setBroadcastStatus(null);

    try {
      const res = await sendWorkshopBroadcast(workshop.id, {
        recipient_phones: selectedPhones,
        message_text: messageText,
        image_url: imageUrl || undefined,
      });
      setBroadcastStatus({
        message: res.message || `WhatsApp broadcast sent to ${selectedPhones.length} participants!`,
        success: true,
      });
    } catch (err: any) {
      setBroadcastStatus({
        message: err.message || "Failed to send WhatsApp broadcast.",
        success: false,
      });
    } finally {
      setIsSending(false);
    }
  };

  if (!isOpen || !workshop) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-5xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-start border-b border-slate-100 pb-4 shrink-0">
          <div>
            <span className="px-3 py-1 bg-amber-100 text-amber-900 font-bold text-xs rounded-full uppercase">
              Workshop Management &amp; Participant Dashboard
            </span>
            <h2 className="text-2xl font-serif font-bold text-slate-900 mt-1">
              {workshop.title}
            </h2>
            <div className="flex flex-wrap gap-4 text-xs text-slate-600 mt-1">
              <span className="flex items-center gap-1 font-semibold text-amber-800">
                <CreditCard className="w-3.5 h-3.5" /> ₹{workshop.price}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" /> {workshop.start_date} to {workshop.end_date}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" /> {workshop.venue || "N/A"}
              </span>
            </div>
          </div>
          <button
            onClick={() => {
              stopCamera();
              onClose();
            }}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content Body Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 my-4 overflow-y-auto flex-1 pr-1">
          {/* Left Column: Registered Participants */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                <Users className="w-4 h-4 text-amber-700" />
                <span>Registered Participants ({registrations.length})</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleSelectAll}
                  className="px-3 py-1 bg-amber-100 hover:bg-amber-200 text-amber-900 font-semibold text-[11px] rounded-lg transition-colors flex items-center gap-1"
                >
                  <CheckSquare className="w-3 h-3" />
                  <span>Select All ({registrations.length})</span>
                </button>
                <button
                  onClick={handleDeselectAll}
                  className="px-3 py-1 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold text-[11px] rounded-lg transition-colors flex items-center gap-1"
                >
                  <Square className="w-3 h-3" />
                  <span>Deselect All</span>
                </button>
                {selectedPhones.length > 0 && (
                  <button
                    onClick={handleBulkDelete}
                    className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white font-semibold text-[11px] rounded-lg transition-colors flex items-center gap-1 shadow-xs"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Delete Selected ({selectedPhones.length})</span>
                  </button>
                )}
              </div>
            </div>

            {isLoading ? (
              <div className="py-12 text-center text-slate-500 flex items-center justify-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin text-amber-700" />
                <span>Loading participants...</span>
              </div>
            ) : registrations.length === 0 ? (
              <div className="p-8 text-center bg-slate-50 rounded-xl border border-slate-200 text-slate-500 text-xs">
                No participant registrations recorded for this workshop yet.
              </div>
            ) : (
              <div className="space-y-2.5 max-h-[420px] overflow-y-auto pr-1">
                {registrations.map((reg) => {
                  const isSelected = selectedPhones.includes(reg.mobile);
                  return (
                    <div
                      key={reg.id}
                      onClick={() => toggleSelectPhone(reg.mobile)}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        isSelected
                          ? "bg-amber-50/70 border-amber-300 shadow-xs"
                          : "bg-white border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => {}}
                          className="w-4 h-4 text-amber-600 rounded-sm focus:ring-amber-500 shrink-0"
                        />
                        <div className="space-y-0.5 text-xs">
                          <span className="font-bold text-slate-900 block">{reg.name}</span>
                          <div className="flex items-center gap-2 text-slate-500 font-mono text-[11px]">
                            <span className="flex items-center gap-1">
                              <Phone className="w-3 h-3 text-amber-700" /> +{reg.mobile}
                            </span>
                            <span>&bull; {reg.city}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            reg.payment_status === "Paid"
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-amber-100 text-amber-900"
                          }`}
                        >
                          {reg.payment_status}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedPhones([reg.mobile]);
                          }}
                          className="p-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[10px] font-bold transition-colors flex items-center gap-1"
                          title="Direct WhatsApp Message"
                        >
                          <MessageSquare className="w-3 h-3" />
                        </button>
                        <button
                          onClick={(e) => handleSingleDelete(reg.id, e)}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete Registration"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right Column: WhatsApp Broadcast Composer */}
          <div className="lg:col-span-5 bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <h3 className="font-serif font-bold text-slate-900 text-sm flex items-center gap-1.5">
                <Send className="w-4 h-4 text-amber-700" />
                <span>WhatsApp Broadcast Panel</span>
              </h3>
              <span className="text-[11px] font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded-md">
                {selectedPhones.length} Recipients Selected
              </span>
            </div>

            {broadcastStatus && (
              <div
                className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
                  broadcastStatus.success
                    ? "bg-emerald-100 text-emerald-900 border border-emerald-300"
                    : "bg-red-100 text-red-900 border border-red-300"
                }`}
              >
                {broadcastStatus.success ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-red-700 shrink-0" />
                )}
                <span>{broadcastStatus.message}</span>
              </div>
            )}

            {/* Message Text Area */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                WhatsApp Broadcast Message *
              </label>
              <textarea
                rows={4}
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder="Type your WhatsApp update message here..."
                className="w-full p-3 bg-white border border-slate-300 rounded-xl text-xs font-sans focus:ring-2 focus:ring-amber-500"
              />
            </div>

            {/* Image Attachment Controls */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-700">
                Attach Photo / Image (Optional)
              </label>

              {/* Option Buttons Bar */}
              <div className="grid grid-cols-3 gap-2">
                {/* Upload from Device */}
                <label className="cursor-pointer p-2 bg-white hover:bg-slate-100 border border-slate-300 rounded-xl text-[11px] font-semibold text-slate-700 flex items-center justify-center gap-1 transition-colors">
                  <Upload className="w-3.5 h-3.5 text-amber-700" />
                  <span>Device</span>
                  <input type="file" accept="image/*" onChange={handleDeviceFileUpload} className="hidden" />
                </label>

                {/* Live Camera Capture */}
                <button
                  type="button"
                  onClick={startCamera}
                  className="p-2 bg-white hover:bg-slate-100 border border-slate-300 rounded-xl text-[11px] font-semibold text-slate-700 flex items-center justify-center gap-1 transition-colors"
                >
                  <Camera className="w-3.5 h-3.5 text-amber-700" />
                  <span>Camera</span>
                </button>

                {/* Media Library */}
                <button
                  type="button"
                  onClick={() => setIsMediaModalOpen(true)}
                  className="p-2 bg-white hover:bg-slate-100 border border-slate-300 rounded-xl text-[11px] font-semibold text-slate-700 flex items-center justify-center gap-1 transition-colors"
                >
                  <FolderOpen className="w-3.5 h-3.5 text-amber-700" />
                  <span>Library</span>
                </button>
              </div>

              {/* Live Camera Preview Modal / Section */}
              {isCameraActive && (
                <div className="p-3 bg-slate-900 rounded-xl space-y-2 text-center">
                  <video ref={videoRef} autoPlay playsInline className="w-full h-40 object-cover rounded-lg border border-slate-700" />
                  <canvas ref={canvasRef} className="hidden" />
                  <div className="flex gap-2 justify-center">
                    <button
                      type="button"
                      onClick={capturePhoto}
                      className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg flex items-center gap-1"
                    >
                      <Camera className="w-3 h-3" />
                      <span>Take Photo</span>
                    </button>
                    <button
                      type="button"
                      onClick={stopCamera}
                      className="px-3 py-1.5 bg-slate-700 text-white text-xs rounded-lg"
                    >
                      Close Camera
                    </button>
                  </div>
                </div>
              )}

              {/* Image Preview Box */}
              {imageUrl && (
                <div className="relative rounded-xl overflow-hidden border border-slate-300 h-28 bg-white">
                  <img src={imageUrl} alt="Broadcast Attachment" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => setImageUrl("")}
                    className="absolute top-1 right-1 bg-slate-900/80 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>

            {/* Broadcast Action Button */}
            <button
              type="button"
              onClick={handleSendBroadcast}
              disabled={isSending || selectedPhones.length === 0}
              className="w-full py-3 bg-amber-700 hover:bg-amber-800 disabled:opacity-50 text-white font-bold rounded-xl text-xs transition-colors shadow-md flex items-center justify-center gap-2"
            >
              {isSending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Dispatching WhatsApp Broadcast...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Send Broadcast to {selectedPhones.length} Recipients</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Media Picker Modal */}
      <MediaLibraryModal
        isOpen={isMediaModalOpen}
        onClose={() => setIsMediaModalOpen(false)}
        onSelectMedia={(url) => setImageUrl(url)}
      />
    </div>
  );
}
