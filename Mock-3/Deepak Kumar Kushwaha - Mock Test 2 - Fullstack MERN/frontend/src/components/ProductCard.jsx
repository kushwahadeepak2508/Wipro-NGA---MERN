import React from 'react'
import PropTypes from 'prop-types'
export default function ProductCard({ title, price, discount }){
  const finalPrice = Number(price) - Number(discount);
  return (
    <div style={{ border: '1px solid #ddd', padding: 12, width: 260 }}>
      <h3>{title}</h3>
      <p>Price: ₹{price}</p>
      <p>Discount: ₹{discount}</p>
      <p><strong>Final Price: ₹{finalPrice}</strong></p>
      <button>Shop Now</button>
    </div>
  );
}
ProductCard.propTypes = {
  title: PropTypes.string.isRequired,
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  discount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
};