import React from "react";

function ShowAuthors({ authors }) {
  return (
    <div>
      <h1>All Authors</h1>
      {authors.length === 0 ? (
        <p>No authors available</p>
      ) : (
        <ul>
          {authors.map(author => (
            <li key={author._id}>
              <h2>{author.name}</h2>
              <p>Country: {author.country}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ShowAuthors;
