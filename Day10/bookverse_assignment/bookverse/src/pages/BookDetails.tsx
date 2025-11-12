import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Book } from "../types";

const API_BASE = "http://localhost:4000/books";

const BookDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [hiddenClass, setHiddenClass] = useState("hidden");

  useEffect(() => {
    // small fade-in: start hidden, then remove hidden after next tick
    setHiddenClass("hidden");
    const timeout = setTimeout(() => setHiddenClass(""), 10);

    setLoading(true);
    if (id) {
      fetch(`${API_BASE}/${id}`)
        .then((res) => {
          if (!res.ok) throw new Error("Book not found");
          return res.json();
        })
        .then((data: Book) => setBook(data))
        .catch((err) => {
          console.error(err);
          setBook(null);
        })
        .finally(() => setLoading(false));
    }

    return () => clearTimeout(timeout);
  }, [id]);

  if (loading) {
    return <div style={{ padding: 20 }}><div className="spinner" /></div>;
  }

  if (!book) {
    return (
      <div>
        <p>Book not found.</p>
        <Link to="/home">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className={`fade-wrapper ${hiddenClass}`} style={{ padding: 10 }}>
      <h2>{book.title}</h2>
      <p className="text-muted">by {book.author}</p>
      <p>{book.description}</p>
      <p><strong>Price: </strong>${book.price.toFixed(2)}</p>
      <Link to="/home">← Back to Home</Link>
    </div>
  );
};

export default BookDetails;
