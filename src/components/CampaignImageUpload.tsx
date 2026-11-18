import React, { useRef, useState } from "react";
import {
  UploadCloud,
  FileImage,
  Trash2,
  RefreshCw,
  LinkIcon,
  Check,
  AlertCircle,
  X
} from "./Icons";

interface CampaignImageUploadProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  showSuggestions?: boolean;
}

export function CampaignImageUpload({
  label = "Campaign Image",
  value,
  onChange,
  showSuggestions = true
}: CampaignImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [error, setError] = useState("");
  const [fileInfo, setFileInfo] = useState<{ name: string; size: string } | null>(null);

  function processFile(file: File) {
    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file (PNG, JPG, WEBP, or SVG).");
      return;
    }

    if (file.size > 15 * 1024 * 1024) {
      setError("Image file is too large (max 15MB). Please choose a smaller image.");
      return;
    }

    setError("");

    const reader = new FileReader();
    reader.onload = (e) => {
      const rawDataUrl = e.target?.result as string;
      if (!rawDataUrl) return;

      // Optimize image dimensions on device before storing
      const img = new Image();
      img.onload = () => {
        try {
          const maxDim = 1200;
          let { width, height } = img;
          if (width > maxDim || height > maxDim) {
            if (width > height) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            } else {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }

          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            const optimized = canvas.toDataURL("image/jpeg", 0.86);
            onChange(optimized);
            setFileInfo({
              name: file.name,
              size: `${Math.round((optimized.length * 0.75) / 1024)} KB`
            });
            return;
          }
        } catch {
          // Fallback to raw data url if canvas fails
        }
        onChange(rawDataUrl);
        setFileInfo({
          name: file.name,
          size: `${Math.round(file.size / 1024)} KB`
        });
      };
      img.onerror = () => {
        onChange(rawDataUrl);
        setFileInfo({
          name: file.name,
          size: `${Math.round(file.size / 1024)} KB`
        });
      };
      img.src = rawDataUrl;
    };
    reader.readAsDataURL(file);
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
    // reset input so the same file can be re-selected if removed
    if (e.target) e.target.value = "";
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  }

  function handleRemove() {
    onChange("");
    setFileInfo(null);
    setError("");
  }

  const hasImage = Boolean(value && value.trim().length > 0);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block font-bold text-slate-700 text-xs tracking-tight">
          {label}
        </label>
        {hasImage && (
          <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1 border border-emerald-200">
            <Check className="w-3 h-3 text-emerald-600" />
            Image Ready
          </span>
        )}
      </div>

      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/png,image/jpeg,image/jpg,image/webp,image/gif,image/avif"
        className="hidden"
      />

      {/* When an image is loaded */}
      {hasImage ? (
        <div className="relative rounded-2xl overflow-hidden border-2 border-slate-200 bg-slate-900 group shadow-sm transition-all hover:border-magenta/40">
          <div className="relative h-44 w-full overflow-hidden bg-slate-100 flex items-center justify-center">
            <img
              src={value}
              alt="Campaign banner preview"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-102"
              onError={() => setError("Could not render the current image. You can replace it by uploading a new one.")}
            />
            {/* Dark gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

            {/* Bottom info banner */}
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
              <div className="flex items-center gap-2 max-w-[65%]">
                <div className="p-1.5 rounded-lg bg-white/20 backdrop-blur-md">
                  <FileImage className="w-4 h-4 text-white" />
                </div>
                <div className="truncate">
                  <div className="text-xs font-bold truncate">
                    {fileInfo?.name || "Campaign Image"}
                  </div>
                  <div className="text-[10px] text-white/80">
                    {fileInfo?.size ? `${fileInfo.size} • Device Upload` : (value.startsWith("data:") ? "Device Upload (Optimized)" : "External Image")}
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-2.5 py-1.5 rounded-xl bg-white/90 text-slate-800 hover:bg-white text-xs font-bold transition-all shadow flex items-center gap-1.5 cursor-pointer"
                  title="Upload another image from device"
                >
                  <RefreshCw className="w-3 h-3 text-magenta" />
                  <span>Replace</span>
                </button>
                <button
                  type="button"
                  onClick={handleRemove}
                  className="p-1.5 rounded-xl bg-rose-500/90 text-white hover:bg-rose-600 text-xs font-bold transition-all shadow cursor-pointer"
                  title="Remove image"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Empty upload dropzone */
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-2xl p-5 text-center cursor-pointer transition-all ${
            isDragging
              ? "border-magenta bg-magenta/5 scale-[0.99]"
              : "border-slate-300 hover:border-magenta/60 hover:bg-magenta/[0.02] bg-white"
          }`}
          style={{ minHeight: "135px" }}
        >
          <div className="flex flex-col items-center justify-center space-y-2 py-1">
            <div className="w-11 h-11 rounded-2xl bg-magenta/10 flex items-center justify-center text-magenta shadow-inner">
              <UploadCloud className="w-5 h-5 text-magenta" />
            </div>

            <div>
              <div className="text-xs font-bold text-slate-800">
                Click to upload campaign image from device
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                or drag and drop your photo here (PNG, JPG, WEBP up to 15MB)
              </div>
            </div>

            <button
              type="button"
              className="mt-1 px-4 py-1.5 rounded-full text-[11px] font-bold text-white shadow-sm transition-all"
              style={{
                background: "linear-gradient(135deg, #E6127E 0%, #B80C64 100%)"
              }}
              onClick={(e) => {
                e.stopPropagation();
                fileInputRef.current?.click();
              }}
            >
              Choose from Computer / Device
            </button>
          </div>
        </div>
      )}

      {/* Error message */}
      {error && (
        <div className="text-[11px] text-rose-600 flex items-center gap-1.5 bg-rose-50 border border-rose-200 rounded-xl px-3 py-1.5 font-medium">
          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Optional URL input / presets toggle */}
      <div className="pt-1">
        <button
          type="button"
          onClick={() => setShowUrlInput(!showUrlInput)}
          className="text-[11px] font-semibold text-slate-500 hover:text-magenta flex items-center gap-1 cursor-pointer transition-colors"
        >
          <LinkIcon className="w-3 h-3" />
          <span>{showUrlInput ? "Hide web URL & presets" : "Or use web link / photo suggestions"}</span>
          <span className="text-[10px] text-slate-400">({showUrlInput ? "▲" : "▼"})</span>
        </button>

        {showUrlInput && (
          <div className="mt-2 p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2 animate-in fade-in duration-200">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                Image Web Link
              </label>
              <div className="flex gap-2">
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/photo-..."
                  value={value.startsWith("data:") ? "" : value}
                  onChange={(e) => {
                    onChange(e.target.value);
                    setFileInfo(null);
                  }}
                  className="flex-1 px-3 py-1.5 rounded-lg border border-slate-300 text-xs outline-none focus:border-magenta bg-white text-slate-800"
                />
                {value && (
                  <button
                    type="button"
                    onClick={handleRemove}
                    className="px-2.5 py-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-semibold cursor-pointer"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            {showSuggestions && (
              <div className="flex items-center gap-1.5 pt-1 flex-wrap">
                <span className="text-[10px] text-slate-400">Suggestions:</span>
                <button
                  type="button"
                  onClick={() => {
                    onChange("https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?auto=format&fit=crop&w=1200&q=80");
                    setFileInfo({ name: "Community Cafe.jpg", size: "Preset" });
                  }}
                  className="text-[10px] font-semibold text-magenta hover:underline cursor-pointer"
                >
                  Community Cafe
                </button>
                <span className="text-slate-300">•</span>
                <button
                  type="button"
                  onClick={() => {
                    onChange("https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80");
                    setFileInfo({ name: "Family Safety.jpg", size: "Preset" });
                  }}
                  className="text-[10px] font-semibold text-magenta hover:underline cursor-pointer"
                >
                  Family Safety
                </button>
                <span className="text-slate-300">•</span>
                <button
                  type="button"
                  onClick={() => {
                    onChange("https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80");
                    setFileInfo({ name: "Winter Warmth.jpg", size: "Preset" });
                  }}
                  className="text-[10px] font-semibold text-magenta hover:underline cursor-pointer"
                >
                  Winter Warmth
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
