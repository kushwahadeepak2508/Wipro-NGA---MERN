// src/components/BookCard.tsx
import React from "react";

type Book = {
  id: number;
  title: string;
  author: string;
  price: number;
  description?: string;
};

type ViewMode = "grid" | "list";

/*
  Two supported prop shapes:
  1) { book: Book, onView: (id:number) => void }    <- used by Home.tsx
  2) { id, title, author, price, viewMode, onAuthorClick } <- used by BookList.tsx
*/
type BookPropShape = {
  book: Book;
  onView: (id: number) => void;
};

type FieldsShape = {
  id: number;
  title: string;
  author: string;
  price: number;
  viewMode?: ViewMode;
  onAuthorClick?: (author: string | null) => void;
};

type BookCardProps = BookPropShape | FieldsShape;

const isBookProp = (props: BookCardProps): props is BookPropShape => {
  return (props as any).book !== undefined;
};

const BookCard: React.FC<BookCardProps> = (props) => {
  // If caller passed a single `book` object (Home.tsx case)
  if (isBookProp(props)) {
    const { book, onView } = props;
    return (
      <div className="card mb-3 p-3">
        <h5>{book.title}</h5>
        <p className="text-muted">by {book.author}</p>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <strong>${book.price.toFixed(2)}</strong>
          <button className="btn btn-sm btn-outline-primary" onClick={() => onView(book.id)}>
            View
          </button>
        </div>
      </div>
    );
  }

  // Otherwise, caller passed individual fields (BookList.tsx case)
  const { id, title, author, price, viewMode = "list", onAuthorClick } = props as FieldsShape;
  return (
    <div
      className={`card mb-3 p-3 ${viewMode === "grid" ? "h-100" : "w-100"}`}
      style={{ cursor: "pointer" }}
      data-book-id={id}
    >
      <h5>{title}</h5>
      <p className="text-muted">by {author}</p>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <strong>${price.toFixed(2)}</strong>
        <div>
          {onAuthorClick ? (
            <button className="btn btn-sm btn-primary me-2" onClick={() => onAuthorClick(author)}>
              View Author
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default BookCard;
