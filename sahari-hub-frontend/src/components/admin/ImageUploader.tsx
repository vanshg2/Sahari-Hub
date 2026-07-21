"use client";

import { useState, useRef, useCallback } from "react";
import { Upload, X, Star, Link as LinkIcon, Image as ImageIcon } from "lucide-react";
import { uploadApi } from "@/lib/api";

export interface ProductImage {
  url: string;
  altText?: string;
  isPrimary: boolean;
  order: number;
  localFile?: File;
  uploading?: boolean;
}

interface ImageUploaderProps {
  images: ProductImage[];
  onChange: (images: ProductImage[]) => void;
  productName?: string;
}

export function ImageUploader({ images, onChange, productName }: ImageUploaderProps) {
  const [dragOver, setDragOver] = useState(false);
  const [urlInput, setUrlInput] = useState("");
  const [urlMode, setUrlMode] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const addFiles = useCallback(async (files: FileList | File[]) => {
    const imageFiles = Array.from(files).filter((f) => f.type.startsWith("image/"));
    if (imageFiles.length === 0) return;

    const hasPrimary = images.some((img) => img.isPrimary);
    const newImages: ProductImage[] = imageFiles.map((file, i) => ({
      url: URL.createObjectURL(file),
      altText: productName || file.name,
      isPrimary: images.length === 0 && i === 0 ? true : false,
      order: images.length + i,
      localFile: file,
    }));

    onChange([...images, ...newImages]);

    setUploading(true);
    try {
      const results = await uploadApi.multiple(imageFiles);
      const updated = [...images, ...newImages].map((img, i) => {
        const resultIdx = i - images.length;
        if (resultIdx >= 0 && results[resultIdx]) {
          URL.revokeObjectURL(img.url);
          return { ...img, url: results[resultIdx].url, localFile: undefined, uploading: false };
        }
        return { ...img, uploading: false };
      });
      onChange(updated);
    } catch {
      onChange([...images, ...newImages].map((img) => ({ ...img, uploading: false })));
    } finally {
      setUploading(false);
    }
  }, [images, onChange, productName]);

  const addUrl = () => {
    const trimmed = urlInput.trim();
    if (!trimmed) return;
    const hasPrimary = images.some((img) => img.isPrimary);
    const newImg: ProductImage = {
      url: trimmed,
      altText: productName || "Product image",
      isPrimary: images.length === 0,
      order: images.length,
    };
    onChange([...images, newImg]);
    setUrlInput("");
  };

  const removeImage = (index: number) => {
    const img = images[index];
    if (img.url.startsWith("blob:")) URL.revokeObjectURL(img.url);
    const updated = images.filter((_, i) => i !== index);
    if (img.isPrimary && updated.length > 0) {
      updated[0] = { ...updated[0], isPrimary: true };
    }
    onChange(updated);
  };

  const setPrimary = (index: number) => {
    onChange(images.map((img, i) => ({ ...img, isPrimary: i === index })));
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files) addFiles(e.dataTransfer.files);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`w-full aspect-[21/9] border-2 border-dashed rounded-xl flex flex-col items-center justify-center text-on-surface-variant cursor-pointer transition-all ${
          dragOver
            ? "border-muted-gold text-primary bg-tertiary-fixed/20"
            : "border-outline-variant hover:border-muted-gold hover:text-primary"
        }`}
      >
        <ImageIcon className="w-8 h-8 mb-2 text-muted-gold" />
        <p className="font-label-md uppercase tracking-widest">
          {uploading ? "Uploading..." : "Click to upload or drag & drop"}
        </p>
        <p className="font-body-sm mt-1">JPEG, PNG, WebP or GIF (max 5MB each, up to 10 files)</p>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="hidden"
        onChange={(e) => { if (e.target.files) addFiles(e.target.files); e.target.value = ""; }}
      />

      {/* URL input toggle */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setUrlMode(!urlMode)}
          className="flex items-center gap-2 text-sm text-on-surface-variant hover:text-primary transition-colors"
        >
          <LinkIcon className="w-4 h-4" />
          {urlMode ? "Hide URL input" : "Add image by URL"}
        </button>
      </div>

      {urlMode && (
        <div className="flex gap-2">
          <input
            type="url"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addUrl())}
            placeholder="https://example.com/image.jpg"
            className="flex-1 p-3 bg-surface-container-low border border-outline-variant/30 rounded-md font-body-md text-primary focus:outline-none focus:border-muted-gold transition-colors"
          />
          <button
            type="button"
            onClick={addUrl}
            className="px-4 py-3 bg-surface-container text-primary border border-outline-variant/30 rounded-md font-label-md uppercase text-sm hover:bg-surface-container-low transition-colors"
          >
            Add
          </button>
        </div>
      )}

      {/* Image previews */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {images.map((img, index) => (
            <div
              key={index}
              className={`relative group rounded-lg overflow-hidden border-2 aspect-square bg-surface-container-low ${
                img.isPrimary ? "border-muted-gold ring-2 ring-muted-gold/30" : "border-surface-container"
              }`}
            >
              <img
                src={img.url}
                alt={img.altText || "Product image"}
                className="w-full h-full object-cover"
              />

              {/* Overlay controls */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => setPrimary(index)}
                  className={`p-2 rounded-full transition-colors ${
                    img.isPrimary ? "bg-muted-gold text-white" : "bg-white/90 text-primary hover:bg-muted-gold hover:text-white"
                  }`}
                  title="Set as main image"
                >
                  <Star className={`w-4 h-4 ${img.isPrimary ? "fill-current" : ""}`} />
                </button>
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="p-2 rounded-full bg-white/90 text-error hover:bg-error hover:text-white transition-colors"
                  title="Remove image"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Primary badge */}
              {img.isPrimary && (
                <span className="absolute top-2 left-2 bg-muted-gold text-white text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                  Main
                </span>
              )}

              {/* Uploading indicator */}
              {img.uploading && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <div className="animate-pulse text-white font-body-sm">Uploading...</div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
