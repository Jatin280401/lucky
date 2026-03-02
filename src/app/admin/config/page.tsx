"use client";

import { useEffect, useState } from "react";

const CONFIG_KEYS = [
  "site_name",
  "tagline",
  "hero_date",
  "hero_message",
  "whatsapp_message",
  "telegram_message",
  "contact_email",
  "whatsapp_link",
  "telegram_link",
  "disclaimer",
  "footer_copyright",
  "meta_description",
];

export default function AdminConfigPage() {
  const [config, setConfig] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/site")
      .then((res) => res.json())
      .then(setConfig)
      .catch(console.error);
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setMessage("");
    try {
      const res = await fetch("/api/admin/config", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
      });
      if (!res.ok) throw new Error("Failed");
      setMessage("Saved successfully!");
    } catch {
      setMessage("Failed to save");
    }
    setSaving(false);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Site Configuration</h1>
      <div className="space-y-4 max-w-2xl">
        {CONFIG_KEYS.map((key) => (
          <div key={key}>
            <label className="block text-slate-400 text-sm mb-1">{key}</label>
            <input
              type="text"
              value={config[key] ?? ""}
              onChange={(e) =>
                setConfig((c) => ({ ...c, [key]: e.target.value }))
              }
              className="w-full bg-slate-800 border border-slate-600 rounded px-4 py-2 text-white"
            />
          </div>
        ))}
        <button
          onClick={handleSave}
          disabled={saving}
          className="mt-4 px-6 py-2 bg-green-600 hover:bg-green-500 rounded font-medium disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save"}
        </button>
        {message && (
          <p className={message.includes("Failed") ? "text-red-400" : "text-green-400"}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
