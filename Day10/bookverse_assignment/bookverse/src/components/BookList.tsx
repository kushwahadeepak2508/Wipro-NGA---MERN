// src/components/BookList.tsx
import React, { useState, useRef } from "react";
import BookCard from "./BookCard";
import AuthorInfo from "./AuthorInfo";

type Book = {
  id: number;
  title: string;
  author: string;
  price: number;
};

const authorDetails: Record<string, { bio: string; topBooks: string[] }> = {
  "F. Scott Fitzgerald": {
    bio: "An American novelist best known for 'The Great Gatsby'.",
    topBooks: ["The Great Gatsby", "Tender Is the Night", "This Side of Paradise"],
  },
  "George Orwell": {
    bio: "English novelist and critic famous for '1984' and 'Animal Farm'.",
    topBooks: ["1984", "Animal Farm", "Homage to Catalonia"],
  },
  "Harper Lee": {
    bio: "Known for her classic novel 'To Kill a Mockingbird'.",
    topBooks: ["To Kill a Mockingbird", "Go Set a Watchman", "The Mockingbird Next Door"],
  },
  "J.R.R. Tolkien": {
    bio: "English author of high fantasy works, notably 'The Hobbit' and 'The Lord of the Rings'.",
    topBooks: ["The Hobbit", "The Fellowship of the Ring", "The Two Towers"],
  },
};

const BookList: React.FC = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [search, setSearch] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState<string | null>(null);

  const searchRef = useRef<HTMLInputElement>(null);

  const books: Book[] = [
    { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", price: 9.99 },
    { id: 2, title: "1984", author: "George Orwell", price: 8.5 },
    { id: 3, title: "To Kill a Mockingbird", author: "Harper Lee", price: 10.0 },
    { id: 4, title: "The Hobbit", author: "J.R.R. Tolkien", price: 12.5 },
  ];

  const filteredBooks = books.filter((b) =>
    b.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container py-4">
      <h1 className="mb-3 text-center">📚 BookVerse</h1>

      {/* Uncontrolled input (using ref) */}
      <div className="mb-3">
        <input
          ref={searchRef}
          type="text"
          className="form-control"
          placeholder="Search books..."
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          className="btn btn-secondary mt-2"
          onClick={() => searchRef.current?.focus()}
        >
          Focus Search Box
        </button>
      </div>

      {/* Toggle view buttons */}
      <div className="mb-3 text-center">
        <button className="btn btn-outline-primary me-2" onClick={() => setViewMode("grid")}>
          Grid View
        </button>
        <button className="btn btn-outline-primary" onClick={() => setViewMode("list")}>
          List View
        </button>
      </div>

      {/* Books Grid/List */}
      <div className={`row ${viewMode === "grid" ? "" : "flex-column"}`}>
        {filteredBooks.map((book) => (
          <BookCard
            key={book.id}
            {...book}
            viewMode={viewMode}
            onAuthorClick={setSelectedAuthor}
          />
        ))}
      </div>

      {/* Author Info */}
      {selectedAuthor && (
        <AuthorInfo
          name={selectedAuthor}
          bio={authorDetails[selectedAuthor].bio}
          topBooks={authorDetails[selectedAuthor].topBooks}
        />
      )}
    </div>
  );
};

export default BookList;
