import React from 'react';

export default function Breadcrumbs({ items = [] }) {
  return (
    <div className="breadcrumbs">
      {items.map((item, i) => (
        <React.Fragment key={item.label}>
          {i > 0 && <span className="sep">&rsaquo;</span>}
          {i === items.length - 1 ? (
            <span className="current">{item.label}</span>
          ) : (
            <a href={item.href || '#'}>{item.label}</a>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
