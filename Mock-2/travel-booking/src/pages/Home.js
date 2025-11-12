import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function Home() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      <h2 className="mb-3 text-primary">Welcome to TravelBook</h2>
      <p className="lead mb-4">
        Discover and book amazing travel experiences around the world.
      </p>
      <div className="d-flex justify-content-center gap-3">
        <Link to="/home" className="btn btn-outline-primary">Home</Link>
        <Link to="/packages" className="btn btn-outline-success">View Packages</Link>
        <Link to="/contact" className="btn btn-outline-info">Contact Us</Link>
      </div>
    </motion.div>
  );
}

export default Home;
