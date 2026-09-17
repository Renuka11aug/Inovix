import React from 'react';
import Button from '../ui/Button.jsx';

export default function ReportCard({ title, description, generatedAt, onExport }) {
  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-4)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>
        <div style={{ fontWeight: 700, fontSize: 14 }}>{title}</div>
        <div style={{ fontSize: 12.5, color: 'var(--text-muted)' }}>{description} · Generated {generatedAt}</div>
      </div>
      <Button size="sm" variant="outline" onClick={onExport}>Export</Button>
    </div>
  );
}
