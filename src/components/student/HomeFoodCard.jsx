import React from 'react';

/**
 * HomeFoodCard
 * Props:
 *   item   – { id, name, price, image?, discount?, status? }
 *   onAdd  – (item) => void   add directly to cart
 *   onView – () => void       navigate to food detail page
 */
export default function HomeFoodCard({ item, onAdd, onView }) {
  const oos = item.status === 'out-of-stock';

  return (
    <article
      className="hp-food-card"
      onClick={!oos && onView ? onView : undefined}
      style={{ cursor: (!oos && onView) ? 'pointer' : 'default' }}
    >
      {/* Image */}
      <div className="hp-food-card__img-wrap">
        {item.image
          ? <img className="hp-food-card__img" src={item.image} alt={item.name} loading="lazy" />
          : <div className="hp-food-card__img-placeholder">🍽️</div>
        }
        {item.discount && !oos && (
          <span className="hp-food-card__badge" aria-label={item.discount}>
            {item.discount}
          </span>
        )}
        {oos && (
          <div className="hp-food-card__oos" aria-label="Out of stock">
            Out of stock
          </div>
        )}
      </div>

      {/* Body */}
      <div className="hp-food-card__body">
        <p className="hp-food-card__name">{item.name}</p>

        <div className="hp-food-card__price-row">
          <div>
            <span className="hp-food-card__price-label">from</span>
            <span className="hp-food-card__price">₹{item.price}</span>
          </div>
          <button
            className="hp-food-card__add"
            onClick={(e) => {
              e.stopPropagation();
              if (!oos && onAdd) onAdd(item);
            }}
            disabled={oos}
            aria-label={`Add ${item.name} to cart`}
          >
            +
          </button>
        </div>
      </div>
    </article>
  );
}
