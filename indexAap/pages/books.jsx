import React from "react";
import Link from "next/link";
import BookList from "../components/BookList"; 

function BooksPage() {
  return (
    <div>
      <Link href="/">Home</Link>
      <br/><br/>
      <BookList /> 
    </div>
  );
}

export default BooksPage;
