import React from "react";

function ShowBookList({ book }) {
  return (
    <li key={book._id}>
      <h2>{book.title}</h2>
      <p>{book.image && <img src={book.image} alt={book.title} style={{ maxWidth: "200px" }} />}</p>
      <p>Publishing Year: {book.publishingYear}</p>
      <p>Genres: {book.genres.join(", ")}</p>
      <p>Authors: {book.authors.map(author => author.name).join(", ")}</p>
      <p>Quantity: {book.quantity}</p>
      <p>Price: {book.price}</p>
    </li>
  );
}

export default ShowBookList;
