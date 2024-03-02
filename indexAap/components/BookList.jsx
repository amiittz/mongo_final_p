import React, { useState, useEffect } from "react";
import axios from "axios";
import ShowBookList from "./ShowBookList";

function ShowBooks() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/book");
        setBooks(response.data); 
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchData(); 
  }, []);

  return (
    <div>
      <h1>All available books</h1>
      {books.length === 0 ? (
        <p>No books available</p>
      ) : (
        <ul>
          {books.map(book => (
            <ShowBookList key={book._id} book={book} />
          ))}
        </ul>
      )}
    </div>
  );
}

export default ShowBooks;
