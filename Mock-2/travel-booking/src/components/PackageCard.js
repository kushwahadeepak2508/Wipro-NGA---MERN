import React, { useState } from 'react';
import PropTypes from 'prop-types';
import newyorkImg from '../images/newyork.jpg';

function PackageCard({ name, description, price, image }) {
  const [booked, setBooked] = useState(false);

  const handleBook = () => {
    setBooked(true);
    setTimeout(() => setBooked(false), 2000);
  };

  return (
    <div className="col-md-4 mb-4">
      <div className="card shadow-sm h-100">
        <img src={newyorkImg} alt={name} className="card-img-top" />
        <div className="card-body d-flex flex-column justify-content-between">
          <div>
            <h5 className="card-title">{name}</h5>
            <p className="card-text">{description}</p>
            <p className="fw-bold text-primary">Price: ${price}</p>
          </div>
          <div className="d-flex justify-content-between mt-3">
            <button className="btn btn-outline-secondary">View Details</button>
            <button
              className={`btn ${booked ? 'btn-success' : 'btn-primary'}`}
              onClick={handleBook}
            >
              {booked ? 'Booked ✔️' : 'Book Package'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

PackageCard.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
};

export default PackageCard;
