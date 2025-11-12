import React, { useState } from 'react';
import PropTypes from 'prop-types';

function DestinationCard({ name, image, price }) {
  const [wishlisted, setWishlisted] = useState(false);

  const handleWishlist = () => {
    setWishlisted(!wishlisted);
  };

  const handleBookNow = () => {
    alert(`Booking started for ${name}!`);
  };

  return (
    <div className="col-md-4 mb-4">
      <div className="card shadow-sm h-100">
        <img src={image} className="card-img-top" alt={name} />
        <div className="card-body text-center">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">Starting from ${price}</p>

          {/* Add to Wishlist */}
          <button
            className={`btn ${wishlisted ? 'btn-success' : 'btn-outline-primary'} me-2`}
            onClick={handleWishlist}
          >
            {wishlisted ? 'Wishlisted ❤️' : 'Add to Wishlist'}
          </button>

          {/* Book Now */}
          <button className="btn btn-primary" onClick={handleBookNow}>
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}

DestinationCard.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

export default DestinationCard;
