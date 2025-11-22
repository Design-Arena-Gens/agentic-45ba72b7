'use client';

import Image from "next/image";
import { useCallback, useRef, useState } from "react";

type PreviewState = {
  file: File;
  url: string;
};

export default function HomePage() {
  const [preview, setPreview] = useState<PreviewState | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const reset = () => {
    if (preview) {
      URL.revokeObjectURL(preview.url);
    }
    setPreview(null);
  };

  const handleFiles = useCallback((files: FileList | null) => {
    if (!files?.length) return;
    const file = files[0];
    if (!file.type.startsWith("image/")) {
      alert("من فضلك اختر ملف صورة فقط.");
      return;
    }
    if (preview) {
      URL.revokeObjectURL(preview.url);
    }
    const url = URL.createObjectURL(file);
    setPreview({ file, url });
  }, [preview]);

  const onDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setIsDragging(false);
    handleFiles(event.dataTransfer.files);
  };

  const triggerSelect = () => {
    inputRef.current?.click();
  };

  return (
    <div className="app">
      <header className="header">
        <h1 className="title">أرني صورتك</h1>
        <p className="subtitle">اسحب الصورة هنا أو اضغط للاختيار من جهازك</p>
      </header>

      <label
        className="uploader"
        style={{
          borderColor: isDragging ? "#4f46e5" : undefined,
          background: isDragging ? "rgba(79, 70, 229, 0.16)" : undefined
        }}
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={onDrop}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={(event) => handleFiles(event.target.files)}
        />
        <div className="hint">
          {isDragging ? "اترك الصورة هنا" : "اضغط أو اسحب الصورة لعرضها"}
        </div>
      </label>

      {preview && (
        <>
          <div className="preview">
            <Image
              src={preview.url}
              alt={preview.file.name}
              fill
              sizes="(max-width: 600px) 90vw, 500px"
              unoptimized
            />
          </div>
          <div className="details">
            <span className="name">{preview.file.name}</span>
            <span className="size">
              {(preview.file.size / 1024).toFixed(1)} كيلوبايت
            </span>
          </div>
        </>
      )}

      <div className="actions">
        <button type="button" className="primary" onClick={triggerSelect}>
          اختر صورة
        </button>
        <button
          type="button"
          className="secondary"
          onClick={reset}
          disabled={!preview}
        >
          حذف المعاينة
        </button>
      </div>
    </div>
  );
}
