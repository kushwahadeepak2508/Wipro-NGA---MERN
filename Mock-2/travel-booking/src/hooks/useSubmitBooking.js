// useSubmitBooking.js
import { useContext, useState } from 'react';
import axios from 'axios';
import { BookingContext } from '../context/BookingContext';

/**
 * Custom hook to submit booking to the backend and update BookingContext.
 * Returns { submitBooking, loading, result, error }.
 */
export default function useSubmitBooking() {
  const { addBooking, setError } = useContext(BookingContext);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setLocalError] = useState(null);

  const submitBooking = async (bookingData) => {
    setLoading(true);
    setResult(null);
    setLocalError(null);
    try {
      // Save booking to json-server
      const res = await axios.post('http://localhost:5000/bookings', bookingData);
      const saved = res.data;

      // Update global state
      addBooking(saved);
      setResult(saved);
      setLoading(false);
      return saved;
    } catch (err) {
      const message = err?.response?.data || err.message || 'Unknown error';
      setLocalError(message);
      setError(message); // also update context error
      setLoading(false);
      throw err;
    }
  };

  return { submitBooking, loading, result, error: error || null };
}
