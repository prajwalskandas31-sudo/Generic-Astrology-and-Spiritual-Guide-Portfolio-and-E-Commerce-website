"use client";

import { useState, useEffect } from "react";
import { getSettings, fetchAPI, getCalendarStatus, getWhatsAppStatus, completeWhatsAppEmbeddedSignup, disconnectWhatsApp, sendWhatsAppTestMessage, getCurrentAdminUser, logAuditEvent, updateAdminPassword, verifyAdminPassword, PREDEFINED_ADMIN_ACCOUNTS } from "@/lib/api-client";
import { Settings as SettingsIcon, Save, Loader2, Calendar, CheckCircle2, AlertCircle, CreditCard, Key, MessageSquare, Smartphone, ExternalLink, ShieldCheck, RefreshCw, Unlink, Send } from "lucide-react";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Record<string, any>>({});
  const [calendarStatus, setCalendarStatus] = useState<any>(null);
  const [waStatus, setWaStatus] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isConnectingWA, setIsConnectingWA] = useState(false);
  const [customWaToken, setCustomWaToken] = useState("");
  const [customWaPhoneId, setCustomWaPhoneId] = useState("");
  const [isSavingWaToken, setIsSavingWaToken] = useState(false);
  const [testPhone, setTestPhone] = useState("6362612641");
  const [isSendingTestMsg, setIsSendingTestMsg] = useState(false);
  const [waError, setWaError] = useState("");
  const [waSuccessMsg, setWaSuccessMsg] = useState("");
  const [saveMessage, setSaveMessage] = useState("");

  useEffect(() => {
    loadSettings();
  }, []);

  useEffect(() => {
    // Listen for Meta Embedded Signup postMessage completion event
    const handlePostMessage = async (event: MessageEvent) => {
      if (typeof event.origin === "string" && !event.origin.includes("facebook.com") && !event.origin.includes("fb.com")) {
        return;
      }
      try {
        const data = typeof event.data === "string" ? JSON.parse(event.data) : event.data;
        if (
          data?.type === "WA_EMBEDDED_SIGNUP" ||
          data?.event === "FINISH_WHATSAPP_BUSINESS_APP_ONBOARDING"
        ) {
          const code = data?.data?.code || data?.code;
          const wabaId = data?.data?.waba_id || data?.waba_id || "1516112060284880";
          const phoneId = data?.data?.phone_number_id || data?.phone_number_id;

          setIsConnectingWA(true);
          setWaError("");
          const res = await completeWhatsAppEmbeddedSignup({
            code,
            waba_id: wabaId,
            phone_number_id: phoneId,
          });
          if (res.success) {
            setWaSuccessMsg("WhatsApp Business App coexistence onboarding completed successfully!");
            const updated = await getWhatsAppStatus();
            setWaStatus(updated);
          }
        }
      } catch (err: any) {
        console.warn("Meta postMessage listener note:", err);
      } finally {
        setIsConnectingWA(false);
      }
    };

    window.addEventListener("message", handlePostMessage);
    return () => window.removeEventListener("message", handlePostMessage);
  }, []);

  const loadSettings = async () => {
    setIsLoading(true);
    try {
      const data = await getSettings();
      setSettings(data);
    } catch (_) {
    } finally {
      setIsLoading(false);
    }

    // Background fetch integration statuses without blocking settings UI
    getCalendarStatus().then(setCalendarStatus).catch(() => {});
    getWhatsAppStatus().then(setWaStatus).catch(() => {});
  };

  const handleLaunchWhatsAppOnboarding = async () => {
    setIsConnectingWA(true);
    setWaError("");
    setWaSuccessMsg("");

    try {
      if (typeof window !== "undefined" && (window as any).FB) {
        (window as any).FB.login(
          async (response: any) => {
            if (response && response.authResponse && response.authResponse.code) {
              try {
                const res = await completeWhatsAppEmbeddedSignup({
                  code: response.authResponse.code,
                });
                if (res.success) {
                  setWaSuccessMsg("WhatsApp Business App coexistence connected successfully!");
                  const updated = await getWhatsAppStatus();
                  setWaStatus(updated);
                }
              } catch (err: any) {
                setWaError(err.message || "Failed to complete WhatsApp code exchange.");
              } finally {
                setIsConnectingWA(false);
              }
            } else {
              setIsConnectingWA(false);
              if (response?.status === "not_authorized" || response?.status === "unknown") {
                setWaError("WhatsApp signup popup was closed before completion.");
              }
            }
          },
          {
            config_id: "1516112060284880",
            response_type: "code",
            override_default_response_type: true,
            extras: {
              setup: {},
              featureType: "whatsapp_business_app_onboarding",
            },
          }
        );
      } else {
        // Fallback: Trigger direct authorization popup or completion handler
        const res = await completeWhatsAppEmbeddedSignup({
          waba_id: "1516112060284880",
          phone_number_id: "919844042068",
        });
        if (res.success) {
          setWaSuccessMsg("WhatsApp Business App coexistence connection recorded successfully!");
          const updated = await getWhatsAppStatus();
          setWaStatus(updated);
        }
      }
    } catch (err: any) {
      setWaError(err.message || "Failed to initialize WhatsApp Embedded Signup.");
    } finally {
      setIsConnectingWA(false);
    }
  };

  const handleDisconnectWhatsApp = async () => {
    if (!confirm("Are you sure you want to disconnect WhatsApp Business Integration?")) return;
    try {
      await disconnectWhatsApp();
      const updated = await getWhatsAppStatus();
      setWaStatus(updated);
      setWaSuccessMsg("WhatsApp Business integration disconnected.");
    } catch (err: any) {
      alert("Error disconnecting: " + err.message);
    }
  };

  const handleSaveCustomWaCredentials = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customWaToken) {
      alert("Please enter a valid Meta WhatsApp Access Token.");
      return;
    }
    setIsSavingWaToken(true);
    setWaError("");
    setWaSuccessMsg("");

    try {
      const res = await completeWhatsAppEmbeddedSignup({
        access_token: customWaToken.trim(),
        phone_number_id: customWaPhoneId ? customWaPhoneId.trim() : (waStatus?.phone_number_id || "919844042068"),
        waba_id: waStatus?.waba_id || "1516112060284880",
      });
      if (res.success) {
        setWaSuccessMsg("WhatsApp Access Token and Phone Number ID updated & verified!");
        const updated = await getWhatsAppStatus();
        setWaStatus(updated);
        setCustomWaToken("");
      }
    } catch (err: any) {
      setWaError(err.message || "Failed to save WhatsApp credentials.");
    } finally {
      setIsSavingWaToken(false);
    }
  };

  const handleSendTestTrialMessage = async () => {
    if (!testPhone) return;
    setIsSendingTestMsg(true);
    setWaError("");
    setWaSuccessMsg("");

    try {
      const res = await sendWhatsAppTestMessage(testPhone);
      const metaRes = res?.meta_response;
      if (metaRes && metaRes.messages && metaRes.messages.length > 0) {
        setWaSuccessMsg(`Trial test message dispatched via Meta Cloud API! Message ID: ${metaRes.messages[0].id}`);
      } else if (metaRes && metaRes.status === "mock_sent") {
        setWaError("Server is in Mock Mode. Please save a valid Meta Access Token and Phone Number ID below.");
      } else {
        setWaSuccessMsg(`Test message dispatched. Meta response: ${JSON.stringify(metaRes)}`);
      }
    } catch (err: any) {
      setWaError("Test dispatch failed: " + err.message);
    } finally {
      setIsSendingTestMsg(false);
    }
  };


  const handleFieldChange = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSaveAll = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveMessage("");

    try {
      for (const [key, value] of Object.entries(settings)) {
        await fetchAPI(`/settings/${key}`, {
          method: "PUT",
          headers: { Authorization: "Bearer mock-admin-token" },
          body: JSON.stringify({ value }),
        });
      }
      setSaveMessage("Settings saved successfully! Website content updated.");
      setTimeout(() => setSaveMessage(""), 4000);
    } catch (err: any) {
      alert("Error saving settings: " + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="py-16 text-center text-slate-500 flex items-center justify-center gap-2">
        <Loader2 className="w-5 h-5 animate-spin text-amber-700" />
        <span>Loading settings...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-serif font-bold text-slate-900 flex items-center gap-2">
          <SettingsIcon className="w-7 h-7 text-amber-700" />
          <span>General Site Settings</span>
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Manage website content, hero headers, contact numbers, WhatsApp configuration, and legal policy pages without modifying code.
        </p>
      </div>

      {saveMessage && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium rounded-xl shadow-xs">
          {saveMessage}
        </div>
      )}

      <form onSubmit={handleSaveAll} className="space-y-8">
        {/* HERO & BRANDING SETTINGS */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">
            Hero &amp; Branding Settings
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Site Title / Name</label>
              <input
                type="text"
                value={settings.site_name || ""}
                onChange={(e) => handleFieldChange("site_name", e.target.value)}
                className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Hero Title</label>
              <input
                type="text"
                value={settings.hero_title || ""}
                onChange={(e) => handleFieldChange("hero_title", e.target.value)}
                className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-sm"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Hero Subtitle</label>
            <textarea
              rows={2}
              value={settings.hero_subtitle || ""}
              onChange={(e) => handleFieldChange("hero_subtitle", e.target.value)}
              className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-sm"
            />
          </div>
        </div>

        {/* CONTACT & WHATSAPP SETTINGS */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">
            Contact &amp; WhatsApp Settings
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Mobile Number</label>
              <input
                type="text"
                value={settings.contact_mobile || ""}
                onChange={(e) => handleFieldChange("contact_mobile", e.target.value)}
                className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">WhatsApp Number (digits)</label>
              <input
                type="text"
                value={settings.whatsapp_number || ""}
                onChange={(e) => handleFieldChange("whatsapp_number", e.target.value)}
                className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-sm font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Contact Email</label>
              <input
                type="email"
                value={settings.contact_email || ""}
                onChange={(e) => handleFieldChange("contact_email", e.target.value)}
                className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-sm"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Office Address</label>
            <input
              type="text"
              value={settings.office_address || ""}
              onChange={(e) => handleFieldChange("office_address", e.target.value)}
              className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-sm"
            />
          </div>
        </div>

        {/* META WHATSAPP EMBEDDED SIGNUP & COEXISTENCE INTEGRATION */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 border border-emerald-200 flex items-center justify-center">
                <MessageSquare className="w-4.5 h-4.5 text-emerald-700" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  WhatsApp Business API &amp; Coexistence
                </h2>
                <p className="text-[11px] text-slate-500">
                  Meta Embedded Signup (Config ID: <code className="font-mono text-emerald-800">1516112060284880</code>)
                </p>
              </div>
            </div>
            {waStatus?.connected ? (
              <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1.5 shadow-2xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>WhatsApp Connected</span>
              </span>
            ) : (
              <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-300 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                <span>Ready for Connection</span>
              </span>
            )}
          </div>

          {waSuccessMsg && (
            <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium rounded-xl flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{waSuccessMsg}</span>
            </div>
          )}

          {waError && (
            <div className="p-3.5 bg-red-50 border border-red-200 text-red-800 text-xs font-medium rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              <span>{waError}</span>
            </div>
          )}

          <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-xl space-y-3 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 font-mono text-[11px]">
              <div>
                <span className="text-slate-400 block text-[10px] font-sans font-medium uppercase">Target Phone</span>
                <span className="font-bold text-slate-800 flex items-center gap-1">
                  <Smartphone className="w-3 h-3 text-emerald-600" />
                  {waStatus?.display_phone_number || "+91 98440 42068"}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] font-sans font-medium uppercase">WABA Account ID</span>
                <span className="font-bold text-slate-800">
                  {waStatus?.waba_id || "1516112060284880"}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] font-sans font-medium uppercase">Feature Onboarding</span>
                <span className="font-bold text-emerald-800">
                  whatsapp_business_app_onboarding
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] font-sans font-medium uppercase">Coexistence Mode</span>
                <span className="font-bold text-emerald-700 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  Active (App + Cloud API)
                </span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200/80 text-[11px] text-slate-600 leading-relaxed">
              💡 <strong>Business App Coexistence Enabled:</strong> Connecting this number allows web booking updates and interactive WhatsApp customer messaging via Meta Cloud API without losing access to your phone&apos;s WhatsApp Business App.
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleLaunchWhatsAppOnboarding}
                disabled={isConnectingWA}
                className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white font-bold rounded-xl text-xs transition-colors shadow-md flex items-center gap-2 cursor-pointer"
              >
                {isConnectingWA ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>Connecting WhatsApp...</span>
                  </>
                ) : (
                  <>
                    <MessageSquare className="w-4 h-4" />
                    <span>{waStatus?.connected ? "Re-Connect WhatsApp Business" : "Connect WhatsApp"}</span>
                  </>
                )}
              </button>
            </div>

            {waStatus?.connected && (
              <button
                type="button"
                onClick={handleDisconnectWhatsApp}
                className="px-3.5 py-2 border border-slate-300 text-slate-600 hover:text-red-700 hover:border-red-300 hover:bg-red-50 rounded-xl text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Unlink className="w-3.5 h-3.5" />
                <span>Disconnect</span>
              </button>
            )}
          </div>

          {/* Direct Credentials Management (Permanent Token & Phone Number ID) */}
          <div className="pt-4 border-t border-slate-100 space-y-3">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Direct Meta Credentials Management (Optional / System User Token)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-medium text-slate-700 mb-1">
                  Meta Access Token (System User / Permanent Token)
                </label>
                <input
                  type="password"
                  placeholder={waStatus?.has_access_token ? "•••••••••••••••• (Active Token Saved)" : "EAAG..."}
                  value={customWaToken}
                  onChange={(e) => setCustomWaToken(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-mono"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-slate-700 mb-1">
                  WhatsApp Phone Number ID
                </label>
                <input
                  type="text"
                  placeholder={waStatus?.phone_number_id || "919844042068"}
                  value={customWaPhoneId}
                  onChange={(e) => setCustomWaPhoneId(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-mono"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleSaveCustomWaCredentials}
                disabled={isSavingWaToken || !customWaToken}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 disabled:opacity-40 text-white font-bold rounded-xl text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                {isSavingWaToken ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Verifying Token...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Token &amp; Phone ID</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Send Instant Trial Test Message */}
          <div className="pt-4 border-t border-slate-100 space-y-3">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
              <span>Send Instant Trial Test Message</span>
            </h3>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <input
                type="text"
                placeholder="6362612641"
                value={testPhone}
                onChange={(e) => setTestPhone(e.target.value)}
                className="px-3 py-2 border border-slate-300 rounded-xl text-xs font-mono w-full sm:w-48"
              />
              <button
                type="button"
                onClick={handleSendTestTrialMessage}
                disabled={isSendingTestMsg || !testPhone}
                className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white font-bold rounded-xl text-xs transition-colors shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {isSendingTestMsg ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Dispatching Test...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Trial Message to +91 {testPhone}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* PAYMENT GATEWAY & UPI CONFIGURATION */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-amber-700" />
              <span>Payment Gateway &amp; UPI Configuration</span>
            </h2>
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300 flex items-center gap-1">
              <Key className="w-3 h-3 text-amber-600" />
              <span>Self-Service Setup</span>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Razorpay Key ID (Public)</label>
              <input
                type="text"
                placeholder="rzp_live_xxxxxxxxxxxxxx"
                value={settings.razorpay_key_id || ""}
                onChange={(e) => handleFieldChange("razorpay_key_id", e.target.value)}
                className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-sm font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Razorpay Key Secret (Private)</label>
              <input
                type="password"
                placeholder="••••••••••••••••••••"
                value={settings.razorpay_key_secret || ""}
                onChange={(e) => handleFieldChange("razorpay_key_secret", e.target.value)}
                className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-sm font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Default UPI VPA / ID (Optional)</label>
              <input
                type="text"
                placeholder="pradeepnadig@upi"
                value={settings.default_upi_id || ""}
                onChange={(e) => handleFieldChange("default_upi_id", e.target.value)}
                className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-sm font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Default Custom Payment Link (Optional)</label>
              <input
                type="url"
                placeholder="https://rzp.io/l/default"
                value={settings.default_payment_link || ""}
                onChange={(e) => handleFieldChange("default_payment_link", e.target.value)}
                className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-sm font-mono"
              />
            </div>
          </div>

          <p className="text-[11px] text-slate-500 bg-amber-50/60 p-3 rounded-xl border border-amber-100">
            💡 <strong>Note:</strong> When you enable &quot;Include Payment&quot; on any workshop, these credentials will be automatically used to process instant online payments.
          </p>
        </div>

        {/* GOOGLE CALENDAR INTEGRATION STATUS */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Calendar className="w-4 h-4 text-amber-700" />
              <span>Google Calendar API Integration</span>
            </h2>
            {calendarStatus?.connected ? (
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                <span>Connected &amp; Active</span>
              </span>
            ) : (
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300 flex items-center gap-1">
                <AlertCircle className="w-3 h-3 text-amber-600" />
                <span>Graceful Fallback Mode</span>
              </span>
            )}
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs text-slate-600">
            <p className="font-semibold text-slate-900">
              Current Mode: <span className="font-mono text-amber-800">{calendarStatus?.mode || "Fallback (One-Click Web Links)"}</span>
            </p>
            <p>{calendarStatus?.message || "Google Calendar events can be added using one-click Web Links directly from the Accepted Schedule page."}</p>

            <div className="pt-2 border-t border-slate-200/80 font-mono text-[11px] grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div>
                <span className="text-slate-400 block text-[10px] font-sans font-medium uppercase">GOOGLE_CLIENT_ID</span>
                <span className={calendarStatus?.details?.has_client_id ? "text-emerald-700 font-bold" : "text-slate-400"}>
                  {calendarStatus?.details?.has_client_id ? "Configured ✓" : "Not Set (Optional)"}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] font-sans font-medium uppercase">GOOGLE_CLIENT_SECRET</span>
                <span className={calendarStatus?.details?.has_client_secret ? "text-emerald-700 font-bold" : "text-slate-400"}>
                  {calendarStatus?.details?.has_client_secret ? "Configured ✓" : "Not Set (Optional)"}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] font-sans font-medium uppercase">GOOGLE_REFRESH_TOKEN</span>
                <span className={calendarStatus?.details?.has_refresh_token ? "text-emerald-700 font-bold" : "text-slate-400"}>
                  {calendarStatus?.details?.has_refresh_token ? "Configured ✓" : "Not Set (Optional)"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* LEGAL PAGES CONTENT */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">
            Legal Pages Content
          </h2>
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Privacy Policy Content</label>
            <textarea
              rows={3}
              value={settings.privacy_policy || ""}
              onChange={(e) => handleFieldChange("privacy_policy", e.target.value)}
              className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-sm font-sans"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Terms &amp; Conditions Content</label>
            <textarea
              rows={3}
              value={settings.terms_conditions || ""}
              onChange={(e) => handleFieldChange("terms_conditions", e.target.value)}
              className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-sm font-sans"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Refund Policy Content</label>
            <textarea
              rows={3}
              value={settings.refund_policy || ""}
              onChange={(e) => handleFieldChange("refund_policy", e.target.value)}
              className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-sm font-sans"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className="px-8 py-3.5 bg-amber-700 hover:bg-amber-800 disabled:opacity-50 text-white font-bold rounded-xl text-sm transition-colors shadow-lg flex items-center gap-2"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Saving All Settings...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save All Settings</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* ADMIN SECURITY & PASSWORD RESET CARD (Independent Card outside settings form) */}
      <div className="bg-white rounded-2xl p-6 border border-amber-200 shadow-xs space-y-4 bg-gradient-to-br from-amber-50/20 via-white to-orange-50/20">
        <div className="flex items-center gap-2 border-b border-amber-100 pb-2">
          <Key className="w-5 h-5 text-amber-700" />
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            Admin Account Security &amp; Password Reset
          </h2>
        </div>
        <p className="text-xs text-slate-500">
          Change your active admin account password. Click <strong>Save &amp; Change Password</strong> below to update immediately.
        </p>

        <PasswordResetCard />
      </div>
    </div>
  );
}

function PasswordResetCard() {
  const [currentAdmin, setCurrentAdmin] = useState<any>(null);
  const [selectedEmail, setSelectedEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isChanging, setIsChanging] = useState(false);
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState<"success" | "error">("success");
  const [testPassword, setTestPassword] = useState("");
  const [testResult, setTestResult] = useState<string | null>(null);

  useEffect(() => {
    const user = getCurrentAdminUser();
    setCurrentAdmin(user);
    if (user?.email) {
      setSelectedEmail(user.email);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg("");
    setTestResult(null);

    if (!selectedEmail) {
      setMsgType("error");
      setMsg("Please select an admin account.");
      return;
    }

    if (currentPassword) {
      const isCurrentValid = verifyAdminPassword(selectedEmail, currentPassword);
      if (!isCurrentValid) {
        setMsgType("error");
        setMsg("Current password verification failed. Please enter your correct current password.");
        return;
      }
    }

    if (!newPassword || newPassword.length < 6) {
      setMsgType("error");
      setMsg("New password must be at least 6 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setMsgType("error");
      setMsg("New password and confirm password do not match.");
      return;
    }

    setIsChanging(true);
    try {
      await updateAdminPassword(selectedEmail, newPassword);

      const targetAccount = PREDEFINED_ADMIN_ACCOUNTS.find(a => a.email.toLowerCase() === selectedEmail.toLowerCase()) || currentAdmin;

      logAuditEvent({
        action_category: "SYSTEM",
        action_summary: `${currentAdmin?.name || "Admin"} updated security password for ${targetAccount?.name || selectedEmail}`,
        target_resource: "Account Security Credentials",
        details: { target_email: selectedEmail, updated_at: new Date().toISOString() },
        severity: "CRITICAL",
      });

      setMsgType("success");
      setMsg(`✅ Security password changed successfully for ${selectedEmail}! The new password is active immediately for your next login.`);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      setMsgType("error");
      setMsg("Failed to update password: " + err.message);
    } finally {
      setIsChanging(false);
    }
  };

  const handleTestVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!testPassword) return;
    const isValid = verifyAdminPassword(selectedEmail, testPassword);
    if (isValid) {
      setTestResult("✅ Password Verified! Your new password matches active system credentials.");
    } else {
      setTestResult("❌ Password Verification Failed: Does not match active credentials.");
    }
  };

  return (
    <div className="space-y-6 pt-2">
      <div className="space-y-4">
        {msg && (
          <div className={`p-4 rounded-xl text-xs font-bold ${msgType === "success" ? "bg-emerald-100 text-emerald-900 border border-emerald-300 shadow-sm" : "bg-red-100 text-red-900 border border-red-300 shadow-sm"}`}>
            {msg}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Target Account</label>
            <select
              value={selectedEmail}
              onChange={(e) => setSelectedEmail(e.target.value)}
              className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-sm font-medium focus:ring-2 focus:ring-amber-500 bg-white"
            >
              {PREDEFINED_ADMIN_ACCOUNTS.map((acc) => (
                <option key={acc.id} value={acc.email}>
                  {acc.name} ({acc.email})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Current Password (Optional Verification)</label>
            <input
              type="password"
              placeholder="Enter current password..."
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">New Security Password</label>
            <input
              type="password"
              required
              placeholder="Enter new password (min 6 chars)..."
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-amber-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Confirm New Password</label>
            <input
              type="password"
              required
              placeholder="Confirm new password..."
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div className="sm:col-span-2 flex items-center justify-start gap-3">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isChanging}
              className="px-5 py-2.5 bg-amber-900 hover:bg-amber-950 text-amber-100 rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              {isChanging ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <ShieldCheck className="w-3.5 h-3.5" />}
              <span>Save &amp; Change Password</span>
            </button>
          </div>
        </div>
      </div>

      {/* INSTANT CREDENTIAL TESTING SUITE */}
      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
            <Key className="w-4 h-4 text-amber-700" />
            Verify / Test Password Credentials
          </span>
          <span className="text-[11px] text-slate-500 font-medium">Test active stored password</span>
        </div>
        <form onSubmit={handleTestVerify} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <input
            type="password"
            placeholder="Type your password to test..."
            value={testPassword}
            onChange={(e) => {
              setTestPassword(e.target.value);
              setTestResult(null);
            }}
            className="flex-1 px-3.5 py-2 border border-slate-300 rounded-xl text-sm bg-white"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-semibold transition-all"
          >
            Verify Password
          </button>
        </form>
        {testResult && (
          <div className={`p-2.5 rounded-xl text-xs font-semibold ${testResult.startsWith("✅") ? "bg-emerald-100 text-emerald-900 border border-emerald-300" : "bg-red-100 text-red-900 border border-red-300"}`}>
            {testResult}
          </div>
        )}
      </div>
    </div>
  );
}
