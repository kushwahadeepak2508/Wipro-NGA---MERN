// src/components/BookCard.tsx
import React from "react";
import PropTypes from "prop-types";

type BookCardProps = {
  title: string;
  author: string;
  price: number;
  viewMode: "grid" | "list";
  onAuthorClick: (author: string) => void;
};

const BookCard: React.FC<BookCardProps> = ({ title, author, price, viewMode, onAuthorClick }) => {
  return (
    <div
      className={`card mb-3 p-3 ${viewMode === "grid" ? "col-md-3" : "w-100"}`}
      style={{ cursor: "pointer" }}
    >
      <h5>{title}</h5>
      <p className="text-muted">by {author}</p>
      <strong>${price.toFixed(2)}</strong>
      <button className="btn btn-sm btn-primary mt-2" onClick={() => onAuthorClick(author)}>
        View Author
      </button>
    </div>
  );
};

// PropTypes validation
BookCard.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  viewMode: PropTypes.oneOf(["grid", "list"]).isRequired,
  onAuthorClick: PropTypes.func.isRequired,
};

export default BookCard;
