import React, { useState } from 'react';

export default function FoodImageUploader({ onUpload }) {
  const [preview, setPreview] = useState(null);

  function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
    onUpload && onUpload(file);
  }

  return (
    <label className="uploader" style={{ display: 'block' }}>
      {preview ? (
        <div className="uploader-preview"><img src={preview} alt="Preview" /></div>
      ) : (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ margin: '0 auto 8px' }}>
          <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" />
        </svg>
      )}
      <div style={{ fontSize: 13, fontWeight: 600 }}>{preview ? 'Change image' : 'Click to upload food photo'}</div>
      <input type="file" accept="image/*" onChange={handleFile} style={{ display: 'none' }} />
    </label>
  );
}
