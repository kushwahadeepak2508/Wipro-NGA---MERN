// src/App.tsx
import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/Home";
import BookDetails from "./pages/BookDetails";
import { StoreProvider } from "./flux/StoreContext";
import { defaultBookStore } from "./flux/BookStore";
import "./styles.css";

const App: React.FC = () => {
  return (
    <StoreProvider store={defaultBookStore}>
      <BrowserRouter>
        <div className="container">
          <nav className="nav-links mb-3">
            <Link to="/home">Home</Link>
          </nav>

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/book/:id" element={<BookDetails />} />
          </Routes>
        </div>
      </BrowserRouter>
    </StoreProvider>
  );
};

export default App;
