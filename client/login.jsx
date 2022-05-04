import { useNavigate } from "react-router-dom";
import { useState } from "react";

export function Register() {}

export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await fetch("/api/login", {
      method: "post",
      body: JSON.stringify({ username, password }),
      headers: {
        "content-type": "application/json",
      },
    });
    if (res.ok) {
      navigate("/articles");
    } else {
      setError("Username or password is wrong");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Please log in</h1>
      <div>
        Username:{" "}
        <input value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        Password:{" "}
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>{error}</div>
      <div>
        <button>Log in</button>
      </div>
    </form>
  );
}
