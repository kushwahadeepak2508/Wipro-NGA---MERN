// src/pages/Home.tsx
import React, { useEffect, useState } from "react";
import BookCard from "../components/BookCard";
import { withLoading } from "../components/withLoading";
import RenderStatus from "../components/RenderStatus";
import { useNavigate } from "react-router-dom";

type Book = {
  id: number;
  title: string;
  author: string;
  price: number;
  description?: string;
};

const API = "http://localhost:4000/books";

const HomeContent: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetch(API)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data: Book[]) => {
        setBooks(data);
      })
      .catch((err) => {
        console.error("Failed to fetch books", err);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <RenderStatus status={loading ? "Loading books..." : `Found ${books.length} books`}>
        {({ status }) => <p>{status}</p>}
      </RenderStatus>

      <div>
        {books.map((b) => (
          <BookCard key={b.id} book={b} onView={(id: number) => navigate(`/book/${id}`)} />
        ))}
      </div>
    </div>
  );
};

// Wrap the content with the HOC (the HOC expects a 'loading' prop when used)
export default withLoading(HomeContent);
