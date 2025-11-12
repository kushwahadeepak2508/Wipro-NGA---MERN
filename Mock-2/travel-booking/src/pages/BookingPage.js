// src/pages/BookingPage.js
import React from 'react';
import { motion } from 'framer-motion';
import BookingForm from '../components/BookingForm';

function BookingPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="container my-4"
    >
      <h2 className="text-center mb-4 text-primary">Book Your Travel Package</h2>
      <BookingForm />
    </motion.div>
  );
}

export default BookingPage;
