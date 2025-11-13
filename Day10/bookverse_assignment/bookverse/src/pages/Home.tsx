// src/pages/Home.tsx
import React, { useContext, useEffect, useState } from "react";
import BookCard from "../components/BookCard";
import AddBookForm from "../components/AddBookForm";
import { StoreContext } from "../flux/StoreContext";
import { Book } from "../flux/BookStore";
import { useNavigate } from "react-router-dom";

const HomePage: React.FC = () => {
  const store = useContext(StoreContext);
  const [books, setBooks] = useState<Book[]>(store.getAll());
  const navigate = useNavigate();

  useEffect(() => {
    // componentDidMount: subscribe to store
    const unsubscribe = store.addChangeListener(() => {
      setBooks(store.getAll());
    });

    // optional: log lifecycle for learning/demonstration
    console.log("HomePage mounted: subscribed to BookStore");

    // cleanup: componentWillUnmount
    return () => {
      unsubscribe();
      console.log("HomePage unmounted: unsubscribed from BookStore");
    };
  }, [store]);

  return (
    <div>
      <h2>Home — BookVerse</h2>

      {/* Add form */}
      <AddBookForm onAdded={(book) => {
        // optional UI action after adding
        console.log("Book added:", book);
      }} />

      {/* Book list */}
      <div>
        {books.map((b) => (
          <BookCard key={b.id} book={b} onView={(id: number) => navigate(`/book/${id}`)} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
