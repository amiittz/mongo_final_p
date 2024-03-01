import React, { useState } from "react";
import Link from "next/link";
import Authors from "../components/AuthorList";
import ShowAuthors from "../components/ShowAuthors";

function AuthorsPage() {
  const [authors, setAuthors] = useState([]);

  const handleDataFetched = data => {
    setAuthors(data);
  };

  return (
    <div>
      <Link href="/">Home</Link>
      <br/><br/>
      <Authors onDataFetched={handleDataFetched} />
      <ShowAuthors authors={authors} />
    </div>
  );
}

export default AuthorsPage;
