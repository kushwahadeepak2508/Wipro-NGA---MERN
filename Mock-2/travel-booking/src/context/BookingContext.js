// BookingContext.js
import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';

// Actions
const ADD_BOOKING = 'ADD_BOOKING';
const SET_ERROR = 'SET_ERROR';

// Initial state
const initialState = {
  bookings: [],   // stored bookings in-memory
  error: null,
};

// Reducer to manage booking state
function bookingReducer(state, action) {
  switch (action.type) {
    case ADD_BOOKING:
      return { ...state, bookings: [action.payload, ...state.bookings], error: null };
    case SET_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
}

export const BookingContext = createContext();

// Provider component
export function BookingProvider({ children }) {
  const [state, dispatch] = useReducer(bookingReducer, initialState);

  const addBooking = (booking) => dispatch({ type: ADD_BOOKING, payload: booking });
  const setError = (err) => dispatch({ type: SET_ERROR, payload: err });

  const value = {
    bookings: state.bookings,
    error: state.error,
    addBooking,
    setError,
  };

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

BookingProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
