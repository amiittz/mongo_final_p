import React, { useState } from "react";
import axios from "axios";
import UsersList from "./UserList"

function AddUserForm() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = async () => {
    try {
      
      const userExists = await axios.get(`http://localhost:3001/api/user/check/${name}`);
        if (userExists.data != null) {
            alert("User already exists");
            return;
        }
        else{
          await axios.post("http://localhost:3001/api/user/add", {name: name,password:password});
          alert("User added successfully");
        }
      setName("");
      setPassword("");
    } catch (error) {
      console.error("Error adding user:", error);
      alert("Error");
    }
  };

  return (
    <div>
      <h2>Add New User</h2>
      <div>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button onClick={handleSubmit}>Add User</button>
      </div>
    </div>
  );
}

export default AddUserForm;
