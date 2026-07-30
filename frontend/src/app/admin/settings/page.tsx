"use client";

import { useState, useEffect } from "react";
import { getSettings, fetchAPI } from "@/lib/api-client";
import { Settings as SettingsIcon, Save, Loader2 } from "lucide-react";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Record<string, any>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  useEffect(() => {
    loadSettings();
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
    </div>
  );
}
