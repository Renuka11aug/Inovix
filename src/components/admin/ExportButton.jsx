import React from 'react';
import Button from '../ui/Button.jsx';

export default function ExportButton({ onClick, label = 'Export CSV' }) {
  return (
    <Button variant="outline" onClick={onClick} icon={
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 3v12m0 0l-4-4m4 4l4-4M4 21h16" /></svg>
    }>
      {label}
    </Button>
  );
}
