"use client";

import { useEffect, useState } from "react";

interface ContentSection {
  id: string;
  key: string;
  title: string | null;
  content: string;
  order: number;
}

export default function AdminContentPage() {
  const [sections, setSections] = useState<ContentSection[]>([]);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/content")
      .then((res) => res.json())
      .then(setSections)
      .catch(console.error);
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setMessage("");
    try {
      const res = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sections),
      });
      if (!res.ok) throw new Error("Failed");
      setMessage("Saved successfully!");
    } catch {
      setMessage("Failed to save");
    }
    setSaving(false);
  };

  const update = (id: string, field: "title" | "content", value: string) => {
    setSections((s) =>
      s.map((x) => (x.id === id ? { ...x, [field]: value } : x))
    );
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Content Sections</h1>
      <div className="space-y-4">
        {sections.map((s) => (
          <div
            key={s.id}
            className="bg-slate-800 border border-slate-600 rounded-lg overflow-hidden"
          >
            <button
              onClick={() => setExpanded(expanded === s.id ? null : s.id)}
              className="w-full px-4 py-3 text-left flex justify-between items-center hover:bg-slate-700"
            >
              <span className="font-medium text-slate-200">{s.key}</span>
              <span className="text-slate-500">{expanded === s.id ? "−" : "+"}</span>
            </button>
            {expanded === s.id && (
              <div className="p-4 border-t border-slate-600 space-y-4">
                <div>
                  <label className="block text-slate-400 text-sm mb-1">Title</label>
                  <input
                    value={s.title ?? ""}
                    onChange={(e) => update(s.id, "title", e.target.value)}
                    className="w-full bg-slate-900 border border-slate-600 rounded px-4 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 text-sm mb-1">Content</label>
                  <textarea
                    value={s.content}
                    onChange={(e) => update(s.id, "content", e.target.value)}
                    rows={6}
                    className="w-full bg-slate-900 border border-slate-600 rounded px-4 py-2 text-white"
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <button
        onClick={handleSave}
        disabled={saving}
        className="mt-6 px-6 py-2 bg-green-600 hover:bg-green-500 rounded font-medium disabled:opacity-50"
      >
        {saving ? "Saving..." : "Save"}
      </button>
      {message && (
        <p className={`mt-2 ${message.includes("Failed") ? "text-red-400" : "text-green-400"}`}>
          {message}
        </p>
      )}
    </div>
  );
}
