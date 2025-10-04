// src/components/SummaryModal.jsx
import React, { useState, useEffect } from "react";

export default function SummaryModal({
  open,
  onClose,
  title,
  summary,
  story,
  imageUrl,
  link,
  onGenerate,
  loading,
}) {
  const [genre, setGenre] = useState("Research");
  const [withImage, setWithImage] = useState(true);

  useEffect(() => {
    if (!open) {
      
      setGenre("Research");
      setWithImage(true);
    }
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60" onClick={onClose}></div>

      <div className="relative bg-slate-900 rounded-xl w-full max-w-4xl p-6 z-60 text-slate-100 shadow-xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold">{title}</h3>
            {link && (
              <a href={link} target="_blank" rel="noreferrer" className="text-sky-300 text-sm hover:underline">
                Open source
              </a>
            )}
          </div>

          <div className="flex gap-2 items-center">
            <select
              className="bg-slate-800 text-slate-100 text-sm px-2 py-1 rounded border"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            >
              <option>Research</option>
              <option>Sci-Fi</option>
              <option>Fantasy</option>
              <option>Drama</option>
              <option>Historical</option>
              <option>Custom</option>
            </select>

            <label className="text-xs flex items-center gap-2">
              <input type="checkbox" checked={withImage} onChange={(e) => setWithImage(e.target.checked)} />
              <span>Generate Image</span>
            </label>

            <button
              onClick={() => onGenerate({ genre, generateImage: withImage })}
              className="text-sm px-3 py-1 rounded bg-emerald-600/30 border border-emerald-600/50 text-emerald-300 hover:bg-emerald-600/50 transition"
              disabled={loading}
            >
              {loading ? "Generating..." : "Generate Story"}
            </button>

            <button
              onClick={onClose}
              className="text-sm px-3 py-1 rounded bg-slate-800/70 border border-slate-700 text-slate-300 hover:bg-slate-700 transition"
            >
              Close
            </button>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-1 bg-slate-800/50 p-3 rounded">
            <h5 className="text-sky-300 font-semibold mb-2">Paper Summary</h5>
            <div className="text-slate-200 text-sm whitespace-pre-wrap min-h-[80px]">
              {summary || "No summary yet. Click Generate Story to fetch & convert the paper into a story."}
            </div>
          </div>

          <div className="md:col-span-2 bg-slate-800/50 p-3 rounded">
            <h5 className="text-sky-300 font-semibold mb-2">AI-Generated Story</h5>
            <div className="text-slate-200 text-sm whitespace-pre-wrap min-h-[200px]">
              {story || "No story yet."}
            </div>

            {imageUrl && (
              <div className="mt-4">
                <h5 className="text-sky-300 font-semibold mb-2">Illustration</h5>
                <img src={imageUrl} alt="AI generated" className="w-full rounded-lg shadow" />
                <div className="mt-2 flex gap-2">
                  <a
                    href={imageUrl}
                    download={`${title?.slice(0, 50) || "ai_image"}.png`}
                    className="text-xs px-2 py-1 rounded bg-sky-600/30 border border-sky-600/50 text-sky-300 hover:bg-sky-600/50"
                  >
                    Download Image
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
