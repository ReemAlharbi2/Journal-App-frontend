import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/auth/users/", {
        username,
        email,
        password,
      });
      console.log("User registered:", response.data);
      navigate("/login");
    } catch (error) {
      if (error.response && error.response.data) {
        const errors = error.response.data;
        let errorMessages = "";
        for (const key in errors) {
          errorMessages += `${key}: ${errors[key].join(", ")}\n`;
        }
        alert(errorMessages);
      } else {
        alert("Registration failed: Network or server error");
      }
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>Register</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      /><br />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      /><br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      /><br />
      <button type="submit">Register</button>
    </form>
  );
}

export default Register;
