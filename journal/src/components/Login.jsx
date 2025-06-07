// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function Login() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("http://127.0.0.1:8000/auth/token/login/", {
//         username,
//         password,
//       });
//       localStorage.setItem("token", response.data.auth_token);
//       navigate("/notes");
//     } catch (error) {
//       alert("Login failed");
//     }
//   };

//   return (
//     <form onSubmit={handleLogin}>
//       <h2>Login</h2>
//       <input
//         type="text"
//         placeholder="Username"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//         required
//       /><br />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         required
//       /><br />
//       <button type="submit">Login</button>
//       <p>Don't have an account? <a href="/register">Register here</a></p>

//     </form>
//   );
// }

// export default Login;
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/auth/token/login/", {
        username,
        password,
      });
      localStorage.setItem("token", response.data.auth_token);
      navigate("/notes");
    } catch (error) {
      alert("Login failed");
    }
  };

  return (
    <div className="container">
      {/* <h2>Login</h2> */}
      <form onSubmit={handleLogin}>
      <h2>Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        <p>Don't have an account? <a href="/register">Register here</a></p>
      </form>
    </div>
  );
}

export default Login;

