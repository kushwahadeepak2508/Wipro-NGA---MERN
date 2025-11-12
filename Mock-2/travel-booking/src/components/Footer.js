import React from 'react';

function Footer() {
  return (
    <footer className="bg-dark text-light text-center py-3 mt-4">
      <p>&copy; {new Date().getFullYear()} TravelBook. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
