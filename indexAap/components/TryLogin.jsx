import React, { useState, useEffect } from "react";
import axios from "axios";

function UserForm() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);
    const [books, setBooks] = useState([
        
    ]);

    useEffect(() => {
        // Fetch books when the component mounts
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            // Simulating fetching books from an API
            const response = await axios.get("http://localhost:3001/api/books");
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
        // Handle order functionality here
        alert("Order functionality will be implemented here");
    };

    const handleDecrease = (id) => {
        const updatedBooks = books.map(book => {
            if (book.id === id && book.orderQuantity > 0) {
                return { ...book, orderQuantity: book.orderQuantity - 1 };
            }
            return book;
        });
        setBooks(updatedBooks);
    };

    const handleIncrease = (id) => {
        const updatedBooks = books.map(book => {
            if (book.id === id && book.orderQuantity < book.stock) {
                return { ...book, orderQuantity: book.orderQuantity + 1 };
            }
            return book;
        });
        setBooks(updatedBooks);
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
                    <h2>Welcome, {name}!</h2>
                    <h3>Make an Order</h3>
                    <div className="books-container">
                        {books.map((book) => (
                            <div key={book.id} className="book-card">
                                <h4>{book.title}</h4>
                                <p>In Stock: {book.stock}</p>
                                <div>
                                    <button onClick={() => handleDecrease(book.id)}>-</button>
                                    <span>{book.orderQuantity}</span> 
                                    <button onClick={() => handleIncrease(book.id)}>+</button>
                                </div>
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
