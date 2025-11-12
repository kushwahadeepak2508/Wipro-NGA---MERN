import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import HomeWithLoading from "./pages/Home"; // note: this default export is withLoading(HomeContent)
import BookDetails from "./pages/BookDetails";
import "./styles.css";

/* Because HomeWithLoading is an HOC expecting a `loading` prop,
   we'll wrap it in a small inline component that fetches the loading state.
   Alternatively, modify Home export to expose loading internally. For simplicity here,
   we'll use a small wrapper below that passes loading=false initially; but the HomeContent
   itself manages internal loading and will show RenderStatus - real spinner is shown by HOC
*/

const App: React.FC = () => {
  // We'll let the HomeContent manage loading; to demonstrate HOC usage,
  // call HomeWithLoading with loading=false (so it doesn't block). In a more
  // integrated flow you might manage loading in App and pass it.
  return (
    <BrowserRouter>
      <div className="container">
        <nav className="nav-links">
          <Link to="/home">Home</Link>
        </nav>

        <Routes>
          <Route path="/" element={<HomeWithLoading loading={false} />} />
          <Route path="/home" element={<HomeWithLoading loading={false} />} />
          <Route path="/book/:id" element={<BookDetails />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
