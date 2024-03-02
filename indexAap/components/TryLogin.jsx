import React, { useState, useEffect } from "react";
import axios from "axios";

function UserForm() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);
    const [books, setBooks] = useState([]);
    const [selectedBooks, setSelectedBooks] = useState([]);

    useEffect(() => {
        // Fetch books when the component mounts
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            // Simulating fetching books from an API
            const response = await axios.get("http://localhost:3001/api/book");
            setBooks(response.data);
        } catch (error) {
            console.error("Error fetching books:", error);
        }
    };

    const handleLogin = async () => {
        try {
            // Simulated login request
            alert("Successfully logged in!");
            setLoggedIn(true);
            setName("");
            setPassword("");
        } catch (error) {
            console.error("Error logging in:", error);
            alert("Error");
        }
    };

    const handleOrder = () => {
        // Get names of selected books
        const selectedBookNames = selectedBooks.map(book => book.title).join(", ");
        alert(`Selected books: ${selectedBookNames}`);
    };

    const handleCheckboxChange = (id) => {
        // Toggle selected state for the clicked book
        const updatedBooks = books.map(book => {
            if (book._id === id) {
                return { ...book, selected: !book.selected };
            }
            return book;
        });
        setBooks(updatedBooks);

        // Update selected books list
        const selected = updatedBooks.filter(book => book.selected);
        setSelectedBooks(selected);
    };

    return (
        <div>
            <div>
                <label>
                    Name:
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Password:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <br />
                <button onClick={handleLogin}>Login</button>
            </div>
            {loggedIn && (
                <div>
                    <h2>Welcome !</h2>
                    <h3>Make an Order</h3>
                    <div className="books-container">
                        {books.map((book) => (
                            <div key={book._id} className="book-card">
                                <h4>{book.title}</h4>
                                <p>In Stock: {book.stock}</p>
                                <input
                                    type="checkbox"
                                    checked={book.selected}
                                    onChange={() => handleCheckboxChange(book._id)}
                                />
                            </div>
                        ))}
                    </div>
                    <button onClick={handleOrder}>Order</button>
                </div>
            )}
        </div>
    );
}

export default UserForm;
