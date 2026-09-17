import React from 'react';
import OrderColumn from './OrderColumn.jsx';

export default function OrderKanban({ columns }) {
  return (
    <div className="kanban">
      {columns.map((col) => <OrderColumn key={col.title} {...col} />)}
    </div>
  );
}
