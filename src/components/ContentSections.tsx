"use client";

import { useEffect, useState } from "react";

interface ContentSection {
  id: string;
  key: string;
  title: string | null;
  content: string;
  order: number;
}

export default function ContentSections() {
  const [sections, setSections] = useState<ContentSection[]>([]);

  useEffect(() => {
    fetch("/api/content")
      .then((res) => res.json())
      .then(setSections)
      .catch(console.error);
  }, []);

  const faqKeys = ["faq_title", "faq_types", "faq_winning", "faq_predict"];
  const faqSections = sections.filter((s) => faqKeys.includes(s.key));
  const otherSections = sections.filter((s) => !faqKeys.includes(s.key));

  return (
    <div className="space-y-8 my-12">
      {otherSections
        .filter((s) => s.title || s.content)
        .map((section) => (
          <div key={section.id} className="bg-slate-800/50 rounded-lg p-6">
            {section.title && (
              <h2 className="text-xl font-bold text-green-400 mb-3">
                {section.title}
              </h2>
            )}
            {section.content && (
              <p className="text-slate-300 leading-relaxed">{section.content}</p>
            )}
          </div>
        ))}
      {faqSections.length > 0 && (
        <div className="bg-slate-800/50 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-green-400 mb-6">
            Frequently Asked Question About A1-Satta
          </h2>
          <div className="space-y-4">
            {faqSections
              .filter((s) => s.key !== "faq_title")
              .map((section) => (
                <div key={section.id}>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {section.title}
                  </h3>
                  <p className="text-slate-400">{section.content}</p>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
