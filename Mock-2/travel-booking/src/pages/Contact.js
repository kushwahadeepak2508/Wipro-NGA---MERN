import React from 'react';
import { motion } from 'framer-motion';

function Contact() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      <h2 className="text-primary mb-3">Contact Us</h2>
      <p>Email: support@travelbook.com</p>
      <p>Phone: +91 9111111111</p>
      <button className="btn btn-success mt-3" onClick={() => alert('Message Sent!')}>
        Send Message
      </button>
    </motion.div>
  );
}

export default Contact;
