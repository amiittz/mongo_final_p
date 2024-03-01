import React, { useState, useEffect } from "react";
import axios from "axios";

function AuthorList({ onDataFetched }) {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/author");
        onDataFetched(response.data); 
      } catch (error) {
        console.error("Error fetching authors:", error);
      }
    };

    fetchData(); 
  }, [onDataFetched]);

  return null; 
}

export default AuthorList;
